import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";

export default function Lightbox({ items, initialId, text, t, onClose }) {
  const [id, setId] = useState(initialId);
  const dialogRef = useRef(null);

  const index = items.findIndex((item) => item.id === id);
  const currentIndex = index >= 0 ? index : 0;
  const item = items[currentIndex];

  function move(step) {
    if (items.length < 2) return;

    const nextIndex = (currentIndex + step + items.length) % items.length;

    setId(items[nextIndex].id);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      className="geo-dialog"
      aria-label={text(item.title)}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="geo-dialog-inner">
        <button
          type="button"
          autoFocus
          className="geo-close"
          aria-label={t.close}
          onClick={onClose}
        >
          ×
        </button>

        <Photo
          key={item.imageUrl}
          src={item.imageUrl}
          alt={text(item.altText) || text(item.title)}
          fallback={t.broken}
        />

        <h2>{text(item.title)}</h2>

        {text(item.description) && <p>{text(item.description)}</p>}

        <div className="geo-dialog-controls" dir="ltr">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={items.length < 2}
          >
            {t.previous}
          </button>

          <span aria-live="polite">
            {currentIndex + 1} / {items.length}
          </span>

          <button
            type="button"
            onClick={() => move(1)}
            disabled={items.length < 2}
          >
            {t.next}
          </button>
        </div>
      </div>
    </dialog>
  );
}
