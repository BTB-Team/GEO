export const API_BASE_URL = "http://localhost:5000"

// ============================================
// ACCENTS (full class strings so Tailwind can detect them)
// ============================================

export const ACCENTS = {
  blue: { icon: "text-brand-blue", badge: "text-brand-blue", soft: "bg-brand-blue/10", border: "border-brand-blue/20", edge: "border-s-brand-blue" },
  green: { icon: "text-brand-green", badge: "text-brand-green", soft: "bg-brand-green/10", border: "border-brand-green/20", edge: "border-s-brand-green" },
  orange: { icon: "text-brand-orange", badge: "text-[#AD5800]", soft: "bg-brand-orange/10", border: "border-brand-orange/25", edge: "border-s-brand-orange" },
  red: { icon: "text-error", badge: "text-error", soft: "bg-error/10", border: "border-error/25", edge: "border-s-error" },
  gray: { icon: "text-text-muted", badge: "text-text-secondary", soft: "bg-surface-secondary", border: "border-border", edge: "border-s-border" },
}

// ============================================
// TEXT
// ============================================

export const getLocalizedText = (value, language) => {
  if (typeof value === "string") return value
  return value?.[language] || value?.en || ""
}

const isLeaf = (value) =>
  value && typeof value === "object" && !Array.isArray(value) &&
  ("en" in value || "fa" in value) &&
  Object.values(value).every((entry) => typeof entry === "string")

// Localizes every {en, fa} leaf in a nested content object
export const localizeTree = (value, language) => {
  if (isLeaf(value)) return getLocalizedText(value, language)
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, localizeTree(entry, language)])
    )
  }
  return value
}

// Searchable text across both languages
export const buildSearchText = (...values) =>
  values
    .flatMap((value) =>
      typeof value === "string" ? [value] : Object.values(value || {})
    )
    .join(" ")
    .toLowerCase()

// ============================================
// URLS AND IMAGES
// ============================================

export const getLocalImage = (image) =>
  typeof image === "string" && image.startsWith("/") && !image.startsWith("//")
    ? image
    : null

export const getSafeUrl = (url) =>
  typeof url === "string" &&
  (/^https?:\/\//i.test(url) || (url.startsWith("/") && !url.startsWith("//")))
    ? url
    : null

// ============================================
// DATES
// ============================================

const getLocale = (language) =>
  language === "fa" ? "fa-AF-u-ca-persian" : "en-US"

export const formatDate = (value, language, options, timeZone) => {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""

  try {
    return new Intl.DateTimeFormat(getLocale(language), {
      ...options,
      ...(timeZone ? { timeZone } : {}),
    }).format(date)
  } catch {
    return ""
  }
}

export const formatLongDate = (value, language, timeZone) =>
  formatDate(value, language, { day: "numeric", month: "long", year: "numeric" }, timeZone)

export const formatTime = (value, language, timeZone) =>
  formatDate(value, language, { hour: "numeric", minute: "2-digit" }, timeZone)

export const formatDayMonth = (value, language, timeZone) => ({
  day: formatDate(value, language, { day: "numeric" }, timeZone),
  month: formatDate(value, language, { month: "short" }, timeZone),
})
