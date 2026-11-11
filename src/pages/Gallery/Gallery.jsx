import { Images } from "lucide-react";
import useLanguageStore from "../../store/languageStore";
import AcademyShell from "../../components/academy/AcademyShell";
import galleryItems from "../../data/gallery.json";

import { categories, labels } from "./galleryLabels";
import useGallery from "./useGallery";
import GalleryCard from "./components/GalleryCard";
import Lightbox from "./components/Lightbox";

import "../academy-pages.css";

export default function Gallery() {
  const language = useLanguageStore((state) => state.language);
  const lang = language === "en" ? "en" : "fa";
  const en = lang === "en";
  const t = labels[lang];

  const text = (value) =>
    typeof value === "string" ? value : value?.[lang] || value?.fa || "";

  const {
    category,
    selectedId,
    filteredItems,
    visible,
    hasMore,
    isLightboxOpen,
    changeCategory,
    loadMore,
    openPhoto,
    closePhoto,
  } = useGallery(galleryItems);

  const progressText = en
    ? `${visible.length} of ${filteredItems.length} photos`
    : `${visible.length} از ${filteredItems.length} عکس`;

  return (
    <AcademyShell>
      <main>
        <header className="gallery-hero">
          <span className="gb-kicker">
            {en ? "Moments of hope and learning" : "قاب‌هایی از امید و یادگیری"}
          </span>

          <h1>
            {en ? (
              <>
                Our <span>moments gallery</span>
              </>
            ) : (
              <>
                گالری <span>لحظه‌های ما</span>
              </>
            )}
          </h1>

          <p>
            {en
              ? "Every picture tells a story of learning, talent, and a brighter future."
              : "هر تصویر، روایتی از تلاش، لبخند و یک گام بزرگ آموزشی. توانمندی‌ها و لحظات الهام‌بخش دختران را در اینجا ببینید."}
          </p>
        </header>

        <section className="geo-gallery container-custom" aria-label={t.title}>
          <div
            className="geo-filters"
            role="group"
            aria-label={en ? "Photo categories" : "دسته‌بندی تصاویر"}
          >
            {categories.map((key) => (
              <button
                type="button"
                key={key}
                aria-pressed={category === key}
                onClick={() => changeCategory(key)}
              >
                {t[key]}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {progressText}
          </p>

          {visible.length === 0 ? (
            <div className="geo-state">
              <Images size={32} aria-hidden="true" />
              <h2 className="heading-3">{t.empty}</h2>
            </div>
          ) : (
            <div className="geo-grid" id="gallery-photos">
              {visible.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  text={text}
                  t={t}
                  onOpen={openPhoto}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="geo-load-more">
              <button
                type="button"
                onClick={loadMore}
                aria-controls="gallery-photos"
              >
                {t.loadMore}
              </button>

              <p>{progressText}</p>
            </div>
          )}

          <div className="gallery-more">
            <Images size={28} aria-hidden="true" />
            <h2>{t.moreStories}</h2>

            <p>
              {en
                ? "New learning activities and events will bring more stories to our gallery."
                : "گالری ما همراه با فعالیت‌های تازه دختران و رویدادهای آموزشی به‌روز می‌شود."}
            </p>
          </div>
        </section>

        {isLightboxOpen && (
          <Lightbox
            key={`${category}-${selectedId}`}
            items={visible}
            initialId={selectedId}
            text={text}
            t={t}
            onClose={closePhoto}
          />
        )}
      </main>
    </AcademyShell>
  );
}
