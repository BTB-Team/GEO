
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link, NavLink, useLocation } from "react-router-dom"

import {
  Home,
  BookOpen,
  Users,
  Info,
  Award,
  Newspaper,
  Bell,
  CalendarDays,
  Library,
  Images, // <--- اینجا BadgeCheck را به Images تغییر دهید
  Phone,
  UserPlus,
  Megaphone,
  Globe,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  GraduationCap,
  Heart,
} from "lucide-react"

import useLanguageStore from "../../store/languageStore"

const API_URL = "http://localhost:5000"

// Navigation icons are mapped from identifiers stored in db.json.
const navigationIcons = {
  home: Home,
  "book-open": BookOpen,
  users: Users,
  info: Info,
  award: Award,
  newspaper: Newspaper,
  bell: Bell,
  "calendar-days": CalendarDays,
  library: Library,
  images: Images, // جایگزین "badge-check": BadgeCheck شد
  phone: Phone,
  "user-plus": UserPlus,
  megaphone: Megaphone,
  heart: Heart,
}

const getNavigationIcon = (iconName) =>
  navigationIcons[iconName] || ArrowUpRight

// Get localized text from database values.
const getLocalizedValue = (value, language) => {
  if (typeof value === "string") return value

  return (
    value?.[language] ||
    value?.en ||
    value?.fa ||
    ""
  )
}

// Normalize the navigation response from json-server.
const normalizeNavigation = (payload) => {
  const items = Array.isArray(payload)
    ? payload
    : payload?.navigation || payload?.data?.navigation || []

  if (!Array.isArray(items)) return []

  return items
    .filter((item) => item.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({
      ...item,
      children:
        item.type === "group"
          ? (item.children || [])
              .filter((child) => child.isVisible)
              .sort((a, b) => a.sortOrder - b.sortOrder)
          : [],
    }))
}

// Normalize the site settings response.
const normalizeSettings = (payload) => {
  const settings =
    payload?.siteSettings ||
    payload?.data?.siteSettings ||
    payload?.data ||
    payload

  if (Array.isArray(settings)) return settings[0] || null

  return settings
}

// Normalize public asset paths.
const normalizeAssetPath = (value) => {
  if (typeof value !== "string" || !value.trim()) return null

  const path = value.trim()

  if (/^https?:\/\//i.test(path)) return path

  return `/${path
    .replace(/^\/+/, "")
    .replace(/^public\//, "")}`
}

const Header = () => {
  const [navigation, setNavigation] = useState([])
  const [settings, setSettings] = useState(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState({})
  const [failedLogo, setFailedLogo] = useState(null)

  const menuPanelRef = useRef(null)
  const menuToggleRef = useRef(null)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const { pathname } = useLocation()

  // Fetch navigation and settings from json-server.
  useEffect(() => {
    const controller = new AbortController()

    const fetchHeaderData = async () => {
      try {
        const [navigationResponse, settingsResponse] =
          await Promise.all([
            fetch(`${API_URL}/navigation`, {
              signal: controller.signal,
            }),
            fetch(`${API_URL}/siteSettings`, {
              signal: controller.signal,
            }),
          ])

        if (!navigationResponse.ok || !settingsResponse.ok) {
          throw new Error("Failed to fetch header data")
        }

        const [navigationPayload, settingsPayload] =
          await Promise.all([
            navigationResponse.json(),
            settingsResponse.json(),
          ])

        const settingsData = normalizeSettings(settingsPayload)

        if (!settingsData?.academyName) {
          throw new Error(
            "Academy name was not found in siteSettings"
          )
        }

        setNavigation(normalizeNavigation(navigationPayload))
        setSettings(settingsData)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Header data error:", error)
        }
      }
    }

    fetchHeaderData()

    return () => controller.abort()
  }, [])

  // Localized content from database.
  const academyName = getLocalizedValue(
    settings?.academyName,
    language
  )

  const tagline = getLocalizedValue(
    settings?.tagline,
    language
  )

  const registrationLabel = getLocalizedValue(
    settings?.registrationButton,
    language
  )

  const menuLabel = getLocalizedValue(
    settings?.headerLabels?.menu,
    language
  )

  const closeMenuLabel = getLocalizedValue(
    settings?.headerLabels?.closeMenu,
    language
  )

  const languageLabel = getLocalizedValue(
    settings?.headerLabels?.languageButton,
    language
  )

  const logo = normalizeAssetPath(settings?.logo)

// Close menu on browser history navigation.
useEffect(() => {
  const handlePopState = () => {
    setIsMenuOpen(false)
  }

  window.addEventListener("popstate", handlePopState)

  return () => {
    window.removeEventListener("popstate", handlePopState)
  }
}, [])

  // Lock background scrolling and support Escape.
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.body.style.overflow = "hidden"

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow

      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [isMenuOpen])

  // Close menu when clicking anywhere outside the menu and toggle button.
  useEffect(() => {
    if (!isMenuOpen) return

    const handleOutsideClick = (event) => {
      const target = event.target

      const clickedInsidePanel =
        menuPanelRef.current?.contains(target)

      const clickedMenuButton =
        menuToggleRef.current?.contains(target)

      if (clickedInsidePanel || clickedMenuButton) return

      setIsMenuOpen(false)
    }

    document.addEventListener(
      "pointerdown",
      handleOutsideClick,
      true
    )

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
        true
      )
    }
  }, [isMenuOpen])

  // Divide navigation according to database placement.
  const {
    headerLinks,
    menuLinks,
    mobileLinks,
    registrationItem,
  } = useMemo(() => {
    const visibleItems = navigation.filter(
      (item) => item.isVisible
    )

    return {
      headerLinks: visibleItems.filter(
        (item) =>
          item.placement === "header" &&
          item.type === "link"
      ),

      menuLinks: visibleItems.filter(
        (item) =>
          item.placement === "menu" &&
          (item.type === "link" || item.type === "group")
      ),

      // Mobile menu contains both desktop and menu links.
      mobileLinks: visibleItems.filter(
        (item) =>
          (item.placement === "header" ||
            item.placement === "menu") &&
          (item.type === "link" || item.type === "group")
      ),

      registrationItem: visibleItems.find(
        (item) => item.placement === "action"
      ),
    }
  }, [navigation])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fa" : "en")
    closeMenu()
  }

  const toggleGroup = (groupId, currentlyExpanded) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [groupId]: !currentlyExpanded,
    }))
  }

  // Render navigation items and nested groups.
  const renderNavigationItem = (item) => {
    const Icon = getNavigationIcon(item.icon)

    // Grouped navigation.
    if (item.type === "group") {
      const children = item.children || []

      if (children.length === 0) return null

      const isChildActive = children.some(
        (child) =>
          pathname === child.path ||
          pathname.startsWith(`${child.path}/`)
      )

      const isExpanded =
        expandedGroups[item.id] ?? isChildActive

      return (
        <div
          key={item.id}
          className="group rounded-2xl border border-border bg-background p-3 transition-all duration-300 hover:border-brand-blue/30 hover:shadow-card sm:p-4"
        >
          <button
            type="button"
            onClick={() =>
              toggleGroup(item.id, isExpanded)
            }
            aria-expanded={isExpanded}
            className="flex w-full items-center justify-between gap-3 text-start"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                <Icon size={21} aria-hidden="true" />
              </span>

              <span className="min-w-0 text-sm font-bold text-text-primary">
                {getLocalizedValue(item.label, language)}
              </span>
            </span>

            <ChevronDown
              size={18}
              aria-hidden="true"
              className={`shrink-0 text-text-secondary transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Group Children */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ${
              isExpanded
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="mt-3 space-y-1 border-t border-border pt-2">
                {children.map((child) => {
                  const ChildIcon = getNavigationIcon(child.icon)

                  return (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      end={child.path === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-brand-green/10 text-brand-green"
                            : "text-text-secondary hover:bg-surface-secondary hover:text-brand-blue"
                        }`
                      }
                    >
                      <span className="flex items-center gap-2">
                        <ChildIcon
                          size={16}
                          aria-hidden="true"
                        />

                        {getLocalizedValue(
                          child.label,
                          language
                        )}
                      </span>

                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                      />
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (item.type !== "link" || !item.path) return null

    return (
      <NavLink
        key={item.id}
        to={item.path}
        end={item.path === "/"}
        onClick={closeMenu}
        className={({ isActive }) =>
          `group relative flex min-h-[64px] items-center gap-3 overflow-hidden rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-0.5 ${
            isActive
              ? "border-brand-blue/30 bg-brand-blue/5"
              : "border-border bg-background hover:border-brand-blue/30 hover:bg-surface hover:shadow-card"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "bg-surface-secondary text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
              }`}
            >
              <Icon size={21} aria-hidden="true" />
            </span>

            <span className="min-w-0 flex-1 text-sm font-bold text-text-primary">
              {getLocalizedValue(item.label, language)}
            </span>

            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="shrink-0 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue"
            />

            {isActive && (
              <span className="absolute inset-inline-start-0 top-3 bottom-3 w-0.5 rounded-full bg-brand-orange" />
            )}
          </>
        )}
      </NavLink>
    )
  }

  if (!settings) return null

  return (
    <header
      dir={direction}
      className="sticky top-0 z-[70]"
    >
      <div className="container-custom py-2 sm:py-3">
        <div className="relative">

          {/* Main Header */}
          <div className="relative z-[80] flex min-h-[68px] items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/95 px-3 shadow-card transition-all duration-300 sm:min-h-[76px] sm:px-5 xl:grid xl:grid-cols-[minmax(250px,1fr)_auto_minmax(340px,1fr)]">

            {/* Academy Logo and Full Name */}
            <Link
              to="/"
              onClick={closeMenu}
              aria-label={academyName}
              className="flex min-w-0 flex-1 items-center gap-2.5 justify-self-start sm:gap-3 xl:flex-none"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-secondary p-1 transition-transform duration-300 hover:scale-105 sm:h-12 sm:w-12">
                {logo && failedLogo !== logo ? (
                  <img
                    key={logo}
                    src={logo}
                    alt={academyName}
                    loading="eager"
                    className="h-full w-full object-contain"
                    onError={() => {
                      console.error(
                        "Academy logo could not be loaded:",
                        logo
                      )
                      setFailedLogo(logo)
                    }}
                  />
                ) : (
                  <GraduationCap
                    size={26}
                    className="text-brand-blue"
                    aria-hidden="true"
                  />
                )}
              </span>

              <span className="flex min-w-0 flex-col">
                {/* No truncate: the full academy name remains visible. */}
                <span className="whitespace-normal break-words text-[11px] font-extrabold leading-5 text-text-primary sm:text-sm xl:whitespace-nowrap xl:text-base">
                  {academyName}
                </span>

                <span className="hidden whitespace-normal text-[10px] font-medium leading-5 text-text-secondary sm:block sm:text-caption">
                  {tagline}
                </span>
              </span>
            </Link>

            {/* Important Desktop Links - Center */}
            <nav
              aria-label={academyName}
              className="hidden items-center justify-center gap-4 justify-self-center xl:flex 2xl:gap-6"
            >
              {headerLinks.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap py-3 text-xs font-bold transition-colors duration-200 2xl:text-sm ${
                      isActive
                        ? "text-brand-blue"
                        : "text-text-secondary hover:text-brand-blue"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {getLocalizedValue(item.label, language)}

                      <span
                        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full bg-brand-orange transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex shrink-0 items-center gap-1.5 justify-self-end sm:gap-2">

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={languageLabel}
                className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl border border-border bg-background px-2.5 text-xs font-semibold text-text-secondary transition-all duration-200 hover:border-brand-blue hover:bg-surface-secondary hover:text-brand-blue sm:h-11 sm:gap-2 sm:px-3 sm:text-sm"
              >
                <Globe size={17} aria-hidden="true" />
                <span>{languageLabel}</span>
              </button>

              {/* Registration: Desktop Header Only */}
              {registrationItem && (
                <Link
                  to={registrationItem.path}
                  className="hidden h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand-blue px-3.5 text-sm font-bold text-white shadow-sm shadow-brand-blue/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/20 xl:inline-flex"
                >
                  {(() => {
                    const RegistrationIcon = getNavigationIcon(
                      registrationItem.icon
                    )

                    return (
                      <RegistrationIcon
                        size={17}
                        aria-hidden="true"
                      />
                    )
                  })()}

                  <span>
                    {registrationLabel ||
                      getLocalizedValue(
                        registrationItem.label,
                        language
                      )}
                  </span>
                </Link>
              )}

              {/* Menu Button */}
              <button
                ref={menuToggleRef}
                type="button"
                onClick={() =>
                  setIsMenuOpen((previous) => !previous)
                }
                aria-label={
                  isMenuOpen ? closeMenuLabel : menuLabel
                }
                aria-expanded={isMenuOpen}
                aria-controls="academy-navigation-panel"
                className={`inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 text-xs font-bold text-white transition-all duration-300 sm:h-11 sm:gap-2 sm:px-3.5 sm:text-sm ${
                  isMenuOpen
                    ? "bg-brand-green shadow-lg shadow-brand-green/20"
                    : "bg-brand-blue shadow-sm shadow-brand-blue/15 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-blue/20"
                }`}
              >
                <span>
                  {isMenuOpen ? closeMenuLabel : menuLabel}
                </span>

                <span className="relative h-5 w-5 shrink-0">
                  <Menu
                    size={20}
                    aria-hidden="true"
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                    }`}
                  />

                  <X
                    size={20}
                    aria-hidden="true"
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-0 opacity-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Menu Panel */}
          <div
            ref={menuPanelRef}
            id="academy-navigation-panel"
            aria-hidden={!isMenuOpen}
            className={`absolute inset-x-0 top-full z-[90] mt-3 origin-top rounded-3xl border border-border bg-background p-3 shadow-2xl shadow-slate-900/15 transition-[opacity,transform,visibility] duration-300 ease-out sm:p-5 lg:p-6 ${
              isMenuOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible pointer-events-none -translate-y-3 scale-[0.98] opacity-0"
            }`}
          >
            <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto">

              {/* Desktop Menu: Secondary Navigation */}
              <nav
                aria-label={academyName}
                className="hidden grid-cols-2 gap-3 xl:grid 2xl:grid-cols-3"
              >
                {menuLinks.map((item) =>
                  renderNavigationItem(item)
                )}
              </nav>

              {/* Mobile and Tablet Menu: All Page Links */}
              <nav
                aria-label={academyName}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:hidden"
              >
                {mobileLinks.map((item) =>
                  renderNavigationItem(item)
                )}
              </nav>

              {/* Registration Inside Mobile Menu */}
              {registrationItem && (
                <div className="mt-4 border-t border-border pt-4 xl:hidden">
                  <Link
                    to={registrationItem.path}
                    onClick={closeMenu}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-bold text-white shadow-sm shadow-brand-blue/15 transition-all duration-300 hover:bg-brand-blue/90"
                  >
                    {(() => {
                      const RegistrationIcon = getNavigationIcon(
                        registrationItem.icon
                      )

                      return (
                        <RegistrationIcon
                          size={18}
                          aria-hidden="true"
                        />
                      )
                    })()}

                    <span>
                      {registrationLabel ||
                        getLocalizedValue(
                          registrationItem.label,
                          language
                        )}
                    </span>
                  </Link>
                </div>
              )}

              {/* Menu Footer */}
              <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <GraduationCap size={18} aria-hidden="true" />
                  </span>

                  <span>{academyName}</span>
                </div>

                <span className="text-[10px] font-medium text-text-muted">
                  {tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop is rendered outside Header to avoid fixed-position clipping. */}
      {isMenuOpen &&
        createPortal(
          <button
            type="button"
            aria-label={closeMenuLabel}
            onClick={closeMenu}
            className="fixed inset-0 z-[60] cursor-default bg-slate-950/25 backdrop-blur-[2px]"
          />,
          document.body
        )}
    </header>
  )
}

export default Header
