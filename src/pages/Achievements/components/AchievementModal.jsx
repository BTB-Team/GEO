import { useEffect, useRef } from "react"
import { BookOpen, Building2, CalendarDays, X } from "lucide-react"
import {
  ACCENTS,
  formatFullDate,
  getCategory,
  getCategoryKey,
  getLocalImage,
  getLocalizedText,
} from "./achievementConfig"
import { CategoryBadge, StudentAvatar } from "./AchievementParts"

const AchievementModal = ({ item, copy, language, direction, categoryLabel, courseName, onClose }) => {
  const dialogRef = useRef(null)

  const categoryKey = getCategoryKey(item.category)
  const { icon: Icon, accent } = getCategory(item.category)
  const tone = ACCENTS[accent]

  const image = getLocalImage(item.image)
  const title = getLocalizedText(item.title, language)
  const student = getLocalizedText(item.studentName, language)
  const description = getLocalizedText(item.description, language)
  const titleId = `achievement-title-${item.id}`

  const details = [
    { icon: Building2, label: copy.organizationLabel, value: getLocalizedText(item.organization, language) },
    { icon: CalendarDays, label: copy.dateLabel, value: formatFullDate(item.achievementDate, language) },
    { icon: BookOpen, label: copy.courseLabel, value: courseName },
  ].filter((detail) => detail.value)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      dir={direction}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      className="m-auto max-h-[90vh] w-[min(92vw,40rem)] overflow-hidden rounded-3xl bg-white p-0 text-text-primary shadow-2xl backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={copy.closeLabel}
          className="absolute end-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-text-primary shadow transition hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* MEDIA */}
        <div className={`relative h-40 overflow-hidden sm:h-52 ${tone.soft}`}>
          {image ? (
            <img src={image} alt="" className="size-full object-cover" />
          ) : (
            <div className="grid size-full place-items-center" aria-hidden="true">
              <Icon size={72} strokeWidth={1.1} className={`${tone.iconText} opacity-60`} />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8">
          <CategoryBadge categoryKey={categoryKey} label={categoryLabel(categoryKey)} />

          <h2 id={titleId} className="heading-3 mt-4 text-text-primary [overflow-wrap:anywhere]">
            {title}
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <StudentAvatar name={student} photo={item.studentPhoto} accentKey={accent} className="size-12 text-base" />
            <p className="font-bold">{student}</p>
          </div>

          {description && <p className="body-base mt-5 text-text-secondary">{description}</p>}

          {details.length > 0 && (
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {details.map(({ icon: DetailIcon, label, value }) => (
                <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                  <dt className="flex items-center gap-2 text-caption font-semibold text-text-muted">
                    <DetailIcon size={14} aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default AchievementModal
