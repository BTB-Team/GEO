import { useMemo, useState } from "react"
import { CalendarX } from "lucide-react"

import FilterChips from "../../components/common/FilterChips"
import SearchInput from "../../components/common/SearchInput"
import { NoResults, PageSkeleton, StateCard } from "../../components/common/PageState"
import useApiData from "../../hooks/useApiData"
import useLanguageStore from "../../store/languageStore"
import { buildSearchText, localizeTree } from "../../utils/contentHelpers"
import EventCard from "./components/EventCard"
import EventDetails from "./components/EventDetails"
import { getEventState } from "./components/eventConfig"

const Events = () => {
  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  const { data, isLoading, hasError, reload } = useApiData(["eventsPage", "events"])

  const [now] = useState(() => Date.now())
  const [tab, setTab] = useState("upcoming")
  const [category, setCategory] = useState("all")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const page = data?.[0]

  const copy = useMemo(() => (page ? localizeTree(page, language) : null), [page, language])

  const events = useMemo(
    () =>
      (Array.isArray(data?.[1]) ? data[1] : [])
        .filter((event) => event?.id && event.title && event.status !== "draft")
        .map((event) => {
          const start = Date.parse(event.startAt)
          const end = Date.parse(event.endAt) || start
          return { ...event, startMs: start || 0, state: getEventState(event, now), isPast: end < now }
        }),
    [data, now]
  )

  const searched = useMemo(() => {
    const text = query.trim().toLowerCase()

    return events
      .filter((event) => tab === "all" || (tab === "past" ? event.isPast : !event.isPast))
      .filter(
        (event) =>
          !text ||
          buildSearchText(event.title, event.summary, event.description, event.location).includes(text)
      )
  }, [events, tab, query])

  const visible = useMemo(
    () =>
      searched
        .filter((event) => category === "all" || event.category === category)
        .sort(
          (first, second) =>
            Number(first.isPast) - Number(second.isPast) ||
            (first.isPast ? second.startMs - first.startMs : first.startMs - second.startMs)
        ),
    [searched, category]
  )

  const selected = events.find((event) => event.id === selectedId) || null

  if (isLoading) return <PageSkeleton direction={direction} />

  if (hasError || !copy) {
    const isFa = language === "fa"
    return (
      <StateCard
        direction={direction}
        icon={CalendarX}
        role="alert"
        title={isFa ? "بارگذاری رویدادها ممکن نشد" : "Unable to Load Events"}
        description={isFa ? "هنگام بارگذاری مشکلی رخ داد. لطفاً دوباره تلاش کنید." : "Something went wrong while loading. Please try again."}
        retryLabel={isFa ? "تلاش دوباره" : "Try Again"}
        onRetry={reload}
      />
    )
  }

  if (events.length === 0) {
    return <StateCard direction={direction} icon={CalendarX} title={copy.emptyTitle} description={copy.emptyDescription} />
  }

  const tabOptions = ["upcoming", "past", "all"].map((key) => ({ key, label: copy.tabs[key] }))

  const categoryOptions = [
    { key: "all", label: copy.allLabel, count: searched.length },
    ...Object.keys(copy.categories)
      .filter((key) => events.some((event) => event.category === key))
      .map((key) => ({
        key,
        label: copy.categories[key],
        count: searched.filter((event) => event.category === key).length,
      })),
  ]

  const clearFilters = () => {
    setQuery("")
    setCategory("all")
    setTab("all")
  }

  return (
    <section dir={direction} className="section-padding bg-background" aria-labelledby="events-title">
      <div className="container-custom">
        <header className="max-w-3xl">
          <h1 id="events-title" className="heading-1 text-text-primary">{copy.title}</h1>
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

        {visible.length > 0 ? (
          <ul role="list" className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event) => (
              <li key={event.id} className="min-w-0">
                <EventCard event={event} language={language} copy={copy} onOpen={setSelectedId} />
              </li>
            ))}
          </ul>
        ) : (
          <NoResults
            title={copy.noResultsTitle}
            description={copy.noResultsDescription}
            actionLabel={copy.clearFilters}
            onAction={clearFilters}
          />
        )}
      </div>

      {selected && (
        <EventDetails
          key={selected.id}
          event={selected}
          copy={copy}
          language={language}
          direction={direction}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  )
}

export default Events