import { useEffect, useMemo, useState } from "react"
import { RefreshCw, Trophy } from "lucide-react"

import useLanguageStore from "../../store/languageStore"
import AchievementCard from "./components/AchievementCard"
import AchievementModal from "./components/AchievementModal"
import AchievementSpotlight from "./components/AchievementSpotlight"
import {
  getCategoryKey,
  getLocalizedText,
} from "./components/achievementConfig"

const API_BASE_URL = "http://localhost:5000"

const localizeCopy = (content, language) =>
  Object.fromEntries(
    Object.entries(content).map(([key, value]) => [
      key,
      key === "categories" ? value : getLocalizedText(value, language),
    ])
  )

const AchievementsSkeleton = ({ direction }) => (
  <section dir={direction} className="announcements-section section-padding" aria-busy="true">
    <div className="container-custom animate-pulse">
      <div className="h-9 w-40 rounded-full bg-surface-secondary" />
      <div className="mt-5 h-10 w-full max-w-md rounded-xl bg-surface-secondary" />
      <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-surface-secondary" />
      <div className="mt-10 h-72 rounded-[2rem] bg-surface-secondary" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-72 rounded-xl bg-surface-secondary" />
        ))}
      </div>
    </div>
  </section>
)


const StateCard = ({ direction, title, description, onRetry, retryLabel, role }) => (
  <section dir={direction} className="announcements-section announcements-section--state section-padding">
    <div className="container-custom">
      <div className="announcement-state-card" role={role}>
        <div className="announcement-state-card__icon">
          <Trophy size={30} aria-hidden="true" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="announcement-retry-button">
            <RefreshCw size={16} aria-hidden="true" />
            <span>{retryLabel}</span>
          </button>
        )}
      </div>
    </div>
  </section>
)


const Achievements = () => {
  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  const [content, setContent] = useState(null)
  const [items, setItems] = useState([])
  const [courses, setCourses] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedId, setSelectedId] = useState(null)


  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const [pageResponse, listResponse, coursesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/achievementsPage`, { signal: controller.signal }),
          fetch(`${API_BASE_URL}/achievements`, { signal: controller.signal }),
          // Course names are optional: a failure here must not break the page
          fetch(`${API_BASE_URL}/courses`, { signal: controller.signal }).catch((error) => {
            if (error.name === "AbortError") throw error
            return null
          }),
        ])

        if (!pageResponse.ok || !listResponse.ok) {
          throw new Error("Failed to fetch achievements")
        }

        const pageData = await pageResponse.json()
        const listData = await listResponse.json()

        if (!pageData || typeof pageData !== "object" || !Array.isArray(listData)) {
          throw new Error("Invalid achievements data")
        }

        const courseData = coursesResponse?.ok ? await coursesResponse.json() : []

        setContent(pageData)
        setItems(listData)
        setCourses(Array.isArray(courseData) ? courseData : [])
        setHasError(false)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Achievements Page Error:", error)
          setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [retryCount])

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    setRetryCount((previous) => previous + 1)
  }

  const copy = useMemo(
    () => (content ? localizeCopy(content, language) : null),
    [content, language]
  )

  const published = useMemo(
    () =>
      items
        .filter((item) => item?.id && item.title && item.status === "published")
        .sort(
          (first, second) =>
            (Date.parse(second.achievementDate) || 0) -
            (Date.parse(first.achievementDate) || 0)
        ),
    [items]
  )

  const categoryChips = useMemo(() => {
    const counts = new Map()

    published.forEach((item) => {
      const key = getCategoryKey(item.category)
      counts.set(key, (counts.get(key) || 0) + 1)
    })

    const order = Object.keys(content?.categories || {})

    return [...counts.entries()].sort(([a], [b]) => {
      const first = order.indexOf(a)
      const second = order.indexOf(b)
      return (first === -1 ? 99 : first) - (second === -1 ? 99 : second)
    })
  }, [published, content])

  const categoryLabel = (key) =>
    getLocalizedText(content?.categories?.[key], language) || key

  const visible =
    activeCategory === "all"
      ? published
      : published.filter((item) => getCategoryKey(item.category) === activeCategory)

  const spotlight =
    activeCategory === "all" ? published.find((item) => item.isFeatured) : null

  const gridItems = visible.filter((item) => item !== spotlight)

  const selectedItem = published.find((item) => item.id === selectedId) || null

  const selectedCourseName = selectedItem?.courseId
    ? getLocalizedText(
        courses.find((course) => course.id === selectedItem.courseId)?.title,
        language
      )
    : ""

  if (isLoading) return <AchievementsSkeleton direction={direction} />

  if (hasError || !copy) {
    const fallback =
      language === "fa"
        ? { title: "بارگذاری دستاوردها ممکن نشد", description: "هنگام بارگذاری مشکلی رخ داد. لطفاً دوباره تلاش کنید.", retry: "تلاش دوباره" }
        : { title: "Unable to Load Achievements", description: "Something went wrong while loading. Please try again.", retry: "Try Again" }

    return (
      <StateCard
        direction={direction}
        role="alert"
        title={copy?.errorTitle || fallback.title}
        description={copy?.errorDescription || fallback.description}
        retryLabel={copy?.retryLabel || fallback.retry}
        onRetry={handleRetry}
      />
    )
  }

  if (published.length === 0) {
    return (
      <StateCard
        direction={direction}
        title={copy.emptyTitle}
        description={copy.emptyDescription}
      />
    )
  }


  return (
    <section
      dir={direction}
      className="announcements-section section-padding"
      aria-labelledby="achievements-title"
    >
      <div className="container-custom">
        {/* HEADER */}
        <header className="max-w-3xl">
          <div className="announcements-eyebrow">
            <Trophy size={15} className="announcements-eyebrow__icon" aria-hidden="true" />
            <span>{copy.eyebrow}</span>
          </div>

         <h1 id="achievements-title" className="heading-1 mt-5 text-text-primary">
  {copy.title}
</h1>

<p className="body-large mt-5 text-text-secondary">{copy.description}</p>
        </header>

        {/* SPOTLIGHT */}
        {spotlight && (
          <div className="mt-10">
            <AchievementSpotlight
              item={spotlight}
              copy={copy}
              language={language}
              categoryLabel={categoryLabel}
              onOpen={setSelectedId}
            />
          </div>
        )}

        {/* FILTERS */}
        {categoryChips.length > 1 && (
          <div
            role="group"
            aria-label={copy.filterLabel}
            className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {[["all", published.length], ...categoryChips].map(([key, count]) => {
              const isActive = activeCategory === key

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(key)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue/50 ${
                    isActive
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-border bg-white text-text-secondary hover:border-brand-blue/40 hover:text-brand-blue"
                  }`}
                >
                  <span>{key === "all" ? copy.allLabel : categoryLabel(key)}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.6875rem] ${
                      isActive ? "bg-white/20" : "bg-surface-secondary"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {visible.length} {copy.resultsLabel}
        </p>

        {/* GRID */}
        {gridItems.length > 0 && (
          <ul role="list" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((item) => (
              <li key={item.id} className="min-w-0">
                <AchievementCard
                  item={item}
                  language={language}
                  categoryLabel={categoryLabel}
                  onOpen={setSelectedId}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DETAILS */}
      {selectedItem && (
        <AchievementModal
          key={selectedItem.id}
          item={selectedItem}
          copy={copy}
          language={language}
          direction={direction}
          categoryLabel={categoryLabel}
          courseName={selectedCourseName}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  )
}

export default Achievements