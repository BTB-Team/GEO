
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, Globe } from "lucide-react"
import useLanguageStore from "../../store/languageStore"
import academyLogo from "../../assets/image/logo/logo_header.png"

const Header = () => {
  const [navigation, setNavigation] = useState([])
  const [settings, setSettings] = useState(null)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const [menuState, setMenuState] = useState({
    language,
    isOpen: false,
  })

  const isMenuOpen =
    menuState.language === language && menuState.isOpen

  // Fetch Header Data
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [navigationResponse, settingsResponse] = await Promise.all([
          fetch("http://localhost:5000/navigation"),
          fetch("http://localhost:5000/siteSettings"),
        ])

        if (!navigationResponse.ok || !settingsResponse.ok) {
          throw new Error("Failed to load header data")
        }

        const [navigationData, settingsData] = await Promise.all([
          navigationResponse.json(),
          settingsResponse.json(),
        ])

        setNavigation(
          navigationData
            .filter((item) => item.isVisible)
            .sort((a, b) => a.sortOrder - b.sortOrder)
        )

        setSettings(settingsData)
      } catch (error) {
        console.error("Header data error:", error)
      }
    }

    fetchHeaderData()
  }, [])

  // Close Mobile Menu on Desktop Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuState((previous) => ({
          ...previous,
          isOpen: false,
        }))
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!settings) return null

  const academyName = settings.academyName?.[language]
  const tagline = settings.tagline?.[language]
  const registrationLabel = settings.registrationButton?.[language]

  const closeMenu = () => {
    setMenuState({ language, isOpen: false })
  }

  return (
    <header
      dir={direction}
      className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur-xl"
    >
      <div className="container-custom">

        {/* Header Main */}
        <div className="flex min-h-16 items-center justify-between gap-2 sm:min-h-20 sm:gap-4">

          {/* Academy Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
            aria-label={academyName}
          >
            <img
              src={academyLogo}
              alt={academyName || "Academy Logo"}
              className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12"
            />

            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs font-extrabold leading-5 text-text-primary sm:text-sm lg:text-base">
                {academyName}
              </span>

              <span className="truncate text-[10px] font-medium text-text-secondary sm:text-caption">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden shrink-0 items-center gap-3 2xl:gap-5 xl:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `relative whitespace-nowrap py-2 text-xs font-semibold transition-colors duration-200 2xl:text-sm ${
                    isActive
                      ? "text-brand-blue"
                      : "text-text-secondary hover:text-brand-blue"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label?.[language]}

                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-brand-orange" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() =>
                setLanguage(language === "en" ? "fa" : "en")
              }
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2 text-xs font-semibold text-text-secondary transition-colors hover:border-brand-blue hover:text-brand-blue sm:h-10 sm:gap-2 sm:px-3 sm:text-sm"
              aria-label={
                language === "en"
                  ? "Switch to Persian"
                  : "Switch to English"
              }
            >
              <Globe size={16} />
              <span>{language === "en" ? "فارسی" : "English"}</span>
            </button>

            {/* Registration Button */}
            <Link
              to="/registration"
              className="btn-primary hidden whitespace-nowrap px-3 py-2 text-xs sm:inline-flex lg:px-4 lg:text-sm"
            >
              {registrationLabel}
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() =>
                setMenuState({
                  language,
                  isOpen: !isMenuOpen,
                })
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-text-primary transition-colors hover:bg-surface-secondary sm:h-10 sm:w-10 xl:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-border py-4 xl:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-surface-secondary text-brand-blue"
                        : "text-text-secondary hover:bg-surface hover:text-brand-blue"
                    }`
                  }
                >
                  {item.label?.[language]}
                </NavLink>
              ))}

              <Link
                to="/registration"
                onClick={closeMenu}
                className="btn-primary mt-3 sm:hidden"
              >
                {registrationLabel}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
