
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  ArrowUpLeft,
  BookOpen,
  GraduationCap,
  Lightbulb,
  MonitorPlay,
  Sparkles,
} from "lucide-react"

import heroStudentImage from "../../../assets/image/home/hero-student.png"
import useLanguageStore from "../../../store/languageStore"

// ============================================
// HERO SECTION
// ============================================

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState(null)
  const [settings, setSettings] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  // ==========================================
  // FETCH HERO DATA
  // ==========================================

  useEffect(() => {
    const controller = new AbortController()

    const fetchHeroData = async () => {
      setIsLoading(true)
      setHasError(false)

      try {
        const [homepageResponse, settingsResponse] = await Promise.all([
          fetch("http://localhost:5000/homepageContent", {
            signal: controller.signal,
          }),
          fetch("http://localhost:5000/siteSettings", {
            signal: controller.signal,
          }),
        ])

        if (!homepageResponse.ok || !settingsResponse.ok) {
          throw new Error("Failed to fetch homepage data")
        }

        const [homepageData, settingsData] = await Promise.all([
          homepageResponse.json(),
          settingsResponse.json(),
        ])

        if (!homepageData?.hero || !settingsData?.registrationButton) {
          throw new Error("Required hero information is missing")
        }

        setHeroContent(homepageData.hero)
        setSettings(settingsData)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Hero Section Error:", error)
          setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchHeroData()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  // ==========================================
  // LOCALIZATION
  // ==========================================

  const getText = (value) => {
    if (typeof value === "string") return value

    return value?.[language] || value?.en || ""
  }

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return (
      <section
        dir={direction}
        className="bg-background"
        aria-busy="true"
      >
        <div className="container-custom">
          <div className="grid min-h-150 animate-pulse items-center gap-12 py-16 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="h-7 w-44 rounded-full bg-surface-secondary" />
              <div className="h-14 w-full max-w-xl rounded-lg bg-surface-secondary" />
              <div className="h-14 w-4/5 rounded-lg bg-surface-secondary" />

              <div className="space-y-3 pt-3">
                <div className="h-4 w-full max-w-lg rounded bg-surface-secondary" />
                <div className="h-4 w-4/5 rounded bg-surface-secondary" />
              </div>

              <div className="flex gap-3 pt-4">
                <div className="h-12 w-36 rounded-xl bg-surface-secondary" />
                <div className="h-12 w-36 rounded-xl bg-surface-secondary" />
              </div>
            </div>

            <div className="mx-auto aspect-4/5 w-full max-w-md rounded-[3rem] bg-surface-secondary" />
          </div>
        </div>
      </section>
    )
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (hasError || !heroContent || !settings) {
    return (
      <section
        dir={direction}
        className="section-padding bg-background"
      >
        <div className="container-custom">
          <div
            role="alert"
            className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center"
          >
            <p className="text-sm text-text-secondary">
              {language === "fa"
                ? "بارگذاری اطلاعات صفحه اصلی با مشکل مواجه شد."
                : "Unable to load homepage content."}
            </p>

            <button
              type="button"
              onClick={() =>
                setRetryCount((previous) => previous + 1)
              }
              className="btn-primary mt-5"
            >
              {language === "fa" ? "تلاش دوباره" : "Try Again"}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ==========================================
  // HERO DATA
  // ==========================================

  const primaryAction = heroContent.primaryAction
  const secondaryAction = heroContent.secondaryAction

  const registrationLabel =
    getText(settings.registrationButton) ||
    getText(secondaryAction?.label)

  const coursesLabel = getText(primaryAction?.label)

  const heroImage = heroContent.image || heroStudentImage

  const heroImageAlt =
    getText(heroContent.imageAlt) || getText(heroContent.title)

  // ==========================================
  // HERO DESIGN
  // ==========================================

  return (
    <section
      dir={direction}
      className="relative isolate overflow-hidden bg-background"
    >
      {/* BACKGROUND DESIGN */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-brand-blue/2.5 via-background to-brand-green/[0.035]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 inset-s-1/3 -z-10 h-105 w-105 rounded-full bg-brand-blue/[0.035] blur-3xl"
      />

      {/* HERO CONTAINER */}

      <div className="container-custom">
        <div className="grid min-h-145 items-center gap-12 py-12 sm:py-16 lg:min-h-162.5 lg:grid-cols-2 lg:gap-10 lg:py-20 xl:min-h-175 xl:gap-16">

          {/* LEFT SIDE - CONTENT */}

          <div className="relative z-20 order-1 flex flex-col items-start lg:py-8">

            {/* Eyebrow */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/5.5 px-4 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-blue sm:text-xs">
                {getText(heroContent.eyebrow)}
              </span>

              <Lightbulb
                size={14}
                className="text-brand-orange"
              />
            </div>

            {/* Main Heading */}

            <h1 className="heading-1 max-w-162.5 text-text-primary sm:leading-[1.16] lg:text-[clamp(2.8rem,4.2vw,4.5rem)]">
              {getText(heroContent.title)}

              <span
                aria-hidden="true"
                className="mt-3 block h-1.5 w-20 rounded-full bg-brand-orange sm:w-24"
              />
            </h1>

            {/* Description */}

            <p className="body-large mt-7 max-w-132.5 leading-8 text-text-secondary sm:leading-9">
              {getText(heroContent.description)}
            </p>

            {/* CTA BUTTONS */}

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">

              {/* Registration */}

              {secondaryAction?.path && (
                <Link
                  to={secondaryAction.path}
                  className="group btn-primary inline-flex min-h-13.5 items-center justify-center gap-3 rounded-lg px-7 py-3.5 text-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span>{registrationLabel}</span>

                  {direction === "rtl" ? (
                    <ArrowUpLeft size={19} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                    ) : (
                    <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                    )}
                </Link>
              )}

              {/* Explore Courses */}

              {primaryAction?.path && (
                <Link
                  to={primaryAction.path}
                  className="group btn-secondary inline-flex min-h-13.5 items-center justify-center gap-3 rounded-lg px-7 py-3.5 text-sm transition-all duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <BookOpen
                    size={19}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span>{coursesLabel}</span>
                </Link>
              )}
            </div>

            {/* Supporting Visual Accent */}

            <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-brand-blue text-white">
                  <BookOpen size={15} />
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-brand-green text-white">
                  <GraduationCap size={16} />
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-brand-orange text-white">
                  <Lightbulb size={15} />
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-text-primary">
                  {getText(heroContent.eyebrow)}
                </span>

                <span className="text-[11px] text-text-secondary">
                  {language === "fa"
                    ? "مسیر یادگیری، رشد و موفقیت"
                    : "A journey of learning, growth and success"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - HERO IMAGE */}

          <div className="relative order-2 mx-auto w-full max-w-135 lg:max-w-none">
            <div className="relative mx-auto aspect-4/4.5 w-full max-w-125 sm:aspect-[4/4.4] lg:aspect-[4/4.6]">

              {/* Main Brand Shape */}

              <div
                aria-hidden="true"
                className="absolute inset-x-[7%] bottom-[2%] top-[5%] rounded-[48%_48%_12%_12%] bg-brand-blue"
              />

              {/* Green Accent Shape */}

              <div
                aria-hidden="true"
                className="absolute bottom-[-2%] inset-s-[2%] h-32 w-32 rounded-full bg-brand-green sm:h-40 sm:w-40"
              />

              {/* Orange Accent */}

              <div
                aria-hidden="true"
                className="absolute inset-e-[7%] top-[6%] z-10 h-5 w-5 rounded-full bg-brand-orange shadow-lg sm:h-7 sm:w-7"
              />

              {/* Decorative Background Ring */}

              <div
                aria-hidden="true"
                className="absolute inset-x-[2%] bottom-[7%] top-[1%] rounded-[48%_48%_12%_12%] border border-brand-blue/15"
              />

              {/* Main Student Image */}

              <div className="absolute inset-x-[9%] bottom-[0%] top-[2%] overflow-hidden rounded-[48%_48%_10%_10%] border-[6px] border-background shadow-card sm:border-[9px]">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[center_42%] transition-transform duration-700 ease-out hover:scale-[1.035]"
                />

                {/* Image Overlay */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-brand-blue/20 to-transparent"
                />
              </div>

              {/* Floating Card - Learning */}

              <div className="absolute -inset-s-1 top-[24%] z-20 flex h-15.5 w-15.5 items-center justify-center rounded-2xl border border-border bg-background shadow-card transition-all duration-300 hover:-translate-y-2 hover:rotate-3 sm:-inset-s-4 sm:h-19 sm:w-19">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green sm:h-14 sm:w-14">
                  <MonitorPlay size={27} strokeWidth={1.6} />
                </div>
              </div>

              {/* Floating Card - Books */}

              <div className="absolute -inset-e-1 bottom-[19%] z-20 flex h-15.5 w-15.5 items-center justify-center rounded-2xl border border-border bg-background shadow-card transition-all duration-300 hover:-translate-y-2 hover:-rotate-3 sm:-inset-e-4 sm:h-19 sm:w-19">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange sm:h-14 sm:w-14">
                  <BookOpen size={27} strokeWidth={1.6} />
                </div>
              </div>

              {/* Decorative Sparkle */}

              <div
                aria-hidden="true"
                className="absolute inset-e-[4%] top-[26%] z-20 text-brand-orange"
              >
                <Sparkles size={25} />
              </div>

              {/* Decorative Small Circles */}

              <span
                aria-hidden="true"
                className="absolute bottom-[7%] inset-s-[20%] h-3 w-3 rounded-full bg-background shadow-sm"
              />

              <span
                aria-hidden="true"
                className="absolute top-[15%] inset-s-[23%] h-2.5 w-2.5 rounded-full bg-brand-orange"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
