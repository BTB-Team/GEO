import { ACCENTS, formatYear, getCategory, getCategoryKey, getLocalImage, getLocalizedText } from "./achievementConfig"
import { CategoryBadge, StudentAvatar } from "./AchievementParts"

const AchievementCard = ({ item, language, categoryLabel, onOpen }) => {
  const categoryKey = getCategoryKey(item.category)
  const { icon: Icon, accent } = getCategory(item.category)
  const tone = ACCENTS[accent]

  const image = getLocalImage(item.image)
  const title = getLocalizedText(item.title, language)
  const student = getLocalizedText(item.studentName, language)
  const organization = getLocalizedText(item.organization, language)
  const description = getLocalizedText(item.description, language)
  const year = formatYear(item.achievementDate, language)

  return (
    <article className="card-custom group relative flex h-full flex-col transition duration-300 focus-within:ring-2 focus-within:ring-brand-blue/50 hover:-translate-y-1 hover:border-brand-blue/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* MEDIA */}
      <div className={`relative aspect-[16/9] overflow-hidden ${tone.soft}`}>
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center" aria-hidden="true">
            <Icon size={56} strokeWidth={1.2} className={`${tone.iconText} opacity-60`} />
          </div>
        )}

        <div className="absolute start-3 top-3">
          <CategoryBadge categoryKey={categoryKey} label={categoryLabel(categoryKey)} />
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="heading-4 text-text-primary">
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className="text-start outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </button>
        </h3>

        {description && (
          <p className="body-small mt-2 mb-5 line-clamp-3 text-text-secondary">{description}</p>
        )}

        <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <StudentAvatar name={student} photo={item.studentPhoto} accentKey={accent} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-text-primary">{student}</p>
            {organization && (
              <p className="truncate text-caption text-text-secondary">{organization}</p>
            )}
          </div>

          {year && (
            <time dateTime={item.achievementDate} className="shrink-0 text-caption font-semibold text-text-muted">
              {year}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}

export default AchievementCard
