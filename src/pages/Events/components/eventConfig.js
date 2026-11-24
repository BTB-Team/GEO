import {
  Bus, CalendarRange, ClipboardCheck, MonitorPlay, Palette, Trophy, UserPlus, Users, Wrench,
} from "lucide-react"
import { formatTime } from "../../../utils/contentHelpers"

export const eventCategories = {
  registration: { icon: UserPlus, accent: "orange" },
  webinars: { icon: MonitorPlay, accent: "green" },
  exams: { icon: ClipboardCheck, accent: "blue" },
  competitions: { icon: Trophy, accent: "orange" },
  workshops: { icon: Wrench, accent: "green" },
  activities: { icon: Palette, accent: "blue" },
  parents: { icon: Users, accent: "green" },
  trips: { icon: Bus, accent: "orange" },
  calendar: { icon: CalendarRange, accent: "blue" },
}

export const getEventCategory = (key) =>
  eventCategories[key] || { icon: CalendarRange, accent: "blue" }

// Badge look per status (full class strings for Tailwind)
export const statusStyles = {
  upcoming: "border-brand-blue/20 bg-brand-blue/10 text-brand-blue",
  ongoing: "border-brand-green/25 bg-brand-green/10 text-brand-green",
  completed: "border-border bg-surface-secondary text-text-secondary",
  cancelled: "border-error/25 bg-error/10 text-error",
}

// Status comes from the dates; only "cancelled" is stored explicitly.
export const getEventState = (event, now) => {
  if (event.status === "cancelled") return "cancelled"

  const start = Date.parse(event.startAt)
  const end = Date.parse(event.endAt) || start

  if (Number.isNaN(start) || now < start) return "upcoming"
  return now <= end ? "ongoing" : "completed"
}

export const formatTimeRange = (event, language) => {
  const start = formatTime(event.startAt, language, event.timeZone)
  const end = formatTime(event.endAt, language, event.timeZone)
  if (!start) return ""
  return end && end !== start ? `${start} – ${end}` : start
}