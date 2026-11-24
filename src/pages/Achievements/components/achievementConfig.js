import {
  Award,
  BadgeCheck,
  BookOpen,
  Bot,
  FlaskConical,
  GraduationCap,
  Medal,
  Star,
  Trophy,
} from "lucide-react"

export const ACCENTS = {
  blue: {
    iconText: "text-brand-blue",
    badgeText: "text-brand-blue",
    soft: "bg-brand-blue/10",
    border: "border-brand-blue/20",
  },
  green: {
    iconText: "text-brand-green",
    badgeText: "text-brand-green",
    soft: "bg-brand-green/10",
    border: "border-brand-green/20",
  },
  orange: {
    iconText: "text-brand-orange",
    badgeText: "text-[#AD5800]",
    soft: "bg-brand-orange/10",
    border: "border-brand-orange/25",
  },
}


export const categoryConfig = {
  honors: { icon: Medal, accent: "orange" },
  grades: { icon: Star, accent: "blue" },
  admissions: { icon: GraduationCap, accent: "green" },
  scholarships: { icon: Award, accent: "orange" },
  competitions: { icon: Trophy, accent: "orange" },
  scientific: { icon: FlaskConical, accent: "green" },
  robotics: { icon: Bot, accent: "blue" },
  publications: { icon: BookOpen, accent: "blue" },
  certificates: { icon: BadgeCheck, accent: "green" },
}

const categoryAliases = {
  academic: "grades",
  project: "scientific",
  scholarship: "scholarships",
}

const defaultCategory = { icon: Award, accent: "blue" }

export const getCategoryKey = (raw) => categoryAliases[raw] || raw || "general"

export const getCategory = (raw) =>
  categoryConfig[getCategoryKey(raw)] || defaultCategory


export const getLocalizedText = (value, language) => {
  if (typeof value === "string") return value
  return value?.[language] || value?.en || ""
}

export const getLocalImage = (image) => {
  if (
    typeof image !== "string" ||
    !image.startsWith("/") ||
    image.startsWith("//")
  ) {
    return null
  }
  return image
}

export const formatAchievementDate = (value, language, options) => {
  if (!value) return ""

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""

  const locale = language === "fa" ? "fa-AF-u-ca-persian" : "en-US"

  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone: "UTC",
      ...options,
    }).format(date)
  } catch {
    return ""
  }
}

export const formatYear = (value, language) =>
  formatAchievementDate(value, language, { year: "numeric" })

export const formatFullDate = (value, language) =>
  formatAchievementDate(value, language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

export const getInitials = (name) => {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  const first = Array.from(parts[0])[0]
  const second = parts[1] ? Array.from(parts[1])[0] : ""
  return `${first}${second}`
}
