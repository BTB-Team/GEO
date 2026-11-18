import { Clock, MapPin } from "lucide-react"
import { ACCENTS, formatDayMonth, getLocalImage, getLocalizedText } from "../../../utils/contentHelpers"
import { getEventCategory } from "./eventConfig"
import { CategoryBadge, StatusBadge, formatTimeRange } from "./EventParts"

const EventCard = ({ event, language, copy, onOpen }) => {
  const { icon: Icon, accent } = getEventCategory(event.category)
  const tone = ACCENTS[accent]

  const image = getLocalImage(event.image)
  const { day, month } = formatDayMonth(event.startAt, language, event.timeZone)
  const time = formatTimeRange(event, language)
  const location = getLocalizedText(event.location, language)
  const isMuted = event.state === "completed" || event.state === "cancelled"

  return (
    <article className="card-custom group relative flex h-full flex-col transition duration-300 focus-within:ring-2 focus-within:ring-brand-blue/50 hover:-translate-y-1 hover:border-brand-blue/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* HEADER: date tile + status */}
      <div className={`relative flex items-start justify-between gap-3 p-4 ${tone.soft}`}>
        {image && (
          <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
        )}

        <div className="relative flex size-16 flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
          <span className={`text-xs font-bold ${tone.badge}`}>{month}</span>
          <span className="text-xl font-extrabold leading-none text-text-primary">{day}</span>
        </div>

        <div className="relative flex flex-col items-end gap-2">
          <StatusBadge state={event.state} label={copy.statuses[event.state]} />
          {!image && <Icon size={34} strokeWidth={1.2} className={`${tone.icon} opacity-50`} aria-hidden="true" />}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-5">
        <div>
          <CategoryBadge categoryKey={event.category} label={copy.categories[event.category] || event.category} />
        </div>

        <h3 className={`heading-4 mt-3 ${isMuted ? "text-text-secondary" : "text-text-primary"}`}>
          <button
            type="button"
            onClick={() => onOpen(event.id)}
            className="text-start outline-none after:absolute after:inset-0 after:content-['']"
          >
            {getLocalizedText(event.title, language)}
          </button>
        </h3>

        <p className="body-small mb-5 mt-2 line-clamp-2 text-text-secondary">
          {getLocalizedText(event.summary, language)}
        </p>

        <ul className="mt-auto space-y-2 border-t border-border pt-4 text-sm text-text-secondary">
          {time && (
            <li className="flex items-center gap-2">
              <Clock size={15} className={tone.icon} aria-hidden="true" />
              <span>{time}</span>
            </li>
          )}
          {location && (
            <li className="flex items-center gap-2">
              <MapPin size={15} className={tone.icon} aria-hidden="true" />
              <span className="truncate">{location}</span>
            </li>
          )}
        </ul>
      </div>
    </article>
  )
}

export default EventCard
