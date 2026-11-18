import { CalendarDays } from "lucide-react"
import { ACCENTS, formatLongDate, getLocalizedText } from "../../../utils/contentHelpers"
import { getAnnouncementCategory, getPriority, priorityStyles } from "./announcementConfig"
import { CategoryLabel, PinnedBadge, PriorityBadge } from "./AnnouncementParts"

const AnnouncementItem = ({ item, language, copy, onOpen, highlight = false }) => {
  const priority = getPriority(item.priority)
  const tone = ACCENTS[priorityStyles[priority].accent]
  const { icon: Icon } = getAnnouncementCategory(item.category)
  const date = formatLongDate(item.publishedAt, language)

  return (
    <article
      className={`relative flex gap-4 rounded-2xl border border-s-4 border-border ${tone.edge} ${priorityStyles[priority].row} p-5 transition duration-300 focus-within:ring-2 focus-within:ring-brand-blue/50 hover:shadow-card motion-reduce:transition-none ${highlight ? "sm:p-7" : ""}`}
    >
      <div className={`hidden size-12 shrink-0 place-items-center rounded-xl sm:grid ${tone.soft} ${tone.icon}`} aria-hidden="true">
        <Icon size={22} strokeWidth={1.7} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={priority} label={copy.priority[priority]} />
          {item.isPinned && <PinnedBadge label={copy.pinnedLabel} />}
          <CategoryLabel label={copy.categories[item.category] || item.category || ""} />
        </div>

        <h3 className={`mt-3 text-text-primary ${highlight ? "heading-3" : "heading-4"}`}>
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className="text-start outline-none after:absolute after:inset-0 after:content-['']"
          >
            {getLocalizedText(item.title, language)}
          </button>
        </h3>

        <p className="body-base mt-2 line-clamp-2 text-text-secondary">
          {getLocalizedText(item.summary, language)}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          {date && (
            <time dateTime={item.publishedAt} className="inline-flex items-center gap-2 font-semibold text-text-secondary">
              <CalendarDays size={15} className={tone.icon} aria-hidden="true" />
              {date}
            </time>
          )}
          <span className="font-bold text-brand-blue">{copy.readLabel}</span>
        </div>
      </div>
    </article>
  )
}

export default AnnouncementItem
