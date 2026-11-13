export default function GalleryCard({ item, text, onOpen }) {
  console.log("Gallery image:", item.imageUrl);
  return (
    <article className="gallery-card">
      <button
        type="button"
        className="gallery-card-button"
        onClick={() => onOpen(item.id)}
        aria-label={text(item.title)}
      >
        <img src={item.imageUrl} alt={text(item.altText)} loading="lazy" />

        <div className="gallery-card-content">
          <h3>{text(item.title)}</h3>
          <p>{text(item.description)}</p>
        </div>
      </button>
    </article>
  );
}
