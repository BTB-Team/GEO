import { useMemo, useState } from "react"
import { Megaphone } from "lucide-react"

import FilterChips from "../../components/common/FilterChips"
import SearchInput from "../../components/common/SearchInput"
import { NoResults, PageSkeleton, StateCard } from "../../components/common/PageState"
import useApiData from "../../hooks/useApiData"
import useLanguageStore from "../../store/languageStore"
import { buildSearchText, localizeTree } from "../../utils/contentHelpers"
import AnnouncementDetails from "./components/AnnouncementDetails"
import AnnouncementItem from "./components/AnnouncementItem"

const byNewest = (first, second) =>
  (Date.parse(second.publishedAt) || 0) - (Date.parse(first.publishedAt) || 0)

const Announcements = () => {
  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  const { data, isLoading, hasError, reload } = useApiData(["announcementsPage", "announcements"])

  const [now] = useState(() => Date.now())
  const [tab, setTab] = useState("current")
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const page = data?.[0]

  const copy = useMemo(() => (page ? localizeTree(page, language) : null), [page, language])

  // Published items; an expired item moves to the archive
  const items = useMemo(
    () =>
      (Array.isArray(data?.[1]) ? data[1] : [])
        .filter((item) => item?.id && item.title && item.status === "published")
        .map((item) => {
          const expires = Date.parse(item.expiresAt)
          return { ...item, isArchived: !Number.isNaN(expires) && expires < now }
        }),
    [data, now]
  )

  const searched = useMemo(() => {
    const text = query.trim().toLowerCase()

    return items
      .filter((item) => (tab === "archive" ? item.isArchived : !item.isArchived))
      .filter(
        (item) =>
          !text || buildSearchText(item.title, item.summary, item.content).includes(text)
      )
  }, [items, tab, query])

  const visible = useMemo(
    () => searched.filter((item) => category === "all" || item.category === category).sort(byNewest),
    [searched, category]
  )

  // Pinned and urgent notices sit above the regular feed on the current tab
  const isHighlighted = (item) => tab === "current" && (item.isPinned || item.priority === "urgent")
  const highlighted = visible.filter(isHighlighted)
  const feed = visible.filter((item) => !isHighlighted(item))

  const selected = items.find((item) => item.id === selectedId) || null

  if (isLoading) return <PageSkeleton direction={direction} />

  if (hasError || !copy) {
    const isFa = language === "fa"
    return (
      <StateCard
        direction={direction}
        icon={Megaphone}
        role="alert"
        title={isFa ? "بارگذاری اطلاعیه‌ها ممکن نشد" : "Unable to Load Announcements"}
        description={isFa ? "هنگام بارگذاری مشکلی رخ داد. لطفاً دوباره تلاش کنید." : "Something went wrong while loading. Please try again."}
        retryLabel={isFa ? "تلاش دوباره" : "Try Again"}
        onRetry={reload}
      />
    )
  }

  if (items.length === 0) {
    return <StateCard direction={direction} icon={Megaphone} title={copy.emptyTitle} description={copy.emptyDescription} />
  }

  const tabOptions = ["current", "archive"].map((key) => ({ key, label: copy.tabs[key] }))

  const categoryOptions = [
    { key: "all", label: copy.allLabel, count: searched.length },
    ...Object.keys(copy.categories)
      .filter((key) => items.some((item) => item.category === key))
      .map((key) => ({
        key,
        label: copy.categories[key],
        count: searched.filter((item) => item.category === key).length,
      })),
  ]

  const clearFilters = () => {
    setQuery("")
    setCategory("all")
  }

  const renderItem = (item, highlight = false) => (
    <li key={item.id} className="min-w-0">
      <AnnouncementItem item={item} language={language} copy={copy} onOpen={setSelectedId} highlight={highlight} />
    </li>
  )

  return (
    <section dir={direction} className="section-padding bg-background" aria-labelledby="announcements-page-title">
      <div className="container-custom">
        <header className="max-w-3xl">
          <h1 id="announcements-page-title" className="heading-1 text-text-primary">{copy.title}</h1>
          <p className="body-large mt-4 text-text-secondary">{copy.description}</p>
        </header>

        <div className="mt-10 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <FilterChips label={copy.tabsLabel} options={tabOptions} value={tab} onChange={setTab} />
            <SearchInput
              label={copy.searchLabel}
              placeholder={copy.searchPlaceholder}
              clearLabel={copy.clearSearchLabel}
              value={query}
              onChange={setQuery}
            />
          </div>

          <FilterChips label={copy.filterLabel} options={categoryOptions} value={category} onChange={setCategory} />
        </div>

        <p className="mt-6 text-sm font-semibold text-text-secondary" aria-live="polite">
          {visible.length} {copy.resultsLabel}
        </p>

        {visible.length === 0 ? (
          <NoResults
            title={tab === "archive" && !query && category === "all" ? copy.archiveEmptyTitle : copy.noResultsTitle}
            description={tab === "archive" && !query && category === "all" ? copy.archiveEmptyDescription : copy.noResultsDescription}
            actionLabel={copy.clearFilters}
            onAction={clearFilters}
          />
        ) : (
          <div className="mt-4 space-y-8">
            {highlighted.length > 0 && (
              <div>
                <h2 className="heading-4 mb-3 text-text-primary">{copy.pinnedTitle}</h2>
                <ul role="list" className="space-y-4">{highlighted.map((item) => renderItem(item, true))}</ul>
              </div>
            )}

            {feed.length > 0 && (
              <div>
                {highlighted.length > 0 && (
                  <h2 className="heading-4 mb-3 text-text-primary">
                    {tab === "archive" ? copy.tabs.archive : copy.latestTitle}
                  </h2>
                )}
                <ul role="list" className="space-y-4">{feed.map((item) => renderItem(item))}</ul>
              </div>
            )}
          </div>
        )}
      </div>

      {selected && (
        <AnnouncementDetails
          key={selected.id}
          item={selected}
          copy={copy}
          language={language}
          direction={direction}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  )
}

export default Announcements