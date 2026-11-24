import { Search, X } from "lucide-react"

const SearchInput = ({ label, placeholder, clearLabel, value, onChange }) => (
  <div className="relative w-full md:max-w-sm">
    <label htmlFor="content-search" className="sr-only">{label}</label>

    <Search size={18} aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-text-muted" />

    <input
      id="content-search"
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="input-custom ps-11 pe-11 [&::-webkit-search-cancel-button]:hidden"
    />

    {value && (
      <button
        type="button"
        onClick={() => onChange("")}
        aria-label={clearLabel}
        className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-text-muted transition hover:bg-surface-secondary hover:text-text-primary"
      >
        <X size={16} aria-hidden="true" />
      </button>
    )}
  </div>
)

export default SearchInput
