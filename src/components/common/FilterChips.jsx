
const FilterChips = ({ label, options, value, onChange }) => (
  <div
    role="group"
    aria-label={label}
    className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
  >
    {options.map((option) => {
      const isActive = option.key === value

      return (
        <button
          key={option.key}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(option.key)}
          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue/50 ${
            isActive
              ? "border-brand-blue bg-brand-blue text-white"
              : "border-border bg-white text-text-secondary hover:border-brand-blue/40 hover:text-brand-blue"
          }`}
        >
          <span>{option.label}</span>
          {option.count !== undefined && (
            <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-white/20" : "bg-surface-secondary"}`}>
              {option.count}
            </span>
          )}
        </button>
      )
    })}
  </div>
)

export default FilterChips
