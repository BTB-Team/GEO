
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  Code2,
  GraduationCap,
  Languages,
  Sparkles,
  Target,
} from "lucide-react"

import useLanguageStore from "../../../store/languageStore"

// ============================================
// CATEGORY VISUAL IDENTITY
// ============================================

const categoryVisuals = {
  "academic-support": {
    icon: BookOpen,
    iconColor: "text-brand-blue",
    iconBackground: "bg-brand-blue/10",
    artwork:
      "bg-gradient-to-br from-brand-blue/10 via-surface to-brand-blue/5",
    decoration: "bg-brand-blue/15",
  },
  "test-preparation": {
    icon: Target,
    iconColor: "text-brand-green",
    iconBackground: "bg-brand-green/10",
    artwork:
      "bg-gradient-to-br from-brand-green/10 via-surface to-brand-green/5",
    decoration: "bg-brand-green/15",
  },
  languages: {
    icon: Languages,
    iconColor: "text-brand-orange",
    iconBackground: "bg-brand-orange/10",
    artwork:
      "bg-gradient-to-br from-brand-orange/10 via-surface to-brand-orange/5",
    decoration: "bg-brand-orange/15",
  },
  technology: {
    icon: Code2,
    iconColor: "text-brand-blue",
    iconBackground: "bg-brand-blue/10",
    artwork:
      "bg-gradient-to-br from-brand-blue/10 via-surface to-brand-green/10",
    decoration: "bg-brand-blue/15",
  },
  "scholarship-guidance": {
    icon: Award,
    iconColor: "text-brand-green",
    iconBackground: "bg-brand-green/10",
    artwork:
      "bg-gradient-to-br from-brand-green/10 via-surface to-brand-orange/10",
    decoration: "bg-brand-green/15",
  },
}

const defaultVisual = {
  icon: GraduationCap,
  iconColor: "text-brand-blue",
  iconBackground: "bg-brand-blue/10",
  artwork: "bg-gradient-to-br from-brand-blue/10 via-surface to-surface",
  decoration: "bg-brand-blue/15",
}

// ============================================
// SECTION COPY
// ============================================

const sectionCopy = {
  en: {
    eyebrow: "LEARN WITHOUT LIMITS",
    title: "Discover what you can become.",
    description:
      "Explore learning paths that build knowledge, unlock potential, and prepare you for the opportunities ahead.",
    viewAll: "Explore all programs",
    explore: "Explore program",
    course: "course",
    courses: "courses",
    pathway: "LEARNING PATH",
    featured: "FEATURED PROGRAM",
    loading: "Loading educational programs...",
    error: "We couldn't load the educational programs.",
    retry: "Try again",
    empty: "No educational programs are available at the moment.",
    available: "AVAILABLE LEARNING PATHS",
  },
  fa: {
    eyebrow: "یادگیری بدون محدودیت",
    title: "استعدادت را کشف کن، آینده‌ات را بساز.",
    description:
      "مسیرهای آموزشی متنوع را کشف کن؛ دانش خود را گسترش بده، توانایی‌هایت را پرورش بده و برای فرصت‌های آینده آماده شو.",
    viewAll: "مشاهده همه برنامه‌ها",
    explore: "مشاهده برنامه",
    course: "دوره",
    courses: "دوره",
    pathway: "مسیر آموزشی",
    featured: "برنامه ویژه",
    loading: "در حال بارگذاری برنامه‌های آموزشی...",
    error: "بارگذاری برنامه‌های آموزشی با مشکل مواجه شد.",
    retry: "تلاش دوباره",
    empty: "در حال حاضر برنامه آموزشی برای نمایش موجود نیست.",
    available: "مسیرهای آموزشی موجود",
  },
}

// ============================================
// LOCALIZED TEXT
// ============================================

const getText = (value, language) => {
  if (typeof value === "string") return value

  return value?.[language] || value?.en || ""
}

// ============================================
// LOADING SKELETON
// ============================================

const ProgramsSkeleton = () => {
  return (
    <section className="section-padding bg-surface/50" aria-busy="true">
      <div className="container-custom">
        <div className="mb-12 space-y-4">
          <div className="h-5 w-40 animate-pulse rounded-full bg-surface-secondary" />
          <div className="h-10 w-full max-w-xl animate-pulse rounded-lg bg-surface-secondary" />
          <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-surface-secondary" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`animate-pulse rounded-4xl border border-border bg-background p-5 ${
                index === 0
                  ? "min-h-125 sm:col-span-2 lg:row-span-2 lg:col-span-1"
                  : "min-h-70"
              }`}
            >
              <div className="h-36 rounded-2xl bg-surface-secondary" />
              <div className="mt-7 h-6 w-3/4 rounded bg-surface-secondary" />
              <div className="mt-4 h-4 w-full rounded bg-surface-secondary" />
              <div className="mt-2 h-4 w-4/5 rounded bg-surface-secondary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CATEGORY ARTWORK
// ============================================

const ProgramArtwork = ({
  category,
  visual,
  index,
  coverImage,
  isFeatured,
  copy,
  language,
}) => {
  const CategoryIcon = visual.icon

  return (
    <div
      className={`relative isolate overflow-hidden rounded-3xl ${
        isFeatured ? "h-55 sm:h-62.5" : "h-36.25"
      }`}
    >
      {/* DATABASE IMAGE */}

      {coverImage ? (
        <>
          <img
            src={coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div
            aria-hidden="true"
            className={`absolute inset-0 ${
              isFeatured
                ? "bg-linear-to-br from-brand-blue/65 via-brand-blue/20 to-transparent"
                : "bg-linear-to-t from-text-primary/35 to-transparent"
            }`}
          />
        </>
      ) : (
        <>
          {/* ARTWORK BACKGROUND */}

          <div
            aria-hidden="true"
            className={`absolute inset-0 ${visual.artwork}`}
          />

          {/* LARGE DECORATIVE CIRCLES */}

          <div
            aria-hidden="true"
            className={`absolute -inset-e-12 -top-16 h-48 w-48 rounded-full ${visual.decoration} blur-2xl transition-transform duration-700 group-hover:scale-125`}
          />

          <div
            aria-hidden="true"
            className={`absolute -bottom-24 -inset-s-12 h-48 w-48 rounded-full ${visual.decoration} blur-2xl`}
          />

          <div
            aria-hidden="true"
            className={`absolute ${
              isFeatured
                ? "inset-e-[14%] top-1/2 h-48 w-48 -translate-y-1/2"
                : "inset-e-[12%] top-1/2 h-36 w-36 -translate-y-1/2"
            } rounded-full border border-brand-blue/10 transition-transform duration-700 group-hover:rotate-12`}
          />

          {/* MAIN ICON */}

          <div
            className={`absolute ${
              isFeatured
                ? "inset-e-[14%] top-1/2 h-32 w-32 -translate-y-1/2 sm:h-36 sm:w-36"
                : "inset-e-[12%] top-1/2 h-24 w-24 -translate-y-1/2"
            } flex items-center justify-center rounded-4xl border border-background/70 bg-background/70 shadow-card backdrop-blur-sm transition-all duration-500 group-hover:translate-y-[-55%] group-hover:rotate-3`}
          >
            <CategoryIcon
              size={isFeatured ? 66 : 52}
              strokeWidth={1.35}
              className={visual.iconColor}
            />
          </div>

          {/* DECORATIVE DOTS */}

          <div
            aria-hidden="true"
            className="absolute inset-s-[10%] top-[18%] grid grid-cols-4 gap-2 opacity-40"
          >
            {Array.from({ length: 12 }).map((_, dotIndex) => (
              <span
                key={dotIndex}
                className="h-1.5 w-1.5 rounded-full bg-brand-blue"
              />
            ))}
          </div>

          <span
            aria-hidden="true"
            className="absolute bottom-[15%] inset-s-[13%] h-3 w-3 rounded-full bg-brand-orange"
          />

          <span
            aria-hidden="true"
            className="absolute inset-e-[8%] top-[13%] h-2 w-2 rounded-full bg-brand-green"
          />
        </>
      )}

      {/* TOP LABEL */}

      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] backdrop-blur-md sm:text-[10px] ${
            isFeatured
              ? "border border-white/20 bg-white/15 text-white"
              : "border border-border/60 bg-background/80 text-text-secondary"
          }`}
        >
          {isFeatured ? copy.featured : copy.pathway}
        </span>

        <span
          className={`text-3xl font-black tracking-tight ${
            isFeatured ? "text-white/35" : "text-text-primary/20"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* FEATURED LABEL */}

      {isFeatured && (
        <div className="absolute bottom-4 inset-s-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-semibold text-white backdrop-blur-md">
          <Sparkles size={13} />
          <span>{getText(category.name, language)}</span>
        </div>
      )}
    </div>
  )
}

// ============================================
// PROGRAM CARD
// ============================================

const ProgramCard = ({
  category,
  courses,
  index,
  language,
  direction,
  copy,
}) => {
  const isFeatured = index === 0

  const visual =
    categoryVisuals[category.slug] || defaultVisual

  const relatedCourses = courses.filter(
    (course) => course.categoryId === category.id
  )

  const coverImage = relatedCourses.find(
    (course) => course.coverImage
  )?.coverImage

  const categoryName = getText(category.name, language)

  const categoryDescription = getText(
    category.description,
    language
  )

  return (
    <article
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-4xl border p-3 transition-all duration-500 hover:-translate-y-1.5 ${
        isFeatured
          ? "border-brand-blue bg-brand-blue text-white shadow-xl shadow-brand-blue/15 sm:col-span-2 lg:row-span-2 lg:col-span-1"
          : "border-border bg-background text-text-primary shadow-card hover:border-brand-blue/25 hover:shadow-xl"
      }`}
    >
      {/* ARTWORK */}

      <ProgramArtwork
        category={category}
        visual={visual}
        index={index}
        coverImage={coverImage}
        isFeatured={isFeatured}
        copy={copy}
        language={language}
      />

      {/* CARD BODY */}

      <div
        className={`flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-4 ${
          isFeatured ? "sm:pt-8" : "sm:pt-6"
        }`}
      >
        {/* CATEGORY TITLE */}

        <h3
          className={`text-xl font-bold leading-snug sm:text-2xl ${
            isFeatured ? "text-white sm:text-3xl" : "text-text-primary"
          }`}
        >
          {categoryName}
        </h3>

        {/* DESCRIPTION */}

        <p
          className={`mt-3 text-sm leading-7 ${
            isFeatured ? "text-white/75" : "text-text-secondary"
          }`}
        >
          {categoryDescription}
        </p>

        {/* RELATED COURSES */}

        {relatedCourses.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {relatedCourses
              .slice(0, isFeatured ? 4 : 2)
              .map((course) => (
                <span
                  key={course.id}
                  className={`max-w-full truncate rounded-lg px-3 py-2 text-[11px] font-medium ${
                    isFeatured
                      ? "border border-white/15 bg-white/10 text-white/90"
                      : "border border-border bg-surface text-text-secondary"
                  }`}
                >
                  {getText(course.title, language)}
                </span>
              ))}

            {relatedCourses.length > (isFeatured ? 4 : 2) && (
              <span
                className={`rounded-lg px-3 py-2 text-[11px] font-bold ${
                  isFeatured
                    ? "bg-white/10 text-white"
                    : "bg-brand-blue/5 text-brand-blue"
                }`}
              >
                +{relatedCourses.length - (isFeatured ? 4 : 2)}
              </span>
            )}
          </div>
        )}

        {/* CARD FOOTER */}

        <div
          className={`mt-auto flex items-center justify-between gap-3 border-t pt-5 ${
            isFeatured ? "mt-7 border-white/15" : "mt-7 border-border"
          }`}
        >
          <span
            className={`text-xs font-semibold ${
              isFeatured ? "text-white/70" : "text-text-secondary"
            }`}
          >
            {relatedCourses.length}{" "}
            {relatedCourses.length === 1
              ? copy.course
              : copy.courses}
          </span>

          <Link
            to={`/courses?category=${encodeURIComponent(category.slug)}`}
            aria-label={`${copy.explore}: ${categoryName}`}
            className={`group/link inline-flex items-center gap-2 text-xs font-bold transition-all duration-300 hover:gap-3 ${
              isFeatured ? "text-white" : "text-brand-blue"
            }`}
          >
            <span>{copy.explore}</span>

            {direction === "rtl" ? (
              <ArrowLeft size={16} />
            ) : (
              <ArrowUpRight size={16} />
            )}
          </Link>
        </div>
      </div>
    </article>
  )
}

// ============================================
// PROGRAMS SECTION
// ============================================

const ProgramsSection = () => {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  const copy = sectionCopy[language] || sectionCopy.en

  // ==========================================
  // FETCH PROGRAM DATA
  // ==========================================

  useEffect(() => {
    const controller = new AbortController()

    const fetchPrograms = async () => {
      setIsLoading(true)
      setHasError(false)

      try {
        const [categoriesResponse, coursesResponse] =
          await Promise.all([
            fetch("http://localhost:5000/courseCategories", {
              signal: controller.signal,
            }),
            fetch("http://localhost:5000/courses", {
              signal: controller.signal,
            }),
          ])

        if (!categoriesResponse.ok || !coursesResponse.ok) {
          throw new Error("Failed to fetch educational programs")
        }

        const [categoriesData, coursesData] = await Promise.all([
          categoriesResponse.json(),
          coursesResponse.json(),
        ])

        if (
          !Array.isArray(categoriesData) ||
          !Array.isArray(coursesData)
        ) {
          throw new Error("Invalid educational programs data")
        }

        const activeCategories = categoriesData
          .filter((category) => category.status === "active")
          .sort(
            (first, second) =>
              (first.sortOrder ?? 0) - (second.sortOrder ?? 0)
          )

        const activeCourses = coursesData.filter(
          (course) => course.status === "active"
        )

        setCategories(activeCategories)
        setCourses(activeCourses)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Programs Section Error:", error)
          setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchPrograms()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return <ProgramsSkeleton />
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (hasError) {
    return (
      <section
        dir={direction}
        className="section-padding bg-surface/50"
      >
        <div className="container-custom">
          <div
            role="alert"
            className="mx-auto max-w-xl rounded-3xl border border-border bg-background p-8 text-center shadow-card"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <GraduationCap size={28} />
            </div>

            <p className="mt-5 text-sm leading-7 text-text-secondary">
              {copy.error}
            </p>

            <button
              type="button"
              onClick={() =>
                setRetryCount((previous) => previous + 1)
              }
              className="btn-primary mt-5"
            >
              {copy.retry}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (categories.length === 0) {
    return (
      <section
        dir={direction}
        className="section-padding bg-surface/50"
      >
        <div className="container-custom">
          <p className="rounded-3xl border border-border bg-background p-8 text-center text-sm text-text-secondary">
            {copy.empty}
          </p>
        </div>
      </section>
    )
  }

  // ==========================================
  // SECTION DESIGN
  // ==========================================

  return (
    <section
      id="programs"
      dir={direction}
      className="section-padding relative isolate overflow-hidden bg-surface/50"
    >
      {/* DECORATIVE BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-40 top-20 -z-10 h-80 w-80 rounded-full bg-brand-blue/[0.035] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand-green/4 blur-3xl"
      />

      <div className="container-custom">

        {/* SECTION HEADER */}

        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/5.5 px-4 py-2">
              <Sparkles
                size={15}
                className="text-brand-orange"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-blue sm:text-xs">
                {copy.eyebrow}
              </span>
            </div>

            <h2 className="heading-2 max-w-2xl text-text-primary">
              {copy.title}
            </h2>

            <p className="body-base mt-4 max-w-2xl leading-8 text-text-secondary">
              {copy.description}
            </p>

          </div>

          {/* VIEW ALL */}

          <Link
            to="/courses"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-xl border border-brand-blue/20 bg-background px-5 py-3 text-sm font-bold text-brand-blue shadow-sm transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue hover:text-white md:self-auto"
          >
            <span>{copy.viewAll}</span>

            {direction === "rtl" ? (
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            ) : (
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            )}
          </Link>

        </div>

        {/* ASYMMETRIC BENTO GRID */}

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => (
            <ProgramCard
              key={category.id}
              category={category}
              courses={courses}
              index={index}
              language={language}
              direction={direction}
              copy={copy}
            />
          ))}

        </div>

        {/* AVAILABLE PROGRAMS FOOTER */}

        <div className="mt-8 flex flex-nowrap items-center justify-center gap-2 text-center">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />

          <p className="whitespace-nowrap text-xs font-semibold tracking-wide text-text-muted">
            {copy.available}
          </p>

          <span className="shrink-0 text-xs font-bold text-brand-blue">
            {categories.length}
          </span>
        </div>

      </div>
    </section>
  )
}

export default ProgramsSection
