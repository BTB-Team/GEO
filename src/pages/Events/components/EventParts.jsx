/* eslint-disable react-refresh/only-export-components */
import { ACCENTS, formatTime } from "../../../utils/contentHelpers"
import { getEventCategory, statusStyles } from "./eventConfig"

export const StatusBadge = ({ state, label }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold leading-none ${statusStyles[state]}`}>
    {state === "ongoing" && (
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-50 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
      </span>
    )}
    {label}
  </span>
)

export const CategoryBadge = ({ categoryKey, label }) => {
  const { icon: Icon, accent } = getEventCategory(categoryKey)
  const tone = ACCENTS[accent]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold leading-none ${tone.border} ${tone.soft} ${tone.badge}`}>
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  )
}

export const formatTimeRange = (event, language) => {
  const start = formatTime(event.startAt, language, event.timeZone)
  const end = formatTime(event.endAt, language, event.timeZone)
  if (!start) return ""
  return end && end !== start ? `${start} – ${end}` : start
}
