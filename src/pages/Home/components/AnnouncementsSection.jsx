
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  GraduationCap,
  Megaphone,
  MonitorPlay,
  Pin,
  RefreshCw,
  Sparkles,
} from "lucide-react"

import admissionsPhoto from "../../../assets/image/home/Announcements_image.webp"

import useLanguageStore from "../../../store/languageStore"

// ============================================
// API CONFIGURATION
// ============================================

const API_BASE_URL = "http://localhost:5000"

// ============================================
// ANNOUNCEMENT VISUAL IDENTITY
// ============================================

const announcementVisuals = {
  admissions: {
    icon: GraduationCap,
    theme: "admissions",
  },
  webinar: {
    icon: MonitorPlay,
    theme: "webinar",
  },
  schedule: {
    icon: CalendarClock,
    theme: "schedule",
  },
}

const defaultVisual = {
  icon: Megaphone,
  theme: "general",
}

// ============================================
// LOCALIZED TEXT
// ============================================

const getLocalizedText = (value, language) => {
  if (typeof value === "string") return value

  return value?.[language] || value?.en || ""
}

// ============================================
// LOCAL ANNOUNCEMENT IMAGE
// ============================================

const getLocalImage = (image) => {
  if (
    typeof image !== "string" ||
    !image.startsWith("/") ||
    image.startsWith("//")
  ) {
    return null
  }

  return image
}

// ============================================
// ANNOUNCEMENT DATE
// ============================================

const getAnnouncementDate = (value, language) => {
  if (!value) return null

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return null

  const locale =
    language === "fa"
      ? "fa-AF-u-ca-persian"
      : "en-US"

  try {
    const parts = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).formatToParts(date)

    const getPart = (type) =>
      parts.find((part) => part.type === type)?.value || ""

    return {
      day: getPart("day"),
      month: getPart("month"),
      year: getPart("year"),
      full: new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date),
    }
  } catch {
    return {
      day: "",
      month: "",
      year: "",
      full: date.toLocaleDateString(),
    }
  }
}

// ============================================
// ANNOUNCEMENT ARTWORK
// ============================================

const AnnouncementArtwork = ({ announcement }) => {
  const visual =
    announcementVisuals[announcement.type] || defaultVisual

  const AnnouncementIcon = visual.icon
  const localImage =
  getLocalImage(announcement.image) ||
  (announcement.type === "admissions"
    ? admissionsPhoto
    : null)

  return (
    <div
      className={`announcement-artwork announcement-artwork--${visual.theme}`}
      aria-hidden="true"
    >
      {localImage ? (
        <>
            <img
            src={localImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="announcement-artwork__image"
            />

            <div
            className="announcement-artwork__image-overlay"
            />

            <div
            className="announcement-artwork__image-frame"
            />
        </>
        ) : (
        <>
          <div className="announcement-artwork__orb announcement-artwork__orb--one" />

          <div className="announcement-artwork__orb announcement-artwork__orb--two" />

          <div className="announcement-artwork__ring announcement-artwork__ring--outer" />

          <div className="announcement-artwork__ring announcement-artwork__ring--inner" />

          <div className="announcement-artwork__symbol">
            <AnnouncementIcon size={68} strokeWidth={1.25} />
          </div>

          <div className="announcement-artwork__sparkle announcement-artwork__sparkle--one">
            <Sparkles size={19} />
          </div>

          <div className="announcement-artwork__sparkle announcement-artwork__sparkle--two">
            <Sparkles size={14} />
          </div>

          <div className="announcement-artwork__dots" />
        </>
      )}
    </div>
  )
}

// ============================================
// ANNOUNCEMENT TYPE BADGE
// ============================================

const AnnouncementTypeBadge = ({
  announcement,
  copy,
}) => {
  const visual =
    announcementVisuals[announcement.type] || defaultVisual

  const TypeIcon = visual.icon

  const label =
    getLocalizedText(
      copy.typeLabels?.[announcement.type],
      copy.language
    ) || announcement.type

  return (
    <span
      className={`announcement-type-badge announcement-type-badge--${visual.theme}`}
    >
      <TypeIcon size={14} strokeWidth={2} />

      <span>{label}</span>
    </span>
  )
}

// ============================================
// PINNED BADGE
// ============================================

const AnnouncementPinnedBadge = ({ label }) => (
  <span className="announcement-pinned-badge">
    <Pin size={12} strokeWidth={2.2} />
    <span>{label}</span>
  </span>
)

// ============================================
// FEATURED ANNOUNCEMENT CARD
// ============================================

const FeaturedAnnouncement = ({
  announcement,
  copy,
  language,
}) => {
  const date = getAnnouncementDate(
    announcement.publishedAt,
    language
  )

  return (
    <article
      className={`announcement-card announcement-card--featured announcement-card--${
        announcementVisuals[announcement.type]?.theme ||
        defaultVisual.theme
      }`}
    >
      {/* AMBIENT BACKGROUND */}

      <div
        className="announcement-featured__ambient"
        aria-hidden="true"
      />

      {/* CONTENT LAYOUT */}

      <div className="announcement-featured__layout">

        {/* MAIN CONTENT */}

        <div className="announcement-featured__content">

          {/* BADGES */}

          <div className="announcement-featured__badges">

            {announcement.isPinned && (
              <AnnouncementPinnedBadge
                label={copy.pinnedLabel}
              />
            )}

            <AnnouncementTypeBadge
              announcement={announcement}
              copy={copy}
            />

          </div>

          {/* TITLE */}

          <h3 className="announcement-featured__title">
            {getLocalizedText(
              announcement.title,
              language
            )}
          </h3>

          {/* SUMMARY */}

          <p className="announcement-featured__summary">
            {getLocalizedText(
              announcement.summary,
              language
            )}
          </p>

          {/* FOOTER */}

          <div className="announcement-featured__footer">

            {date && (
              <time
                dateTime={announcement.publishedAt}
                className="announcement-featured__date"
              >
                <CalendarDays size={17} />

                <span>{date.full}</span>
              </time>
            )}

            <span
              className="announcement-featured__accent"
              aria-hidden="true"
            />

          </div>

        </div>

        {/* VISUAL ARTWORK */}

        <div className="announcement-featured__visual">
          <AnnouncementArtwork
            announcement={announcement}
          />
        </div>

      </div>
    </article>
  )
}

// ============================================
// COMPACT ANNOUNCEMENT CARD
// ============================================

const AnnouncementCard = ({
  announcement,
  copy,
  language,
}) => {
  const visual =
    announcementVisuals[announcement.type] || defaultVisual

  const AnnouncementIcon = visual.icon

  const date = getAnnouncementDate(
    announcement.publishedAt,
    language
  )

  return (
    <article
      className={`announcement-card announcement-card--compact announcement-card--${visual.theme}`}
    >
      {/* CARD HEADER */}

      <div className="announcement-compact__header">

        <div className="announcement-compact__icon">
          <AnnouncementIcon
            size={23}
            strokeWidth={1.7}
          />
        </div>

        <div className="announcement-compact__badges">

          {announcement.isPinned && (
            <AnnouncementPinnedBadge
              label={copy.pinnedLabel}
            />
          )}

          <AnnouncementTypeBadge
            announcement={announcement}
            copy={copy}
          />

        </div>

      </div>

      {/* CARD CONTENT */}

      <div className="announcement-compact__content">

        <h3 className="announcement-compact__title">
          {getLocalizedText(
            announcement.title,
            language
          )}
        </h3>

        <p className="announcement-compact__summary">
          {getLocalizedText(
            announcement.summary,
            language
          )}
        </p>

      </div>

      {/* CARD FOOTER */}

      <div className="announcement-compact__footer">

        {date && (
          <time
            dateTime={announcement.publishedAt}
            className="announcement-compact__date"
          >
            <CalendarClock size={15} />
            <span>{date.full}</span>
          </time>
        )}

        <span
          className="announcement-compact__line"
          aria-hidden="true"
        />

      </div>
    </article>
  )
}

// ============================================
// LOADING SKELETON
// ============================================

const AnnouncementsSkeleton = ({
  direction,
  loadingLabel,
}) => (
  <section
    dir={direction}
    className="announcements-section section-padding"
    aria-busy="true"
    aria-label={loadingLabel}
  >
    <div className="container-custom">

      <div className="announcements-skeleton__header">
        <div className="announcements-skeleton__eyebrow" />
        <div className="announcements-skeleton__title" />
        <div className="announcements-skeleton__description" />
      </div>

      <div className="announcements-skeleton__grid">

        <div className="announcements-skeleton__featured">
          <div className="announcements-skeleton__shape" />
          <div className="announcements-skeleton__line announcements-skeleton__line--large" />
          <div className="announcements-skeleton__line" />
          <div className="announcements-skeleton__line announcements-skeleton__line--short" />
        </div>

        <div className="announcements-skeleton__side">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="announcements-skeleton__card"
            >
              <div className="announcements-skeleton__shape announcements-skeleton__shape--small" />
              <div className="announcements-skeleton__line announcements-skeleton__line--large" />
              <div className="announcements-skeleton__line" />
              <div className="announcements-skeleton__line announcements-skeleton__line--short" />
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
)

// ============================================
// ANNOUNCEMENTS SECTION
// ============================================

const AnnouncementsSection = () => {
  const [sectionContent, setSectionContent] = useState(null)
  const [announcements, setAnnouncements] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const language = useLanguageStore(
    (state) => state.language
  )

  const direction = useLanguageStore(
    (state) => state.direction
  )

  // ==========================================
  // LOCALIZED SECTION CONTENT
  // ==========================================

  const copy = sectionContent
    ? {
        eyebrow: getLocalizedText(
          sectionContent.eyebrow,
          language
        ),
        title: getLocalizedText(
          sectionContent.title,
          language
        ),
        description: getLocalizedText(
          sectionContent.description,
          language
        ),
        actionLabel: getLocalizedText(
          sectionContent.actionLabel,
          language
        ),
        pinnedLabel: getLocalizedText(
          sectionContent.pinnedLabel,
          language
        ),
        typeLabels: sectionContent.typeLabels || {},
        loadingLabel: getLocalizedText(
          sectionContent.loadingLabel,
          language
        ),
        errorTitle: getLocalizedText(
          sectionContent.errorTitle,
          language
        ),
        errorDescription: getLocalizedText(
          sectionContent.errorDescription,
          language
        ),
        retryLabel: getLocalizedText(
          sectionContent.retryLabel,
          language
        ),
        emptyTitle: getLocalizedText(
          sectionContent.emptyTitle,
          language
        ),
        emptyDescription: getLocalizedText(
          sectionContent.emptyDescription,
          language
        ),
        language,
      }
    : null

  const actionPath =
    typeof sectionContent?.actionPath === "string" &&
    sectionContent.actionPath.startsWith("/") &&
    !sectionContent.actionPath.startsWith("//")
      ? sectionContent.actionPath
      : null

  // ==========================================
  // FETCH ANNOUNCEMENT DATA
  // ==========================================

  useEffect(() => {
    const controller = new AbortController()

    const fetchAnnouncements = async () => {
      try {
        const [homepageResponse, announcementsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/homepageContent`, {
              signal: controller.signal,
            }),
            fetch(`${API_BASE_URL}/announcements`, {
              signal: controller.signal,
            }),
          ])

        if (!homepageResponse.ok) {
          throw new Error(
            "Failed to fetch announcements section content"
          )
        }

        const homepageData = await homepageResponse.json()

        if (
          !homepageData?.announcementsSection ||
          typeof homepageData.announcementsSection !== "object"
        ) {
          throw new Error(
            "Invalid announcements section content"
          )
        }

        const content = homepageData.announcementsSection

        setSectionContent(content)

        if (!announcementsResponse.ok) {
          throw new Error(
            "Failed to fetch announcements"
          )
        }

        const announcementsData =
          await announcementsResponse.json()

        if (!Array.isArray(announcementsData)) {
          throw new Error(
            "Invalid announcements data"
          )
        }

        // PUBLISHED AND NON-EXPIRED ANNOUNCEMENTS

        const now = Date.now()

        const publishedAnnouncements = announcementsData
          .filter((announcement) => {
            if (
              !announcement?.id ||
              !announcement?.title ||
              !announcement?.summary ||
              announcement.status !== "published"
            ) {
              return false
            }

            if (!announcement.expiresAt) return true

            const expirationDate = Date.parse(
              announcement.expiresAt
            )

            return (
              Number.isNaN(expirationDate) ||
              expirationDate >= now
            )
          })
          .sort((first, second) => {
            const pinnedOrder =
              Number(Boolean(second.isPinned)) -
              Number(Boolean(first.isPinned))

            if (pinnedOrder !== 0) return pinnedOrder

            const firstOrder =
              Number(first.sortOrder) || 0

            const secondOrder =
              Number(second.sortOrder) || 0

            if (firstOrder !== secondOrder) {
              return firstOrder - secondOrder
            }

            return (
              (Date.parse(second.publishedAt) || 0) -
              (Date.parse(first.publishedAt) || 0)
            )
          })

        // DISPLAY LIMIT

        const requestedLimit = Number(content.limit)

        const displayLimit =
          Number.isInteger(requestedLimit) &&
          requestedLimit > 0
            ? requestedLimit
            : 3

        setAnnouncements(
          publishedAnnouncements.slice(0, displayLimit)
        )

        setHasError(false)

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Announcements Section Error:",
            error
          )

          setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchAnnouncements()

    return () => controller.abort()
  }, [retryCount])

  // ==========================================
  // RETRY HANDLER
  // ==========================================

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    setRetryCount((previous) => previous + 1)
  }

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return (
      <AnnouncementsSkeleton
        direction={direction}
        loadingLabel={copy?.loadingLabel}
      />
    )
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (hasError) {
    if (!copy) return null

    return (
      <section
        dir={direction}
        className="announcements-section announcements-section--state"
      >
        <div className="container-custom">

          <div
            className="announcement-state-card"
            role="alert"
          >
            <div className="announcement-state-card__icon">
              <Megaphone size={30} />
            </div>

            <h2>
              {copy.errorTitle}
            </h2>

            <p>
              {copy.errorDescription}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="announcement-retry-button"
            >
              <RefreshCw size={16} />
              <span>{copy.retryLabel}</span>
            </button>

          </div>

        </div>
      </section>
    )
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (announcements.length === 0) {
    return (
      <section
        dir={direction}
        className="announcements-section announcements-section--state"
      >
        <div className="container-custom">

          <div className="announcement-state-card">

            <div className="announcement-state-card__icon">
              <Megaphone size={30} />
            </div>

            <h2>
              {copy?.emptyTitle}
            </h2>

            <p>
              {copy?.emptyDescription}
            </p>

          </div>

        </div>
      </section>
    )
  }

  // ==========================================
  // ACTIVE ANNOUNCEMENTS
  // ==========================================

  const featuredAnnouncement = announcements[0]

  const supportingAnnouncements =
    announcements.slice(1, 3)

  // ==========================================
  // SECTION DESIGN
  // ==========================================

  return (
    <section
      id="announcements"
      dir={direction}
      className="announcements-section section-padding"
      aria-labelledby="announcements-title"
    >
      <div className="container-custom">

        {/* SECTION HEADER */}

        <div className="announcements-header">

          <div className="announcements-header__content">

            <div className="announcements-eyebrow">
              <Sparkles
                size={15}
                className="announcements-eyebrow__icon"
                aria-hidden="true"
              />

              <span>{copy.eyebrow}</span>
            </div>

            <h2
              id="announcements-title"
              className="announcements-heading"
            >
              {copy.title}
            </h2>

            <p className="announcements-description">
              {copy.description}
            </p>

          </div>

          {/* ALL ANNOUNCEMENTS */}

          {actionPath && (
            <Link
              to={actionPath}
              className="announcements-all-link"
            >
              <span>{copy.actionLabel}</span>

              {direction === "rtl" ? (
                <ArrowLeft
                  size={18}
                  aria-hidden="true"
                />
              ) : (
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                />
              )}
            </Link>
          )}

        </div>

        {/* EDITORIAL ANNOUNCEMENT GRID */}

        <div className="announcements-grid">

          {/* FEATURED ANNOUNCEMENT */}

          <div className="announcements-grid__featured">
            <FeaturedAnnouncement
              announcement={featuredAnnouncement}
              copy={copy}
              language={language}
            />
          </div>

          {/* SUPPORTING ANNOUNCEMENTS */}

          {supportingAnnouncements.length > 0 && (
            <div className="announcements-grid__supporting">

              {supportingAnnouncements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  copy={copy}
                  language={language}
                />
              ))}

            </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default AnnouncementsSection
