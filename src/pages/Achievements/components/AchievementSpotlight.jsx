import { ArrowRight, CalendarDays, Sparkles } from "lucide-react"
import { formatFullDate, getCategory, getCategoryKey, getLocalImage, getLocalizedText } from "./achievementConfig"
import { CategoryBadge, StudentAvatar } from "./AchievementParts"

const AchievementSpotlight = ({ item, copy, language, categoryLabel, onOpen }) => {
  const categoryKey = getCategoryKey(item.category)
  const { icon: Icon } = getCategory(item.category)

  const image = getLocalImage(item.image)
  const title = getLocalizedText(item.title, language)
  const student = getLocalizedText(item.studentName, language)
  const organization = getLocalizedText(item.organization, language)
  const description = getLocalizedText(item.description, language)
  const date = formatFullDate(item.achievementDate, language)

  return (
    <article className="program-card--featured rounded-[2rem] border p-6 text-white sm:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* CONTENT */}
        <div className="order-2 flex min-w-0 flex-col items-start lg:order-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/15 px-3 py-1.5 text-[0.6875rem] font-bold leading-none text-[#FFE1B7]">
              <Sparkles size={13} className="text-brand-orange" aria-hidden="true" />
              {copy.featuredLabel}
            </span>
            <CategoryBadge categoryKey={categoryKey} label={categoryLabel(categoryKey)} onDark />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold leading-snug text-white [overflow-wrap:anywhere] sm:text-3xl">
            {title}
          </h2>

          {description && (
            <p className="body-small mt-3 max-w-xl text-white/75">{description}</p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <StudentAvatar
              name={student}
              photo={item.studentPhoto}
              className="size-12 border border-white/25 bg-white/15 text-base text-white"
              accentKey="blue"
            />
            <div className="min-w-0">
              <p className="font-bold">{student}</p>
              {organization && <p className="text-caption text-white/70">{organization}</p>}
            </div>
          </div>

          <div className="mt-7 flex w-full flex-wrap items-center gap-4 border-t border-white/15 pt-5">
            {date && (
              <time dateTime={item.achievementDate} className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">
                <CalendarDays size={16} className="text-brand-orange" aria-hidden="true" />
                {date}
              </time>
            )}

            <button
              type="button"
              onClick={() => onOpen(item.id)}
              className="ms-auto inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-blue transition hover:bg-white/90 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {copy.viewDetails}
              <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* VISUAL */}
        <div className="order-1 flex justify-center lg:order-2">
          {image ? (
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full max-w-sm rounded-3xl border border-white/25 object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="grid aspect-square w-40 place-items-center rounded-[2rem] border border-white/25 bg-white/10 backdrop-blur sm:w-56"
            >
              <Icon size={72} strokeWidth={1.1} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default AchievementSpotlight
