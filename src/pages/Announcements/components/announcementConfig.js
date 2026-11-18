import {
  AlarmClock, Award, BellRing, CalendarClock, CalendarX, ClipboardCheck, Sun, UserPlus, Users,
} from "lucide-react"

export const announcementCategories = {
  important: { icon: BellRing },
  cancellations: { icon: CalendarX },
  schedule: { icon: CalendarClock },
  exams: { icon: ClipboardCheck },
  registration: { icon: UserPlus },
  results: { icon: Award },
  holidays: { icon: Sun },
  deadlines: { icon: AlarmClock },
  parents: { icon: Users },
}

export const getAnnouncementCategory = (key) =>
  announcementCategories[key] || { icon: BellRing }

export const priorityStyles = {
  normal: { accent: "blue", badge: "border-brand-blue/20 bg-brand-blue/10 text-brand-blue", row: "bg-white" },
  important: { accent: "orange", badge: "border-brand-orange/30 bg-brand-orange/10 text-[#AD5800]", row: "bg-white" },
  urgent: { accent: "red", badge: "border-error bg-error text-white", row: "bg-error/5" },
}

export const getPriority = (value) => (priorityStyles[value] ? value : "normal")
