import { CalendarDays, ExternalLink, Paperclip } from "lucide-react"
import DetailDialog from "../../../components/common/DetailDialog"
import SafeLink from "../../../components/common/SafeLink"
import { ACCENTS, formatLongDate, getLocalImage, getLocalizedText } from "../../../utils/contentHelpers"
import { getAnnouncementCategory, getPriority, priorityStyles } from "./announcementConfig"
import { CategoryLabel, PinnedBadge, PriorityBadge } from "./AnnouncementParts"

const AnnouncementDetails = ({ item, copy, language, direction, onClose }) => {
  const priority = getPriority(item.priority)
  const tone = ACCENTS[priorityStyles[priority].accent]
  const { icon: Icon } = getAnnouncementCategory(item.category)
  const image = getLocalImage(item.image)
  const titleId = `announcement-title-${item.id}`

  const published = formatLongDate(item.publishedAt, language)
  const updated = formatLongDate(item.updatedAt, language)
  const body = getLocalizedText(item.content, language) || getLocalizedText(item.summary, language)

  const attachmentName = getLocalizedText(item.attachment?.name, language)
  const relatedLabel = getLocalizedText(item.relatedLink?.label, language)

  return (
    <DetailDialog titleId={titleId} direction={direction} closeLabel={copy.closeLabel} onClose={onClose}>
      <div className={`flex h-28 items-center ps-6 sm:ps-8 ${tone.soft}`} aria-hidden="true">
        <Icon size={48} strokeWidth={1.2} className={tone.icon} />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={priority} label={copy.priority[priority]} />
          {item.isPinned && <PinnedBadge label={copy.pinnedLabel} />}
          <CategoryLabel label={copy.categories[item.category] || item.category || ""} />
        </div>

        <h2 id={titleId} className="heading-3 mt-4 text-text-primary [overflow-wrap:anywhere]">
          {getLocalizedText(item.title, language)}
        </h2>

        {published && (
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-text-secondary">
            <time dateTime={item.publishedAt} className="inline-flex items-center gap-2">
              <CalendarDays size={15} className={tone.icon} aria-hidden="true" />
              {copy.publishedLabel}: {published}
            </time>
            {updated && <span>{copy.updatedLabel}: {updated}</span>}
          </p>
        )}

        {image && <img src={image} alt="" loading="lazy" className="mt-5 max-h-72 w-full rounded-2xl object-cover" />}

        <p className="body-base mt-5 whitespace-pre-line text-text-secondary">{body}</p>

        {(item.attachment?.url || item.relatedLink?.url) && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {item.attachment?.url && (
              <SafeLink href={item.attachment.url} className="btn-secondary">
                <Paperclip size={16} aria-hidden="true" />
                <span>{attachmentName || copy.attachmentLabel}</span>
              </SafeLink>
            )}
            {item.relatedLink?.url && (
              <SafeLink href={item.relatedLink.url} className="btn-primary">
                <span>{relatedLabel || copy.relatedLabel}</span>
                <ExternalLink size={16} className="rtl:-scale-x-100" aria-hidden="true" />
              </SafeLink>
            )}
          </div>
        )}
      </div>
    </DetailDialog>
  )
}

export default AnnouncementDetails
