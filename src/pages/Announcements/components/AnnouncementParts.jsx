import { Pin, TriangleAlert } from "lucide-react"
import { getPriority, priorityStyles } from "./announcementConfig"

export const PriorityBadge = ({ priority, label }) => {
  const key = getPriority(priority)
  if (key === "normal") return null

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold leading-none ${priorityStyles[key].badge}`}>
      {key === "urgent" && <TriangleAlert size={13} aria-hidden="true" />}
      {label}
    </span>
  )
}

export const PinnedBadge = ({ label }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-bold leading-none text-text-secondary">
    <Pin size={12} aria-hidden="true" />
    {label}
  </span>
)

export const CategoryLabel = ({ label }) => (
  <span className="text-sm font-semibold text-text-secondary">{label}</span>
)
