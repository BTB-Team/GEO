import {
  ACCENTS,
  getCategory,
  getInitials,
  getLocalImage,
} from "./achievementConfig"


export const StudentAvatar = ({
  name,
  photo,
  accentKey = "blue",
  className = "size-10 text-sm",
}) => {
  const src = getLocalImage(photo)
  const accent = ACCENTS[accentKey]

  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${className} shrink-0 rounded-full object-cover`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} grid shrink-0 place-items-center rounded-full font-bold ${accent.soft} ${accent.badgeText}`}
    >
      {getInitials(name)}
    </span>
  )
}


export const CategoryBadge = ({ categoryKey, label, onDark = false }) => {
  const { icon: Icon, accent } = getCategory(categoryKey)
  const tone = ACCENTS[accent]

  const classes = onDark
    ? "border-white/25 bg-white/10 text-white backdrop-blur"
    : `${tone.border} ${tone.soft} ${tone.badgeText}`

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.6875rem] font-bold leading-none ${classes}`}
    >
      <Icon size={13} strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
