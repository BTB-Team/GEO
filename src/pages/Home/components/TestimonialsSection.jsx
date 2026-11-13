
import { useEffect, useState } from "react"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Quote,
  RefreshCw,
  Sparkles,
  Star,
} from "lucide-react"

// LOCAL STUDENT PHOTOS
import studentPhoto1 from "../../../assets/image/home/TestimonialsSection_student_1.webp"
import studentPhoto2 from "../../../assets/image/home/TestimonialsSection_student_2.webp"
import studentPhoto3 from "../../../assets/image/home/TestimonialsSection_student_3.webp"

// LOCAL EDUCATIONAL IMAGES
import groupWorkImage1 from "../../../assets/image/home/TestimonialsSection_hero_groupWork_1.webp"
import groupWorkImage2 from "../../../assets/image/home/TestimonialsSection_hero_groupWork_2.webp"

import useLanguageStore from "../../../store/languageStore"

// ============================================
// API CONFIGURATION
// ============================================

const API_BASE_URL = "http://localhost:5000"


// ============================================
// LOCAL IMAGE ASSETS
// ============================================

const studentPhotoAssets = {
  student_1: studentPhoto1,
  student_2: studentPhoto2,
  student_3: studentPhoto3,
}

const learningVisualAssets = {
  groupWork_1: groupWorkImage1,
  groupWork_2: groupWorkImage2,
}

// ============================================
// LOCALIZED TEXT
// ============================================

const getLocalizedText = (value, language) => {
  if (typeof value === "string") return value

  return value?.[language] || value?.en || ""
}

// ============================================
// STUDENT INITIALS
// ============================================

const getInitials = (name) => {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) return "?"

  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map((word) => Array.from(word)[0])
      .join("")
  }

  return Array.from(words[0]).slice(0, 2).join("")
}

// ============================================
// STUDENT AVATAR
// ============================================

const StudentAvatar = ({ testimonial, language, size = "normal" }) => {
  const [failedPhoto, setFailedPhoto] = useState(null)

  const name = getLocalizedText(
    testimonial.studentName,
    language
  )

  const photoValue =
    typeof testimonial.photo === "string"
      ? testimonial.photo.trim()
      : ""

  const photo = studentPhotoAssets[photoValue] || null


  const dimensions =
    size === "large"
      ? "h-14 w-14 text-base"
      : "h-11 w-11 text-sm"

  if (photo && failedPhoto !== photo) {
    return (
      <img
        src={photo}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setFailedPhoto(photo)}
        className={`${dimensions} shrink-0 rounded-full border-2 border-white/80 object-cover shadow-md`}
      />
    )
  }

  return (
    <div
      aria-label={name}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-linear-to-br from-brand-blue to-brand-green font-bold text-white shadow-md ${dimensions}`}
    >
      {getInitials(name)}
    </div>
  )
}

// ============================================
// STAR RATING
// ============================================

const RatingStars = ({ rating }) => {
  const safeRating = Math.min(
    5,
    Math.max(0, Math.floor(Number(rating) || 0))
  )

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${safeRating}/5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          strokeWidth={1.7}
          className={
            index < safeRating
              ? "fill-brand-orange text-brand-orange"
              : "text-text-muted/40"
          }
        />
      ))}
    </div>
  )
}

// ============================================
// REVEAL ANIMATION
// ============================================

const Reveal = ({ children, delay = 0, className = "" }) => {
  return (
    <div
      className={`testimonial-reveal ${className}`}
      style={{
        "--testimonial-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ============================================
// FEATURED TESTIMONIAL
// ============================================

const FeaturedTestimonial = ({
  testimonial,
  language,
  sectionContent,
  courseName,
}) => {
  const studentName = getLocalizedText(
    testimonial.studentName,
    language
  )

  const quote = getLocalizedText(
    testimonial.quote,
    language
  )

  const role = getLocalizedText(
    testimonial.role,
    language
  )

  const featuredLabel = getLocalizedText(
    sectionContent.featuredLabel,
    language
  )

  return (
    <article
      key={testimonial.id}
      aria-live="polite"
      className="testimonial-glass testimonial-story-enter relative isolate flex min-h-105 flex-col overflow-hidden rounded-4xl p-6 sm:min-h-120 sm:p-9 lg:min-h-145 lg:p-11"
    >

      {/* GLASS CARD BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/65 via-white/30 to-brand-blue/5"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-20 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-s-0 -z-10 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
      />

      {/* TOP HEADER */}

      <div className="relative flex flex-wrap items-center justify-between gap-3">

        <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white/65 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-blue backdrop-blur-md sm:text-xs">

          <Sparkles
            size={14}
            className="text-brand-orange"
          />

          {featuredLabel}

        </span>

        <RatingStars rating={testimonial.rating} />

      </div>

      {/* QUOTATION */}

      <div className="relative mt-8 sm:mt-11">

        <Quote
          size={48}
          strokeWidth={1.5}
          className="mb-5 text-brand-blue/20 sm:h-14 sm:w-14"
          aria-hidden="true"
        />

        <blockquote className="max-w-3xl text-lg font-semibold leading-[1.9] text-text-primary sm:text-xl lg:text-[1.65rem] lg:leading-[1.85]">
          {quote}
        </blockquote>

        <div
          aria-hidden="true"
          className="mt-7 h-1 w-16 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-orange"
        />

      </div>

      {/* AUTHOR */}

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-5 border-t border-white/70 pt-7 sm:pt-8">

        <div className="flex min-w-0 items-center gap-3">

          <StudentAvatar
            testimonial={testimonial}
            language={language}
            size="large"
          />

          <div className="min-w-0">

            <h3 className="truncate text-sm font-extrabold text-text-primary sm:text-base">
              {studentName}
            </h3>

            {role && (
              <p className="mt-1 truncate text-xs text-text-secondary">
                {role}
              </p>
            )}

            {courseName && (
              <span className="mt-2 inline-flex max-w-full items-center gap-1.5 truncate rounded-full bg-brand-blue/5 px-2.5 py-1 text-[10px] font-semibold text-brand-blue">
                <BookOpen size={12} />
                <span className="truncate">{courseName}</span>
              </span>
            )}

          </div>

        </div>

        <span
          aria-hidden="true"
          className="select-none text-5xl font-black text-brand-blue/[0.07] sm:text-6xl"
        >
          “
        </span>

      </div>

    </article>
  )
}

// ============================================
// SECONDARY TESTIMONIAL CARD
// ============================================

const TestimonialCard = ({
  testimonial,
  language,
  courseName,
  index,
  onSelect,
}) => {
  const studentName = getLocalizedText(
    testimonial.studentName,
    language
  )

  const quote = getLocalizedText(
    testimonial.quote,
    language
  )

  const role = getLocalizedText(
    testimonial.role,
    language
  )

  return (
    <Reveal delay={index * 130}>
      <button
        type="button"
        onClick={onSelect}
        className="group relative flex min-h-43 w-full flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/55 p-5 text-start shadow-[0_10px_35px_rgba(15,23,42,0.045)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/20 hover:bg-white/80 hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
      >

        {/* CARD TOP */}

        <div className="flex items-center justify-between gap-3">

          <Quote
            size={25}
            className="text-brand-blue/30 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-blue/60"
          />

          <RatingStars rating={testimonial.rating} />

        </div>

        {/* QUOTE */}

        <p className="mt-4 line-clamp-3 text-sm font-medium leading-7 text-text-secondary sm:text-[0.9rem]">
          {quote}
        </p>

        {/* AUTHOR */}

        <div className="mt-auto flex min-w-0 items-center gap-3 border-t border-border/70 pt-4">

          <StudentAvatar
            testimonial={testimonial}
            language={language}
          />

          <div className="min-w-0 flex-1">

            <h3 className="truncate text-xs font-extrabold text-text-primary sm:text-sm">
              {studentName}
            </h3>

            <p className="mt-1 truncate text-[10px] text-text-secondary sm:text-xs">
              {courseName || role}
            </p>

          </div>

          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/5 text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white"
          >
            {language === "fa" ? (
              <ChevronLeft size={17} />
            ) : (
              <ChevronRight size={17} />
            )}
          </span>

        </div>

      </button>
    </Reveal>
  )
}

// ============================================
// EDUCATIONAL PHOTO COLLAGE
// ============================================

const LearningPhotoCollage = ({ images, language }) => {
  const firstImage = images[0]
  const secondImage = images[1]

  if (!firstImage) return null

  return (
    <Reveal className="relative min-h-62 overflow-hidden rounded-[1.75rem]">

      {/* AMBIENT BACKGROUND */}

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-brand-green/15 via-brand-blue/10 to-brand-orange/10"
      />

      {/* PRIMARY IMAGE */}

      <div className="testimonial-photo testimonial-photo-primary absolute inset-s-0 top-0 h-[87%] w-[78%] overflow-hidden rounded-[1.6rem] border-[5px] border-white/80 shadow-[0_15px_35px_rgba(15,23,42,0.12)] sm:border-[7px]">

        <img
          src={firstImage.src}
          alt={getLocalizedText(firstImage.alt, language)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-brand-blue/20 via-transparent to-transparent"
        />

      </div>

      {/* SECONDARY IMAGE */}

      {secondImage && (
        <div className="testimonial-photo testimonial-photo-secondary absolute bottom-0 inset-e-0 h-[72%] w-[43%] overflow-hidden rounded-3xl border-[5px] border-white/90 shadow-[0_15px_35px_rgba(15,23,42,0.16)] sm:border-[7px]">

          <img
            src={secondImage.src}
            alt={getLocalizedText(secondImage.alt, language)}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />

        </div>
      )}

      {/* GLASS ACCENT */}

      <div
        aria-hidden="true"
        className="absolute inset-e-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/55 text-brand-blue shadow-sm backdrop-blur-xl"
      >
        <Sparkles size={21} />
      </div>

      {/* DECORATIVE DOTS */}

      <div
        aria-hidden="true"
        className="absolute bottom-5 inset-s-5 grid grid-cols-3 gap-1.5 opacity-60"
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-white shadow-sm"
          />
        ))}
      </div>

    </Reveal>
  )
}

// ============================================
// LOADING SKELETON
// ============================================

const TestimonialsSkeleton = ({ direction }) => (
  <section
    dir={direction}
    aria-busy="true"
    className="section-padding bg-background"
  >
    <div className="container-custom">

      <div className="testimonials-aurora animate-pulse rounded-4xl p-5 sm:p-8 lg:p-12">

        <div className="mb-10 space-y-4">
          <div className="h-6 w-36 rounded-full bg-white/60" />
          <div className="h-10 w-full max-w-xl rounded-xl bg-white/60" />
          <div className="h-4 w-full max-w-md rounded bg-white/50" />
        </div>

        <div className="grid gap-5 xl:grid-cols-12">

          <div className="min-h-115 rounded-4xl bg-white/60 xl:col-span-7" />

          <div className="grid gap-4 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-1">
            <div className="min-h-60 rounded-[1.75rem] bg-white/50 sm:col-span-2" />
            <div className="min-h-40 rounded-3xl bg-white/50" />
            <div className="min-h-40 rounded-3xl bg-white/50" />
          </div>

        </div>

      </div>

    </div>
  </section>
)

// ============================================
// TESTIMONIALS SECTION
// ============================================

const TestimonialsSection = () => {
  const [sectionContent, setSectionContent] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [courses, setCourses] = useState([])

  const [activeIndex, setActiveIndex] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  // ==========================================
  // FETCH TESTIMONIAL DATA
  // ==========================================

  useEffect(() => {
    const controller = new AbortController()

    const fetchTestimonials = async () => {
      try {
        // HOMEPAGE CONTENT

        const homepageResponse = await fetch(
          `${API_BASE_URL}/homepageContent`,
          { signal: controller.signal }
        )

        if (!homepageResponse.ok) {
          throw new Error("Failed to fetch testimonials content")
        }

        const homepageData = await homepageResponse.json()

        if (
          !homepageData?.testimonialsSection ||
          typeof homepageData.testimonialsSection !== "object"
        ) {
          throw new Error("Invalid testimonials section content")
        }

        const content = homepageData.testimonialsSection

        setSectionContent(content)

        // TESTIMONIALS + OPTIONAL COURSES

        const coursesRequest = fetch(
          `${API_BASE_URL}/courses`,
          { signal: controller.signal }
        )
          .then(async (response) => {
            if (!response.ok) return []

            const data = await response.json()

            return Array.isArray(data) ? data : []
          })
          .catch((error) => {
            if (error.name !== "AbortError") {
              console.warn("Testimonials course lookup:", error)
            }

            return []
          })

        const [testimonialsResponse, coursesData] =
          await Promise.all([
            fetch(`${API_BASE_URL}/testimonials`, {
              signal: controller.signal,
            }),
            coursesRequest,
          ])

        if (!testimonialsResponse.ok) {
          throw new Error("Failed to fetch student testimonials")
        }

        const testimonialsData =
          await testimonialsResponse.json()

        if (!Array.isArray(testimonialsData)) {
          throw new Error("Invalid testimonials data")
        }

        // PUBLISHED TESTIMONIALS

        const requestedLimit = Number(content.limit)

        const displayLimit =
          Number.isInteger(requestedLimit) && requestedLimit > 0
            ? requestedLimit
            : testimonialsData.length

        const publishedTestimonials = testimonialsData
          .filter(
            (item) =>
              item?.id &&
              item?.status === "published" &&
              item?.studentName &&
              item?.quote
          )
          .sort(
            (first, second) =>
              Number(Boolean(second.isFeatured)) -
                Number(Boolean(first.isFeatured)) ||
              (Number(first.sortOrder) || 0) -
                (Number(second.sortOrder) || 0)
          )
          .slice(0, displayLimit)

        setTestimonials(publishedTestimonials)
        setCourses(coursesData)
        setActiveIndex(0)
        setHasError(false)

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Testimonials Section Error:", error)
          setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchTestimonials()

    return () => controller.abort()
  }, [retryCount])

  // ==========================================
  // COURSE LOOKUP
  // ==========================================

  const getCourseName = (courseId) => {
    const course = courses.find(
      (item) => item.id === courseId
    )

    return getLocalizedText(course?.title, language)
  }

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return <TestimonialsSkeleton direction={direction} />
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (hasError) {
    const retryLabel =
      getLocalizedText(sectionContent?.retryLabel, language) ||
      (language === "fa" ? "تلاش دوباره" : "Try Again")

    return (
      <section
        dir={direction}
        className="section-padding bg-background"
      >
        <div className="container-custom">

          <div
            role="alert"
            className="mx-auto max-w-xl rounded-4xl border border-border bg-surface p-8 text-center shadow-card"
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
              <BookOpen size={29} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-text-primary">
              {getLocalizedText(
                sectionContent?.errorTitle,
                language
              )}
            </h2>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {getLocalizedText(
                sectionContent?.errorDescription,
                language
              )}
            </p>

            <button
              type="button"
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
                setRetryCount((previous) => previous + 1)
              }}
              className="btn-primary mt-6 min-h-12 gap-2"
            >
              <RefreshCw size={17} />
              <span>{retryLabel}</span>
            </button>

          </div>

        </div>
      </section>
    )
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (testimonials.length === 0) {
    return (
      <section
        dir={direction}
        className="section-padding bg-background"
      >
        <div className="container-custom">

          <div className="testimonials-aurora flex min-h-80 flex-col items-center justify-center rounded-4xl px-6 py-12 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-white/55 text-brand-blue shadow-card backdrop-blur-xl">
              <Quote size={29} />
            </div>

            <h2 className="mt-6 text-xl font-extrabold text-text-primary">
              {getLocalizedText(
                sectionContent?.emptyTitle,
                language
              )}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
              {getLocalizedText(
                sectionContent?.emptyDescription,
                language
              )}
            </p>

          </div>

        </div>
      </section>
    )
  }

  // ==========================================
  // ACTIVE TESTIMONIAL
  // ==========================================

  const safeIndex = activeIndex % testimonials.length

  const activeTestimonial = testimonials[safeIndex]

  const supportingTestimonials = testimonials
    .map((testimonial, index) => ({
      testimonial,
      index,
    }))
    .filter(({ index }) => index !== safeIndex)
    .slice(0, 2)

    // ==========================================
    // VISUAL IMAGES
    // ==========================================

    const visualImages = (
    Array.isArray(sectionContent?.visualImages)
        ? sectionContent.visualImages
        : []
    )
    .map((image) => ({
        ...image,
        src: learningVisualAssets[image.assetId],
    }))
    .filter((image) => image.id && image.src)
    .slice(0, 2)

  // ==========================================
  // CAROUSEL NAVIGATION
  // ==========================================

  const goToPrevious = () => {
    setActiveIndex(
      (previous) =>
        (previous - 1 + testimonials.length) %
        testimonials.length
    )
  }

  const goToNext = () => {
    setActiveIndex(
      (previous) =>
        (previous + 1) % testimonials.length
    )
  }

  const previousLabel =
    getLocalizedText(
      sectionContent?.previousLabel,
      language
    )

  const nextLabel =
    getLocalizedText(
      sectionContent?.nextLabel,
      language
    )

  const PreviousIcon =
    direction === "rtl" ? ChevronRight : ChevronLeft

  const NextIcon =
    direction === "rtl" ? ChevronLeft : ChevronRight

  // ==========================================
  // SECTION DESIGN
  // ==========================================

  return (
    <section
      id="testimonials"
      dir={direction}
      className="section-padding relative isolate overflow-hidden bg-background"
    >

      <div className="container-custom">

        {/* AURORA EXPERIENCE */}

        <div className="testimonials-aurora relative isolate overflow-hidden rounded-4xl px-4 py-9 sm:rounded-[2.5rem] sm:px-7 sm:py-12 lg:px-10 lg:py-14 xl:px-12">

          {/* BACKGROUND GLOW */}

          <div
            aria-hidden="true"
            className="testimonials-aurora__orb testimonials-aurora__orb--green"
          />

          <div
            aria-hidden="true"
            className="testimonials-aurora__orb testimonials-aurora__orb--blue"
          />

          <div
            aria-hidden="true"
            className="testimonials-aurora__orb testimonials-aurora__orb--orange"
          />

          {/* SECTION HEADER */}

          <Reveal className="relative z-10 mb-9 sm:mb-12">

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

              <div className="max-w-2xl">

                {/* EYEBROW */}

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/55 px-4 py-2.5 shadow-sm backdrop-blur-xl">

                  <Sparkles
                    size={15}
                    className="text-brand-orange"
                  />

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-blue sm:text-xs">
                    {getLocalizedText(
                      sectionContent?.eyebrow,
                      language
                    )}
                  </span>

                </div>

                {/* TITLE */}

                <h2 className="heading-2 max-w-2xl text-text-primary sm:text-4xl">
                  {getLocalizedText(
                    sectionContent?.title,
                    language
                  )}

                  <span
                    aria-hidden="true"
                    className="mt-3 block h-1.5 w-20 rounded-full bg-brand-orange"
                  />

                </h2>

                {/* DESCRIPTION */}

                <p className="body-base mt-5 max-w-xl leading-8 text-text-secondary">
                  {getLocalizedText(
                    sectionContent?.description,
                    language
                  )}
                </p>

              </div>

              {/* STORY COUNTER */}

              <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/75 bg-white/45 px-4 py-3 shadow-sm backdrop-blur-xl lg:self-auto">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Quote size={19} />
                </div>

                <div>
                  <p className="text-lg font-extrabold leading-none tabular-nums text-text-primary">
                    {String(safeIndex + 1).padStart(2, "0")}
                    <span className="mx-1 text-text-muted">/</span>
                    <span className="text-text-secondary">
                      {String(testimonials.length).padStart(2, "0")}
                    </span>
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-text-secondary">
                    {getLocalizedText(
                      sectionContent?.featuredLabel,
                      language
                    )}
                  </p>
                </div>

              </div>

            </div>

          </Reveal>

          {/* BENTO GRID */}

          <div className="relative z-10 grid items-stretch gap-4 xl:grid-cols-12 xl:gap-5">

            {/* FEATURED STORY */}

            <div className="min-w-0 xl:col-span-7">

              <FeaturedTestimonial
                testimonial={activeTestimonial}
                language={language}
                sectionContent={sectionContent}
                courseName={getCourseName(
                  activeTestimonial.courseId
                )}
              />

            </div>

            {/* SUPPORTING CONTENT */}

            <div className="grid min-w-0 content-start gap-4 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-1 xl:gap-5">

              {/* PHOTO COLLAGE */}

              {visualImages.length > 0 && (
                <div className="sm:col-span-2 xl:col-span-1">
                  <LearningPhotoCollage
                    images={visualImages}
                    language={language}
                  />
                </div>
              )}

              {/* SECONDARY TESTIMONIALS */}

              {supportingTestimonials.map(
                ({ testimonial, index }, cardIndex) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    language={language}
                    courseName={getCourseName(
                      testimonial.courseId
                    )}
                    index={cardIndex}
                    onSelect={() => setActiveIndex(index)}
                  />
                )
              )}

            </div>

          </div>

          {/* CAROUSEL CONTROLS */}

          <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/60 pt-6 sm:mt-9 sm:pt-7">

            {/* PROGRESS INDICATORS */}

            <div className="flex items-center gap-2">

              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${index + 1} / ${testimonials.length}`}
                  aria-pressed={safeIndex === index}
                  className={`h-2.5 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-blue ${
                    safeIndex === index
                      ? "w-9 bg-brand-blue"
                      : "w-2.5 bg-brand-blue/20 hover:bg-brand-blue/50"
                  }`}
                />
              ))}

            </div>

            {/* NAVIGATION */}

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={goToPrevious}
                disabled={testimonials.length <= 1}
                aria-label={previousLabel}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/65 text-text-primary shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand-blue hover:shadow-card disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <PreviousIcon size={19} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={testimonials.length <= 1}
                aria-label={nextLabel}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue text-white shadow-md shadow-brand-blue/20 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-blue/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <NextIcon size={19} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default TestimonialsSection