import { RefreshCw, SearchX } from "lucide-react"

export const PageSkeleton = ({ direction }) => (
  <section dir={direction} className="section-padding" aria-busy="true">
    <div className="container-custom animate-pulse">
      <div className="h-12 w-full max-w-md rounded-xl bg-surface-secondary" />
      <div className="mt-5 h-4 w-full max-w-xl rounded-full bg-surface-secondary" />
      <div className="mt-10 h-11 w-full max-w-sm rounded-lg bg-surface-secondary" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-64 rounded-xl bg-surface-secondary" />
        ))}
      </div>
    </div>
  </section>
)

// Full-section state for errors and empty data (reuses the existing state-card styles)
export const StateCard = ({ direction, icon: Icon, title, description, onRetry, retryLabel, role }) => (
  <section dir={direction} className="announcements-section announcements-section--state section-padding">
    <div className="container-custom">
      <div className="announcement-state-card" role={role}>
        <div className="announcement-state-card__icon">
          <Icon size={30} aria-hidden="true" />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="announcement-retry-button">
            <RefreshCw size={16} aria-hidden="true" />
            <span>{retryLabel}</span>
          </button>
        )}
      </div>
    </div>
  </section>
)

// Inline "nothing matches your filters" block
export const NoResults = ({ title, description, actionLabel, onAction }) => (
  <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
    <SearchX size={32} className="mx-auto text-text-muted" aria-hidden="true" />
    <h2 className="heading-4 mt-4 text-text-primary">{title}</h2>
    <p className="body-small mx-auto mt-2 max-w-md text-text-secondary">{description}</p>
    <button type="button" onClick={onAction} className="btn-secondary mt-5">{actionLabel}</button>
  </div>
)
