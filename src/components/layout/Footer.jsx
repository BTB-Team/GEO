
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import academyLogo from "../../assets/image/logo/logo_header.webp"
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Video,
} from "lucide-react"

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6"

import useLanguageStore from "../../store/languageStore"

const Footer = () => {
  const [footerContent, setFooterContent] = useState(null)
  const [navigation, setNavigation] = useState([])
  const [settings, setSettings] = useState(null)

  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [footerResponse, navigationResponse, settingsResponse] =
          await Promise.all([
            fetch("http://localhost:5000/footerContent"),
            fetch("http://localhost:5000/navigation"),
            fetch("http://localhost:5000/siteSettings"),
          ])

        if (
          !footerResponse.ok ||
          !navigationResponse.ok ||
          !settingsResponse.ok
        ) {
          throw new Error("Failed to load footer data")
        }

        const [footerData, navigationData, settingsData] =
          await Promise.all([
            footerResponse.json(),
            navigationResponse.json(),
            settingsResponse.json(),
          ])

        setFooterContent(footerData)

        setNavigation(
          navigationData
            .filter((item) => item.isVisible)
            .sort((a, b) => a.sortOrder - b.sortOrder)
        )

        setSettings(settingsData)
      } catch (error) {
        console.error("Footer data error:", error)
      }
    }

    fetchFooterData()
  }, [])

  if (!footerContent || !settings) return null

  const content = footerContent
  const academyName = settings.academyName?.[language]
  const tagline = settings.tagline?.[language]


  const handleBackToTop = () => {
  const scrollElement = document.scrollingElement

  scrollElement?.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
}


  // Social and online communication links
  const socialLinks = [
    {
      name: "Facebook",
      url: content.socialLinks?.facebook,
      icon: FaFacebookF,
    },
    {
      name: "Instagram",
      url: content.socialLinks?.instagram,
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      url: content.socialLinks?.linkedin,
      icon: FaLinkedinIn,
    },
    {
      name: "WhatsApp",
      url: content.socialLinks?.whatsapp,
      icon: FaWhatsapp,
    },
    {
      name: "Telegram",
      url: content.socialLinks?.telegram,
      icon: FaTelegram,
    },
    {
      name: "Google Meet",
      url: content.socialLinks?.googleMeet,
      icon: Video,
    },
  ].filter((item) => item.url)

  return (
    <footer
      dir={direction}
      className="mt-auto border-t border-border bg-surface"
    >
      <div className="container-custom">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,0.7fr)_minmax(0,1.4fr)] lg:gap-6 lg:py-16">

          {/* Academy Information */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
             to="/"
            className="mb-5 inline-flex max-w-full items-center gap-3"
            >
            <img
                src={academyLogo}
                alt={academyName || "Academy Logo"}
                className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
            />

              <div className="min-w-0">
                <h2 className="truncate text-sm font-extrabold text-text-primary sm:text-base">
                  {academyName}
                </h2>

                <p className="mt-1 truncate text-xs font-medium text-text-secondary">
                  {tagline}
                </p>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-7 text-text-secondary">
              {content.description?.[language]}
            </p>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="mb-5 text-sm font-bold text-text-primary sm:text-base">
              {content.quickLinksTitle?.[language]}
            </h3>

            <nav className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-sm text-text-secondary transition-colors duration-200 hover:text-brand-blue"
                >
                  {item.label?.[language]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="min-w-0">
            <h3 className="mb-5 text-sm font-bold text-text-primary sm:text-base">
              {content.contactTitle?.[language]}
            </h3>

            <div className="space-y-4">

              {/* Email */}
                <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(content.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-start gap-3 text-sm text-text-secondary transition-colors duration-200 hover:text-brand-blue"
                    >
                    <Mail size={17} className="mt-0.5 shrink-0" />
                    <span className="break-all">{content.email}</span>
                </a>

              {/* Phone */}
              {content.phone && (
                <a
                  href={`tel:${content.phone}`}
                  className="flex min-w-0 items-start gap-3 text-sm text-text-secondary transition-colors duration-200 hover:text-brand-blue"
                >
                  <Phone size={17} className="mt-0.5 shrink-0" />
                  <span dir="ltr" className="break-all">
                    {content.phone}
                  </span>
                </a>
              )}

              {/* Address */}
              {content.address?.[language] && (
                <div className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
                  <MapPin size={17} className="mt-1 shrink-0" />
                  <span>{content.address[language]}</span>
                </div>
              )}

              {/* Social Media & Online Contact */}
              <div className="flex flex-nowrap items-center gap-2 pt-2">
                {socialLinks.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-text-secondary transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue hover:bg-brand-blue hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-center sm:flex-row sm:text-start">
          <p className="text-xs leading-6 text-text-secondary sm:text-sm">
            {content.copyright?.[language]}
          </p>

          <button
  type="button"
  onClick={handleBackToTop}
  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-brand-blue transition-colors duration-200 hover:bg-white sm:text-sm"
>
  <span>
    {language === "en" ? "Back to top" : "بازگشت به بالا"}
  </span>

  <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
