
import {
  Languages,
  Palette,
  Type,
  Layout,
  MousePointer2,
  PanelsTopLeft,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  AlertCircle,
  Info,
  ExternalLink,
} from "lucide-react";

import useLanguageStore from "../../store/languageStore";

const content = {
  en: {
    badge: "PROJECT FOUNDATION",
    title: "Design System Showcase",
    subtitle:
      "A visual presentation of the core design system, typography, colors, components and responsive layout of Gam-e-Buland Online Academy.",
    language: "Language",
    english: "English",
    persian: "فارسی",
    overview: "Design System Overview",
    overviewText: "A consistent visual foundation for the entire academy website.",
    colors: "Brand Colors & Palette",
    colorsText: "The official brand colors and supporting interface colors.",
    brand: "Brand Colors",
    neutral: "Neutral Colors",
    status: "Status Colors",
    typography: "Typography",
    typographyText: "Font families, weights, headings and body text.",
    englishFont: "English Font — Montserrat",
    persianFont: "Persian Font — IranYekan",
    fontSample: "The quick brown fox jumps over the lazy dog.",
    persianSample: "آکادمی آنلاین گام بُلند؛ بستری برای آموزش و یادگیری.",
    weights: "Available Font Weights",
    headings: "Heading Styles",
    bodyText: "Body Text Styles",
    layout: "Layout & Containers",
    layoutText: "Reusable container widths and section spacing.",
    standard: "Standard Container",
    wide: "Wide Container",
    narrow: "Narrow Container",
    sectionSpacing: "Section Spacing",
    sectionExample: "Section Example",
    sectionDescription: "This area demonstrates the section-padding utility.",
    components: "Reusable Components",
    componentsText: "Common interface elements using custom CSS utilities.",
    buttons: "Buttons",
    primary: "Primary Button",
    secondary: "Secondary Button",
    cards: "Cards",
    cardTitle: "Educational Program",
    cardDescription: "A reusable card component for courses, programs and other content.",
    learnMore: "Learn More",
    forms: "Form Elements",
    fullName: "Full Name",
    email: "Email Address",
    placeholderName: "Enter your full name",
    placeholderEmail: "Enter your email address",
    links: "Links",
    sampleLink: "Explore our educational programs",
    radius: "Border Radius & Shadows",
    radiusText: "Design tokens for consistent rounded corners and elevation.",
    smallRadius: "Button Radius",
    cardRadius: "Card Radius",
    shadow: "Card Shadow",
    statuses: "Status Indicators",
    success: "Successfully completed",
    warning: "Please review this information",
    error: "Something went wrong",
    info: "Additional information",
    responsive: "Responsive Design",
    responsiveText: "The layout adapts to mobile, tablet and desktop screens.",
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
    footer: "Gam-e-Buland Online Academy",
    footerText: "A consistent foundation. A better learning experience.",
    preview: "Live Preview",
    containerHint: "The highlighted area represents the container boundary.",
  },
  fa: {
    badge: "زیرساخت پروژه",
    title: "نمایش سیستم طراحی",
    subtitle:
      "نمایش بصری زیرساخت طراحی، تایپوگرافی، رنگ‌ها، کامپوننت‌ها و ساختار واکنش‌گرای وب‌سایت آکادمی آنلاین گام بُلند.",
    language: "زبان",
    english: "English",
    persian: "فارسی",
    overview: "نمای کلی سیستم طراحی",
    overviewText: "یک زیرساخت بصری یکپارچه برای تمام صفحات وب‌سایت آکادمی.",
    colors: "رنگ‌های برند و پالت رنگی",
    colorsText: "رنگ‌های رسمی برند و رنگ‌های تکمیلی رابط کاربری.",
    brand: "رنگ‌های برند",
    neutral: "رنگ‌های خنثی",
    status: "رنگ‌های وضعیت",
    typography: "تایپوگرافی",
    typographyText: "خانواده فونت‌ها، وزن‌ها، عنوان‌ها و متن‌ها.",
    englishFont: "فونت انگلیسی — Montserrat",
    persianFont: "فونت فارسی — IranYekan",
    fontSample: "The quick brown fox jumps over the lazy dog.",
    persianSample: "آکادمی آنلاین گام بُلند؛ بستری برای آموزش و یادگیری.",
    weights: "وزن‌های موجود فونت",
    headings: "استایل عنوان‌ها",
    bodyText: "استایل متن‌ها",
    layout: "ساختار و کانتینرها",
    layoutText: "عرض‌های استاندارد کانتینر و فاصله‌گذاری بخش‌ها.",
    standard: "کانتینر استاندارد",
    wide: "کانتینر عریض",
    narrow: "کانتینر محدود",
    sectionSpacing: "فاصله‌گذاری بخش‌ها",
    sectionExample: "نمونه بخش",
    sectionDescription: "این قسمت کلاس section-padding را نمایش می‌دهد.",
    components: "کامپوننت‌های قابل استفاده مجدد",
    componentsText: "عناصر مشترک رابط کاربری با استفاده از کلاس‌های اختصاصی CSS.",
    buttons: "دکمه‌ها",
    primary: "دکمه اصلی",
    secondary: "دکمه ثانویه",
    cards: "کارت‌ها",
    cardTitle: "برنامه آموزشی",
    cardDescription: "یک کارت قابل استفاده مجدد برای دوره‌ها، برنامه‌ها و محتوای دیگر.",
    learnMore: "بیشتر بدانید",
    forms: "عناصر فرم",
    fullName: "نام کامل",
    email: "آدرس ایمیل",
    placeholderName: "نام کامل خود را وارد کنید",
    placeholderEmail: "آدرس ایمیل خود را وارد کنید",
    links: "لینک‌ها",
    sampleLink: "برنامه‌های آموزشی ما را ببینید",
    radius: "گوشه‌های گرد و سایه‌ها",
    radiusText: "توکن‌های طراحی برای یکپارچگی گوشه‌ها و سایه‌ها.",
    smallRadius: "گردی دکمه",
    cardRadius: "گردی کارت",
    shadow: "سایه کارت",
    statuses: "نشانگرهای وضعیت",
    success: "عملیات با موفقیت انجام شد",
    warning: "لطفاً این اطلاعات را بررسی کنید",
    error: "مشکلی رخ داده است",
    info: "اطلاعات تکمیلی",
    responsive: "طراحی واکنش‌گرا",
    responsiveText: "ساختار صفحه با اندازه موبایل، تبلت و دسکتاپ سازگار می‌شود.",
    mobile: "موبایل",
    tablet: "تبلت",
    desktop: "دسکتاپ",
    footer: "آکادمی آنلاین گام بُلند",
    footerText: "زیرساخت یکپارچه؛ تجربه آموزشی بهتر.",
    preview: "پیش‌نمایش زنده",
    containerHint: "محدوده مشخص‌شده، مرز کانتینر را نمایش می‌دهد.",
  },
};

const brandColors = [
  { name: "Brand Blue", value: "#0674C3", utility: "bg-brand-blue" },
  { name: "Brand Green", value: "#1E9241", utility: "bg-brand-green" },
  { name: "Brand Orange", value: "#FE8502", utility: "bg-brand-orange" },
];

const neutralColors = [
  { name: "Background", value: "#FFFFFF", utility: "bg-background" },
  { name: "Surface", value: "#F8FAFC", utility: "bg-surface" },
  { name: "Surface Secondary", value: "#F1F5F9", utility: "bg-surface-secondary" },
  { name: "Text Primary", value: "#1E293B", utility: "bg-text-primary" },
  { name: "Text Secondary", value: "#64748B", utility: "bg-text-secondary" },
  { name: "Text Muted", value: "#94A3B8", utility: "bg-text-muted" },
  { name: "Border", value: "#E2E8F0", utility: "bg-border" },
];

const statusColors = [
  { name: "Success", value: "#16A34A", utility: "bg-success" },
  { name: "Error", value: "#DC2626", utility: "bg-error" },
  { name: "Warning", value: "#D97706", utility: "bg-warning" },
];

const fontWeights = [
  { weight: 300, name: "Light" },
  { weight: 400, name: "Regular" },
  { weight: 500, name: "Medium" },
  { weight: 800, name: "Extra Bold" },
  { weight: 900, name: "Black" },
];

function SectionHeading({ icon: Icon, title, description }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
          <Icon size={21} />
        </span>
        <h2 className="heading-2">{title}</h2>
      </div>
      <p className="body-base text-text-secondary">{description}</p>
    </div>
  );
}

function ColorSwatch({ item }) {
  return (
    <div className="card-custom overflow-hidden">
      <div className={`h-20 ${item.utility}`} />
      <div className="p-3">
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="mt-1 text-xs text-text-secondary">{item.value}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const t = content[language] || content.en;
  const isPersian = language === "fa";

  return (
    <main className="min-h-screen bg-surface">
      {/* Top Header */}
      <header className="border-b border-border bg-background">
        <div className="container-custom flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-brand-blue text-white">
              <PanelsTopLeft size={23} />
            </div>
            <div>
              <p className="font-bold text-brand-blue">
                {t.footer}
              </p>
              <p className="text-xs text-text-secondary">
                {t.badge}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-1">
            <Languages size={18} className="mx-2 text-brand-blue" />
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                !isPersian
                  ? "bg-brand-blue text-white"
                  : "text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("fa")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isPersian
                  ? "bg-brand-blue text-white"
                  : "text-text-secondary hover:bg-surface-secondary"
              }`}
            >
              فارسی
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="overflow-hidden bg-brand-blue py-16 text-white md:py-24">
        <div className="container-custom">
          <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wider">
            {t.badge}
          </span>

          <h1 className="heading-1 mt-6 max-w-4xl">
            {t.title}
          </h1>

          <p className="body-large mt-5 max-w-2xl text-white/80">
            {t.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-blue">
              React
            </span>
            <span className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              Tailwind CSS v4
            </span>
            <span className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              Zustand
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            icon={Layout}
            title={t.overview}
            description={t.overviewText}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "03", label: t.brand, color: "bg-brand-blue" },
              { number: "02", label: "Font Families", color: "bg-brand-green" },
              { number: "04", label: t.components, color: "bg-brand-orange" },
              { number: "RTL / LTR", label: t.language, color: "bg-text-primary" },
            ].map((item) => (
              <div key={item.label} className="card-custom p-5">
                <span className={`mb-4 block h-1.5 w-12 rounded-full ${item.color}`} />
                <p className="text-2xl font-extrabold">{item.number}</p>
                <p className="mt-2 text-sm text-text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            icon={Palette}
            title={t.colors}
            description={t.colorsText}
          />

          <h3 className="heading-4 mb-4">{t.brand}</h3>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {brandColors.map((item) => (
              <ColorSwatch key={item.name} item={item} />
            ))}
          </div>

          <h3 className="heading-4 mb-4">{t.neutral}</h3>
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {neutralColors.map((item) => (
              <ColorSwatch key={item.name} item={item} />
            ))}
          </div>

          <h3 className="heading-4 mb-4">{t.status}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {statusColors.map((item) => (
              <ColorSwatch key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            icon={Type}
            title={t.typography}
            description={t.typographyText}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* English Font */}
            <div className="card-custom p-6">
              <h3 className="heading-4 mb-6">{t.englishFont}</h3>

              <p className="font-english text-2xl font-bold">
                {t.fontSample}
              </p>

              <div className="mt-6 space-y-4">
                {[300, 400, 500, 600, 700, 800, 900].map((weight) => (
                  <div key={weight} className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-english text-lg" style={{ fontWeight: weight }}>
                      Montserrat {weight}
                    </span>
                    <span className="text-xs text-text-muted">{weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Persian Font */}
            <div className="card-custom p-6">
              <h3 className="heading-4 mb-6">{t.persianFont}</h3>

              <p dir="rtl" className="font-persian text-2xl font-medium">
                {t.persianSample}
              </p>

              <div className="mt-6 space-y-4">
                {fontWeights.map((item) => (
                  <div key={item.weight} className="flex items-center justify-between border-b border-border pb-3">
                    <span
                      dir="rtl"
                      className="font-persian text-lg"
                      style={{ fontWeight: item.weight }}
                    >
                      ایران یکان — {item.name}
                    </span>
                    <span className="text-xs text-text-muted">{item.weight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Heading Scale */}
          <div className="card-custom mt-6 p-6">
            <h3 className="heading-4 mb-6">{t.headings}</h3>
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs text-text-muted">heading-1</p>
                <h1 className="heading-1">Design System</h1>
              </div>
              <div>
                <p className="mb-2 text-xs text-text-muted">heading-2</p>
                <h2 className="heading-2">Educational Excellence</h2>
              </div>
              <div>
                <p className="mb-2 text-xs text-text-muted">heading-3</p>
                <h3 className="heading-3">Learning Programs</h3>
              </div>
              <div>
                <p className="mb-2 text-xs text-text-muted">heading-4</p>
                <h4 className="heading-4">Our Courses</h4>
              </div>
            </div>
          </div>

          {/* Body Text */}
          <div className="card-custom mt-6 p-6">
            <h3 className="heading-4 mb-6">{t.bodyText}</h3>
            <div className="space-y-5">
              <div>
                <p className="mb-1 text-xs text-text-muted">body-large</p>
                <p className="body-large">Education is the foundation of a brighter future.</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-text-muted">body-base</p>
                <p className="body-base">Education is the foundation of a brighter future.</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-text-muted">body-small</p>
                <p className="body-small">Education is the foundation of a brighter future.</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-text-muted">text-caption</p>
                <p className="text-caption">Education is the foundation of a brighter future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout & Containers */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            icon={Monitor}
            title={t.layout}
            description={t.layoutText}
          />

          <div className="space-y-6">
            {[
              { name: t.standard, className: "container-custom" },
              { name: t.wide, className: "container-wide" },
              { name: t.narrow, className: "container-narrow" },
            ].map((item) => (
              <div key={item.className}>
                <h3 className="heading-4 mb-3">{item.name}</h3>
                <div className="rounded-xl border border-dashed border-brand-blue bg-brand-blue/5 p-2">
                  <div className={`${item.className} rounded-lg border border-brand-blue bg-brand-blue/10 py-5 text-center text-sm font-semibold text-brand-blue`}>
                    {t.containerHint}
                  </div>
                </div>
                <p className="mt-2 text-xs text-text-muted">{item.className}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="heading-4 mb-3">{t.sectionSpacing}</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="section-padding bg-brand-green/10">
                <div className="rounded-lg border border-dashed border-brand-green p-5 text-center">
                  <p className="font-bold text-brand-green">{t.sectionExample}</p>
                  <p className="body-small mt-2 text-text-secondary">{t.sectionDescription}</p>
                  <p className="mt-3 text-xs text-text-muted">section-padding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            icon={MousePointer2}
            title={t.components}
            description={t.componentsText}
          />

          {/* Buttons */}
          <div className="card-custom mb-6 p-6">
            <h3 className="heading-4 mb-5">{t.buttons}</h3>
            <div className="flex flex-wrap items-center gap-4">
              <button className="btn-primary">{t.primary}</button>
              <button className="btn-secondary">{t.secondary}</button>
              <button className="btn-primary">
                <ExternalLink size={17} />
                {t.learnMore}
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="card-custom mb-6 p-6">
            <h3 className="heading-4 mb-5">{t.cards}</h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <article key={item} className="card-custom">
                  <div className="flex h-32 items-center justify-center bg-brand-blue/10 text-brand-blue">
                    <PanelsTopLeft size={38} />
                  </div>
                  <div className="p-5">
                    <h4 className="heading-4">{t.cardTitle}</h4>
                    <p className="body-small mt-3 text-text-secondary">
                      {t.cardDescription}
                    </p>
                    <a href="#top" className="link-custom mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                      {t.learnMore}
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="card-custom mb-6 p-6">
            <h3 className="heading-4 mb-5">{t.forms}</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="body-small mb-2 block font-semibold">{t.fullName}</span>
                <input
                  type="text"
                  className="input-custom"
                  placeholder={t.placeholderName}
                />
              </label>
              <label className="block">
                <span className="body-small mb-2 block font-semibold">{t.email}</span>
                <input
                  type="email"
                  className="input-custom"
                  placeholder={t.placeholderEmail}
                />
              </label>
            </div>
          </div>

          {/* Links */}
          <div className="card-custom mb-6 p-6">
            <h3 className="heading-4 mb-4">{t.links}</h3>
            <a href="#top" className="link-custom inline-flex items-center gap-2 font-semibold">
              {t.sampleLink}
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Radius & Shadow */}
          <div className="card-custom p-6">
            <h3 className="heading-4 mb-2">{t.radius}</h3>
            <p className="body-small mb-6 text-text-secondary">{t.radiusText}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-button border border-border bg-surface p-5">
                <p className="font-semibold">{t.smallRadius}</p>
                <p className="mt-2 text-xs text-text-muted">radius-button</p>
              </div>
              <div className="rounded-card border border-border bg-surface p-5">
                <p className="font-semibold">{t.cardRadius}</p>
                <p className="mt-2 text-xs text-text-muted">radius-card</p>
              </div>
              <div className="card-custom p-5">
                <p className="font-semibold">{t.shadow}</p>
                <p className="mt-2 text-xs text-text-muted">shadow-card</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            icon={Info}
            title={t.statuses}
            description="Semantic colors for feedback and interface messages."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-4 text-success">
              <CheckCircle2 size={22} />
              <span className="body-small font-semibold">{t.success}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 p-4 text-warning">
              <AlertCircle size={22} />
              <span className="body-small font-semibold">{t.warning}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-error/20 bg-error/5 p-4 text-error">
              <AlertCircle size={22} />
              <span className="body-small font-semibold">{t.error}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-4 text-brand-blue">
              <Info size={22} />
              <span className="body-small font-semibold">{t.info}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            icon={Smartphone}
            title={t.responsive}
            description={t.responsiveText}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Smartphone, title: t.mobile, size: "320px – 639px" },
              { icon: Tablet, title: t.tablet, size: "640px – 1023px" },
              { icon: Monitor, title: t.desktop, size: "1024px and above" },
            ].map((item) => (
              <div key={item.title} className="card-custom p-6 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <item.icon size={30} />
                </div>
                <h3 className="heading-4">{item.title}</h3>
                <p className="body-small mt-2 text-text-secondary">{item.size}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary py-10 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-3">{t.footer}</h2>
          <p className="body-small mt-3 text-white/60">{t.footerText}</p>
          <p className="mt-6 text-xs text-white/40">
            Design System Showcase · Tailwind CSS v4
          </p>
        </div>
      </footer>
    </main>
  );
}
