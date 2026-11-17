import { CalendarDays, Clock, ExternalLink, Flag, MapPin } from "lucide-react"
import DetailDialog from "../../../components/common/DetailDialog"
import SafeLink from "../../../components/common/SafeLink"
import { ACCENTS, formatLongDate, getLocalImage, getLocalizedText } from "../../../utils/contentHelpers"
import { getEventCategory } from "./eventConfig"
import { CategoryBadge, StatusBadge, formatTimeRange } from "./EventParts"

const EventDetails = ({ event, copy, language, direction, onClose }) => {
  const { icon: Icon, accent } = getEventCategory(event.category)
  const tone = ACCENTS[accent]
  const image = getLocalImage(event.image)
  const titleId = `event-title-${event.id}`

  const startDate = formatLongDate(event.startAt, language, event.timeZone)
  const endDate = formatLongDate(event.endAt, language, event.timeZone)
  const dateText = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate

  const details = [
    { icon: CalendarDays, label: copy.dateLabel, value: dateText },
    { icon: Clock, label: copy.timeLabel, value: formatTimeRange(event, language) },
    { icon: MapPin, label: copy.locationLabel, value: getLocalizedText(event.location, language) },
    { icon: Flag, label: copy.statusLabel, value: copy.statuses[event.state] },
  ].filter((detail) => detail.value)

  const canRegister = event.registrationUrl && (event.state === "upcoming" || event.state === "ongoing")

  return (
    <DetailDialog titleId={titleId} direction={direction} closeLabel={copy.closeLabel} onClose={onClose}>
      <div className={`relative h-36 overflow-hidden sm:h-44 ${tone.soft}`}>
        {image ? (
          <img src={image} alt="" className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center" aria-hidden="true">
            <Icon size={64} strokeWidth={1.1} className={`${tone.icon} opacity-60`} />
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <StatusBadge state={event.state} label={copy.statuses[event.state]} />
          <CategoryBadge categoryKey={event.category} label={copy.categories[event.category] || event.category} />
        </div>

        <h2 id={titleId} className="heading-3 mt-4 text-text-primary [overflow-wrap:anywhere]">
          {getLocalizedText(event.title, language)}
        </h2>

        <p className="body-base mt-4 text-text-secondary">
          {getLocalizedText(event.description, language) || getLocalizedText(event.summary, language)}
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {details.map(({ icon: DetailIcon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-surface p-4">
              <dt className="flex items-center gap-2 text-sm font-semibold text-text-muted">
                <DetailIcon size={14} aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-1 text-base font-bold text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>

        {canRegister && (
          <SafeLink href={event.registrationUrl} className="btn-primary mt-6 w-full sm:w-auto">
            <span>{copy.registerLabel}</span>
            <ExternalLink size={16} className="rtl:-scale-x-100" aria-hidden="true" />
          </SafeLink>
        )}
      </div>
    </DetailDialog>
  )
}

export default EventDetails
