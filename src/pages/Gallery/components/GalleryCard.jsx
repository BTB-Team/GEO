import { Expand } from "lucide-react";
import Photo from "./Photo";

export default function GalleryCard({ item, text, t, onOpen }) {
  const title = text(item.title);
  const description = text(item.description);

  return (
    <button
      type="button"
      className={`geo-photo-card card-custom photo-${item.id}`}
      onClick={() => onOpen(item.id)}
      aria-label={`${t.open}: ${title}`}
    >
      <Photo
        src={item.imageUrl}
        alt={text(item.altText) || title}
        fallback={t.broken}
        loading="lazy"
        decoding="async"
        width="720"
        height="540"
      />

      <span className="geo-expand" aria-hidden="true">
        <Expand size={19} />
      </span>

      <span className="geo-photo-copy">
        <span className="geo-tag">{t[item.category] || item.category}</span>

        <strong>{title}</strong>

        {description && <span>{description}</span>}
      </span>
    </button>
  );
}
