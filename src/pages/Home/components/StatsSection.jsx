
import { useEffect, useRef, useState } from "react"
import {
  Award,
  BookOpen,
  GraduationCap,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react"

import useLanguageStore from "../../../store/languageStore"

// ============================================
// API CONFIGURATION
// ============================================

const API_BASE_URL = "http://localhost:5000"

// ============================================
// STAT VISUAL IDENTITY
// ============================================

const statVisuals = {
  students: {
    icon: GraduationCap,
    color: "text-brand-blue",
    background:
      "bg-linear-to-br from-brand-blue/12 via-white to-brand-blue/5",
    accent: "bg-brand-blue",
    glow: "bg-brand-blue/15",
  },

  courses: {
    icon: BookOpen,
    color: "text-brand-orange",
    background:
      "bg-linear-to-br from-brand-orange/15 via-white to-brand-orange/5",
    accent: "bg-brand-orange",
    glow: "bg-brand-orange/15",
  },

  teachers: {
    icon: Users,
    color: "text-brand-green",
    background:
      "bg-linear-to-br from-brand-green/12 via-white to-brand-green/5",
    accent: "bg-brand-green",
    glow: "bg-brand-green/15",
  },

  graduates: {
    icon: Award,
    color: "text-brand-blue",
    background:
      "bg-linear-to-br from-brand-blue/8 via-brand-green/8 to-white",
    accent: "bg-brand-green",
    glow: "bg-brand-green/15",
  },
}

const defaultVisual = {
  icon: Sparkles,
  color: "text-brand-blue",
  background: "bg-surface",
  accent: "bg-brand-blue",
  glow: "bg-brand-blue/10",
}

// ============================================
// LOCALIZED TEXT
// ============================================

const getLocalizedText = (value, language) => {
  if (typeof value === "string") return value

  return value?.[language] || value?.en || ""
}

// ============================================
// SCROLL REVEAL
// ============================================



const useReveal = (threshold = 0.2, enabled = true) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const element = elementRef.current

    if (!element) return

    const reducedMotion =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches ?? false

    if (reducedMotion || !("IntersectionObserver" in window)) {
      const frameId = requestAnimationFrame(() => {
        setIsVisible(true)
      })

      return () => cancelAnimationFrame(frameId)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, enabled])

  return [elementRef, isVisible]
}



// ============================================
// ANIMATED COUNTER
// ============================================


const AnimatedStatValue = ({ value, language, isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const reducedMotion =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches ?? false

    let animationFrame

    if (reducedMotion || value <= 0) {
      animationFrame = requestAnimationFrame(() => {
        setDisplayValue(value)
      })

      return () => cancelAnimationFrame(animationFrame)
    }

    const startTime = performance.now()
    const duration = 1600

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      )

      const eased = 1 - Math.pow(1 - progress, 4)

      setDisplayValue(Math.round(value * eased))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, isVisible])

  const locale = language === "fa" ? "fa-AF" : "en-US"

  return displayValue.toLocaleString(locale)
}


// ============================================
// CUSTOM EDUCATIONAL ILLUSTRATIONS
// ============================================


const StatIllustration = ({ type }) => {
  const prefix = `stats-${type}`

  return (
    <div
      aria-hidden="true"
      className={`stats-illustration stats-illustration--${type} pointer-events-none absolute -bottom-3 -inset-e-4 z-0 h-[92%] w-[56%] max-w-52 select-none`}
    >
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`${prefix}-skin`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFE0C8" />
            <stop offset="1" stopColor="#EBA982" />
          </linearGradient>

          <linearGradient id={`${prefix}-hair`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#806052" />
            <stop offset="1" stopColor="#382B30" />
          </linearGradient>

          <linearGradient id={`${prefix}-blue`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#49A3EC" />
            <stop offset="1" stopColor="var(--color-brand-blue)" />
          </linearGradient>

          <linearGradient id={`${prefix}-green`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#57BD7A" />
            <stop offset="1" stopColor="var(--color-brand-green)" />
          </linearGradient>

          <linearGradient id={`${prefix}-orange`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFB14E" />
            <stop offset="1" stopColor="var(--color-brand-orange)" />
          </linearGradient>

          <linearGradient id={`${prefix}-pages`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#DCE8F3" />
          </linearGradient>

          <filter
            id={`${prefix}-shadow`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dy="7" />
            <feComponentTransfer>
              <feFuncA type="linear" slope=".18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* SOFT ORBIT */}

        <circle
          cx="132"
          cy="128"
          r="84"
          fill="white"
          opacity=".42"
        />

        <circle
          cx="132"
          cy="128"
          r="73"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          opacity=".7"
          className="stats-illustration__orbit"
        />

        <g className="stats-illustration__float">

          {/* STUDENT */}

          {type === "students" && (
            <g filter={`url(#${prefix}-shadow)`}>

              {/* BODY */}

              <path
                d="M54 237C57 176 77 151 118 150C163 150 186 180 191 237Z"
                fill={`url(#${prefix}-blue)`}
              />

              <path
                d="M79 171L64 229"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeLinecap="round"
                opacity=".3"
              />

              <path
                d="M155 170L173 229"
                stroke="#FFFFFF"
                strokeWidth="7"
                strokeLinecap="round"
                opacity=".2"
              />

              {/* NECK */}

              <path
                d="M101 129H137V160Q120 177 101 157Z"
                fill={`url(#${prefix}-skin)`}
              />

              {/* BACK HAIR */}

              <path
                d="M76 108C55 35 94 14 132 26C176 27 190 71 162 150L79 155Z"
                fill={`url(#${prefix}-hair)`}
              />

              {/* FACE */}

              <g className="stats-illustration__head">

                <ellipse
                  cx="120"
                  cy="91"
                  rx="45"
                  ry="55"
                  fill={`url(#${prefix}-skin)`}
                />

                <ellipse
                  cx="77"
                  cy="98"
                  rx="8"
                  ry="12"
                  fill="#F2B998"
                />

                <ellipse
                  cx="163"
                  cy="98"
                  rx="8"
                  ry="12"
                  fill="#F2B998"
                />

                {/* HAIR FRONT */}

                <path
                  d="M76 82C76 31 111 24 140 38C161 44 168 66 165 84C153 65 135 63 124 70C103 82 92 79 76 98Z"
                  fill={`url(#${prefix}-hair)`}
                />

                <path
                  d="M84 65Q91 36 113 35"
                  stroke="#B58B75"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity=".55"
                />

                {/* EYES */}

                <ellipse cx="103" cy="97" rx="6" ry="9" fill="#FFFFFF" />

                <ellipse cx="137" cy="97" rx="6" ry="9" fill="#FFFFFF" />

                <ellipse cx="104" cy="98" rx="3.5" ry="6" fill="#29384E" />

                <ellipse cx="138" cy="98" rx="3.5" ry="6" fill="#29384E" />

                <circle cx="105" cy="95" r="2" fill="white" />

                <circle cx="139" cy="95" r="2" fill="white" />

                {/* SMILE */}

                <path
                  d="M109 120Q120 132 133 119"
                  stroke="#B96B61"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <ellipse cx="91" cy="115" rx="8" ry="4" fill="#E99183" opacity=".3" />

                <ellipse cx="148" cy="115" rx="8" ry="4" fill="#E99183" opacity=".3" />

              </g>

              {/* BOOK */}

              <g className="stats-illustration__prop">

                <path
                  d="M83 159L151 153L163 216L93 225Z"
                  fill={`url(#${prefix}-pages)`}
                />

                <path
                  d="M83 159L151 153L155 160L90 168Z"
                  fill="#A8C6DF"
                />

                <path
                  d="M90 168L155 160L164 216L96 226Z"
                  fill={`url(#${prefix}-blue)`}
                />

                <path
                  d="M120 164L128 220"
                  stroke="white"
                  strokeWidth="2"
                  opacity=".8"
                />

                <path
                  d="M101 184L113 182"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

              </g>

            </g>
          )}

          {/* COURSES */}

          {type === "courses" && (
            <g filter={`url(#${prefix}-shadow)`}>

              {/* BOTTOM BOOK */}

              <g className="stats-illustration__prop">

                <rect
                  x="39"
                  y="162"
                  width="153"
                  height="35"
                  rx="8"
                  fill={`url(#${prefix}-orange)`}
                />

                <path
                  d="M47 167H184"
                  stroke="#FFE0B8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M49 194H182"
                  stroke="#B86614"
                  strokeWidth="2"
                  opacity=".25"
                />

              </g>

              {/* MIDDLE BOOK */}

              <g className="stats-illustration__float">

                <rect
                  x="52"
                  y="122"
                  width="133"
                  height="35"
                  rx="8"
                  fill={`url(#${prefix}-green)`}
                />

                <path
                  d="M58 127H179"
                  stroke="#D7F6DF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M63 154H178"
                  stroke="#145B31"
                  strokeWidth="2"
                  opacity=".2"
                />

              </g>

              {/* TOP BOOK */}

              <g className="stats-illustration__prop">

                <rect
                  x="28"
                  y="84"
                  width="150"
                  height="34"
                  rx="8"
                  fill={`url(#${prefix}-blue)`}
                />

                <path
                  d="M36 90H171"
                  stroke="#DDEEFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M40 115H171"
                  stroke="#154E8A"
                  strokeWidth="2"
                  opacity=".25"
                />

              </g>

              {/* GRADUATION CAP */}

              <g className="stats-illustration__cap">

                <path
                  d="M74 50L130 29L194 51L130 76Z"
                  fill="#253A5E"
                />

                <path
                  d="M92 59V82Q130 108 168 82V59L130 78Z"
                  fill="#354F79"
                />

                <path
                  d="M192 51V92"
                  stroke="var(--color-brand-orange)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle
                  cx="192"
                  cy="97"
                  r="5"
                  fill="var(--color-brand-orange)"
                />

              </g>

            </g>
          )}

          {/* TEACHER */}

          {type === "teachers" && (
            <g filter={`url(#${prefix}-shadow)`}>

              {/* BODY */}

              <path
                d="M47 236C51 171 78 151 119 151C163 151 184 182 188 236Z"
                fill="#E5F3E9"
              />

              <path
                d="M83 170L73 229"
                stroke={`url(#${prefix}-green)`}
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* HIJAB BACK */}

              <path
                d="M68 114C44 38 88 19 126 27C173 27 184 76 161 154L184 220H45L73 153Z"
                fill={`url(#${prefix}-green)`}
              />

              {/* HEAD */}

              <g className="stats-illustration__head">

                <ellipse
                  cx="120"
                  cy="91"
                  rx="39"
                  ry="49"
                  fill={`url(#${prefix}-skin)`}
                />

                {/* HIJAB FRONT */}

                <path
                  d="M76 90C70 43 101 31 131 35C155 39 169 61 155 107C149 72 137 58 112 58C95 60 85 73 76 90Z"
                  fill="#23784A"
                />

                {/* GLASSES */}

                <circle
                  cx="103"
                  cy="91"
                  r="13"
                  stroke="#33485E"
                  strokeWidth="3"
                  fill="none"
                />

                <circle
                  cx="137"
                  cy="91"
                  r="13"
                  stroke="#33485E"
                  strokeWidth="3"
                  fill="none"
                />

                <path
                  d="M116 91H124"
                  stroke="#33485E"
                  strokeWidth="3"
                />

                <circle cx="104" cy="92" r="4" fill="#29384E" />

                <circle cx="137" cy="92" r="4" fill="#29384E" />

                <path
                  d="M109 115Q121 124 133 114"
                  stroke="#B96B61"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

              </g>

              {/* TABLET */}

              <g className="stats-illustration__prop">

                <rect
                  x="105"
                  y="149"
                  width="66"
                  height="76"
                  rx="9"
                  transform="rotate(9 105 149)"
                  fill="#35485F"
                />

                <rect
                  x="111"
                  y="155"
                  width="54"
                  height="64"
                  rx="5"
                  transform="rotate(9 111 155)"
                  fill="white"
                />

                <path
                  d="M123 174L145 177"
                  stroke="var(--color-brand-green)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M120 187L141 190"
                  stroke="#B6C8D7"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M118 198L138 201"
                  stroke="#B6C8D7"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

              </g>

            </g>
          )}

          {/* GRADUATES */}

          {type === "graduates" && (
            <g filter={`url(#${prefix}-shadow)`}>

              {/* BODY */}

              <path
                d="M43 237C49 169 80 150 120 150C161 150 184 181 191 237Z"
                fill={`url(#${prefix}-blue)`}
              />

              {/* NECK */}

              <path
                d="M105 127H139V158H105Z"
                fill={`url(#${prefix}-skin)`}
              />

              {/* HAIR */}

              <path
                d="M71 106C66 42 103 25 137 34C171 40 175 83 158 139L78 150Z"
                fill={`url(#${prefix}-hair)`}
              />

              {/* FACE */}

              <g className="stats-illustration__head">

                <ellipse
                  cx="120"
                  cy="87"
                  rx="43"
                  ry="49"
                  fill={`url(#${prefix}-skin)`}
                />

                <path
                  d="M79 78C80 42 108 30 141 40C159 47 162 66 159 85C142 63 113 65 79 91Z"
                  fill="#59434C"
                />

                <path
                  d="M100 90Q105 84 111 90"
                  stroke="#35415A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M129 90Q135 84 141 90"
                  stroke="#35415A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M107 111Q121 122 135 110"
                  stroke="#B96B61"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

              </g>

              {/* MORTARBOARD */}

              <g className="stats-illustration__cap">

                <path
                  d="M54 51L120 25L188 51L120 78Z"
                  fill="#253A5E"
                />

                <path
                  d="M76 59V80Q120 107 164 80V59L120 82Z"
                  fill="#354F79"
                />

                <path
                  d="M187 52V99"
                  stroke="var(--color-brand-orange)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle
                  cx="187"
                  cy="104"
                  r="6"
                  fill="var(--color-brand-orange)"
                />

              </g>

              {/* CERTIFICATE */}

              <g className="stats-illustration__prop">

                <rect
                  x="112"
                  y="163"
                  width="69"
                  height="42"
                  rx="5"
                  transform="rotate(-11 112 163)"
                  fill="#FFFFFF"
                />

                <path
                  d="M123 175L163 167"
                  stroke="#9AB8D2"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M126 186L155 180"
                  stroke="#9AB8D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <circle
                  cx="145"
                  cy="199"
                  r="8"
                  fill="var(--color-brand-orange)"
                />

              </g>

            </g>
          )}

        </g>

        {/* SPARKLES */}

        <g className="stats-illustration__sparkle">
          <path
            d="M24 64L28 75L39 79L28 83L24 94L20 83L9 79L20 75Z"
            fill="var(--color-brand-orange)"
            opacity=".75"
          />
        </g>

        <circle
          cx="195"
          cy="123"
          r="5"
          fill="var(--color-brand-green)"
          opacity=".5"
          className="stats-illustration__sparkle"
        />

      </svg>
    </div>
  )
}


// ============================================
// STATISTIC CARD
// ============================================

const StatCard = ({ stat, index, language }) => {
  const [cardRef, isVisible] = useReveal(0.2)

  const visual = statVisuals[stat.key] || defaultVisual
  const StatIcon = visual.icon

  return (
    <article
      ref={cardRef}
      className={`group relative isolate min-h-55 overflow-hidden rounded-[1.75rem] border border-white bg-white p-5 shadow-[0_8px_35px_rgba(15,23,42,0.055)] transition-[opacity,transform,box-shadow] duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(15,23,42,0.12)] motion-reduce:transform-none motion-reduce:transition-none sm:min-h-60 sm:p-6 ${visual.background} ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-[0.97] opacity-0"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 110}ms` : "0ms",
      }}
    >

      {/* CARD DECORATION */}

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-e-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 ${visual.glow}`}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-e-0 h-28 w-28 rounded-full bg-white/50 blur-2xl"
      />

      {/* STAT ICON */}

      <div
        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-sm ${visual.color}`}
      >
        <StatIcon size={21} strokeWidth={1.8} />
      </div>

      {/* STAT CONTENT */}

      <div className="relative z-10 mt-5 max-w-[68%]">

        <div className="flex flex-wrap items-baseline gap-x-1">

          <span className="text-[2.8rem] font-extrabold leading-none tracking-tight text-text-primary sm:text-5xl">
            <AnimatedStatValue
              value={stat.value}
              language={language}
              isVisible={isVisible}
            />
          </span>

          {stat.suffix && (
            <span className="text-2xl font-extrabold text-brand-blue sm:text-3xl">
              {stat.suffix}
            </span>
          )}

        </div>

        <h3 className="mt-2 text-sm font-bold leading-6 text-text-primary sm:text-base">
          {getLocalizedText(stat.label, language)}
        </h3>

      </div>

      {/* CUSTOM ILLUSTRATION */}

      <StatIllustration type={stat.key} />

      {/* BOTTOM ACCENT */}

      <div
        aria-hidden="true"
        className={`absolute bottom-0 inset-s-0 h-1 w-0 rounded-full transition-all duration-700 group-hover:w-full ${visual.accent}`}
      />

      {/* CORNER DETAIL */}

      <span
        aria-hidden="true"
        className={`absolute bottom-5 inset-s-5 h-2 w-12 rounded-full opacity-70 ${visual.accent}`}
      />

    </article>
  )
}

// ============================================
// LOADING SKELETON
// ============================================

const StatsSkeleton = ({ direction }) => (
  <section
    dir={direction}
    aria-busy="true"
    className="section-padding bg-background"
  >
    <div className="container-custom">
      <div className="grid animate-pulse gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:items-center">

        <div className="space-y-5">
          <div className="h-8 w-36 rounded-full bg-surface-secondary" />
          <div className="h-12 w-full max-w-md rounded-xl bg-surface-secondary" />
          <div className="h-4 w-full max-w-sm rounded bg-surface-secondary" />
          <div className="h-4 w-4/5 max-w-sm rounded bg-surface-secondary" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-h-55 rounded-[1.75rem] border border-border bg-surface p-5"
            >
              <div className="h-10 w-10 rounded-xl bg-surface-secondary" />
              <div className="mt-8 h-12 w-32 rounded-lg bg-surface-secondary" />
              <div className="mt-3 h-4 w-24 rounded bg-surface-secondary" />
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
)

// ============================================
// STATS SECTION
// ============================================

const StatsSection = () => {
  const [sectionContent, setSectionContent] = useState(null)
  const [statistics, setStatistics] = useState([])

  const [isSectionVisible, setIsSectionVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  const [headerRef, isHeaderVisible] = useReveal(0.2,!isLoading && !hasError && isSectionVisible)

  // ==========================================
  // FETCH STATISTICS DATA
  // ==========================================

  useEffect(() => {
    const controller = new AbortController()

    const fetchStatistics = async () => {
      setIsLoading(true)
      setHasError(false)

      try {
        const [homepageResponse, statsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/homepageContent`, {
              signal: controller.signal,
            }),

            fetch(`${API_BASE_URL}/siteStats`, {
              signal: controller.signal,
            }),
          ])

        if (!homepageResponse.ok || !statsResponse.ok) {
          throw new Error("Failed to fetch statistics data")
        }

        const [homepageData, statsData] = await Promise.all([
          homepageResponse.json(),
          statsResponse.json(),
        ])

        if (
          !homepageData?.statsSection ||
          typeof homepageData.statsSection !== "object"
        ) {
          throw new Error("Invalid statistics section content")
        }

        if (!Array.isArray(statsData)) {
          throw new Error("Invalid academy statistics data")
        }

        const statsSectionContent = homepageData.statsSection

        setSectionContent(statsSectionContent)

        const visibleRecord = statsData.find(
          (record) => record?.isVisible === true
        )

        setIsSectionVisible(Boolean(visibleRecord))

        const rawItems = Array.isArray(visibleRecord?.items)
          ? visibleRecord.items
          : []

        const requestedLimit = Number(
          statsSectionContent.limit
        )

        const displayLimit =
          Number.isInteger(requestedLimit) && requestedLimit > 0
            ? requestedLimit
            : rawItems.length

        const activeStatistics = rawItems
          .filter(
            (item) =>
              item?.id &&
              item?.label &&
              Number.isFinite(Number(item.value))
          )
          .map((item) => ({
            ...item,
            value: Number(item.value),
            suffix:
              typeof item.suffix === "string"
                ? item.suffix
                : "",
          }))
          .sort(
            (first, second) =>
              (first.sortOrder ?? 0) - (second.sortOrder ?? 0)
          )
          .slice(0, displayLimit)

        setStatistics(activeStatistics)

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Stats Section Error:", error)
          setHasError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchStatistics()

    return () => controller.abort()
  }, [retryCount])

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return <StatsSkeleton direction={direction} />
  }

  // ==========================================
  // VISIBILITY CONTROL
  // ==========================================

  if (!isSectionVisible && !hasError) {
    return null
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (hasError) {
    return (
      <section
        dir={direction}
        className="section-padding bg-background"
      >
        <div className="container-custom">
          <div
            role="alert"
            className="mx-auto max-w-xl rounded-3xl border border-border bg-surface p-8 text-center shadow-card"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <GraduationCap size={28} />
            </div>

            {sectionContent?.errorTitle && (
              <h2 className="mt-5 text-lg font-bold text-text-primary">
                {getLocalizedText(
                  sectionContent.errorTitle,
                  language
                )}
              </h2>
            )}

            {sectionContent?.errorDescription && (
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {getLocalizedText(
                  sectionContent.errorDescription,
                  language
                )}
              </p>
            )}

            <button
              type="button"
              aria-label={getLocalizedText(
                sectionContent?.retryLabel,
                language
              )}
              onClick={() =>
                setRetryCount((previous) => previous + 1)
              }
              className="btn-primary mt-5 min-h-12 gap-2"
            >
              <RefreshCw size={17} />
              {getLocalizedText(
                sectionContent?.retryLabel,
                language
              )}
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  const isEmpty = statistics.length === 0

  // ==========================================
  // SECTION DESIGN
  // ==========================================

  return (
    <section
      id="stats"
      dir={direction}
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >

      {/* BACKGROUND DECORATION */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-40 top-10 -z-10 h-96 w-96 rounded-full bg-brand-blue/4.5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-green/4.5 blur-3xl"
      />

      <div className="container-custom">

        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-14 xl:gap-20">

          {/* SECTION INTRODUCTION */}

          <div
            ref={headerRef}
            className={`relative z-10 transition-all duration-1000 ease-out motion-reduce:transition-none ${
              isHeaderVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >

            {/* EYEBROW */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/5 px-4 py-2.5">
              <Sparkles
                size={16}
                className="text-brand-orange"
              />

              <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-brand-blue sm:text-xs">
                {getLocalizedText(
                  sectionContent?.eyebrow,
                  language
                )}
              </span>
            </div>

            {/* HEADING */}

            <h2 className="heading-2 max-w-xl text-text-primary sm:text-4xl lg:text-[clamp(2.2rem,3.4vw,3.4rem)] lg:leading-[1.2]">
              {getLocalizedText(
                sectionContent?.title,
                language
              )}

              <span
                aria-hidden="true"
                className="mt-4 block h-1.5 w-24 rounded-full bg-brand-orange"
              />
            </h2>

            {/* DESCRIPTION */}

            <p className="body-base mt-6 max-w-lg leading-8 text-text-secondary sm:text-lg sm:leading-9">
              {getLocalizedText(
                sectionContent?.description,
                language
              )}
            </p>

            {/* DECORATIVE DETAIL */}

            <div
              aria-hidden="true"
              className="mt-9 flex items-center gap-3 text-brand-blue/30"
            >
              <span className="h-px w-14 bg-current" />
              <span className="h-2 w-2 rounded-full bg-brand-orange" />
              <span className="h-px w-8 bg-current" />
            </div>

          </div>

          {/* STATISTICS GRID */}

          <div className="relative min-w-0">

            {/* FLOATING DECORATIONS */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-e-5 -top-8 z-10 text-brand-orange/70 sm:-inset-e-7"
            >
              <Sparkles
                size={29}
                className="animate-pulse"
              />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-7 -inset-s-5 z-10 text-brand-blue/20"
            >
              <svg
                width="70"
                height="50"
                viewBox="0 0 70 50"
                fill="none"
              >
                <path
                  d="M3 35C16 7 37 4 67 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {isEmpty ? (

              <div
                role="status"
                className="relative flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface px-6 py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <Sparkles size={28} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-text-primary">
                  {getLocalizedText(
                    sectionContent?.emptyTitle,
                    language
                  )}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
                  {getLocalizedText(
                    sectionContent?.emptyDescription,
                    language
                  )}
                </p>
              </div>

            ) : (

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                {statistics.map((stat, index) => (
                  <StatCard
                    key={stat.id}
                    stat={stat}
                    index={index}
                    language={language}
                  />
                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  )
}

export default StatsSection
