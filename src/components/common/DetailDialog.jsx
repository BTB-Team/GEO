import { useEffect, useRef } from "react"
import { X } from "lucide-react"

const DetailDialog = ({ titleId, direction, closeLabel, onClose, children }) => {
  const dialogRef = useRef(null)

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
      className="m-auto max-h-[90vh] w-[min(92vw,42rem)] overflow-hidden rounded-3xl bg-white p-0 text-text-primary shadow-2xl backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={closeLabel}
          className="absolute end-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 shadow transition hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <X size={18} aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  )
}

export default DetailDialog
