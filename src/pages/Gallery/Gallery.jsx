import { Images } from "lucide-react";
import useLanguageStore from "../../store/languageStore";
import AcademyShell from "../../components/academy/AcademyShell";
import { categories, labels } from "./galleryLabels";
import useGallery from "./useGallery";

import GalleryCard from "./components/GalleryCard";
import Lightbox from "./components/Lightbox";


export default function Gallery() {
  const language = useLanguageStore((state) => state.language);
  const en = language === "en";
  const t = labels[en ? "en" : "fa"];

  const {
    category,
    selectedId,
    filteredItems,
    visible,
    hasMore,
    isLightboxOpen,
    loading,
    error,
    changeCategory,
    loadMore,
    openPhoto,
    closePhoto,
  } = useGallery();
  console.log("Gallery Debug:", {
    loading,
    error,
    filteredItems,
    visible,
  });

  // بررسی وضعیت اطلاعات گالری
  console.log("Gallery Debug:", {
    loading,
    error,
    filteredItems,
    visible,
  });

  function text(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[en ? "en" : "fa"] || value.en || value.fa || "";
  }

  return (
    <AcademyShell>
      <main className="gb-soft section-padding">
        <div className="container-custom">
          {/* Gallery Hero */}
          <div className="gallery-hero">
            <img
              src="/images/academy/school.webp"
              alt={
                en ? "Academy learning moments" : "لحظه‌های یادگیری در آکادمی"
              }
              className="gallery-hero-image"
            />

            <div className="gallery-hero-overlay">
              <span className="gallery-hero-label">
                {en ? "GIRLS EDUCATION ORGANIZATION" : "سازمان آموزش دختران"}
              </span>

              <h1>
                {en ? "Moments of Hope & Learning" : "قاب‌های امید و یادگیری"}
              </h1>

              <p>
                {en
                  ? "Every picture tells a story of learning, growth, and inspiration."
                  : "هر تصویر، داستانی از یادگیری، رشد و الهام‌بخشی را روایت می‌کند."}
              </p>
            </div>
          </div>

          {/* Gallery Categories */}
          <div className="flex flex-wrap justify-center gap-3 my-8">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => changeCategory(item)}
                className={`px-5 py-2 rounded-full border transition ${
                  category === item
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {t[item]}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && <p className="text-center body-base">Loading...</p>}

          {/* Error */}
          {error && (
            <p className="text-center text-red-600 body-base">
              Could not load gallery images. Please try again.
            </p>
          )}

          {/* Empty Gallery */}
          {!loading && !error && filteredItems.length === 0 && (
            <p className="text-center body-base">{t.empty}</p>
          )}

          {/* Gallery Images */}
          {!loading && !error && visible.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    text={text}
                    onOpen={openPhoto}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="px-7 py-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
                  >
                    {t.loadMore}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          items={filteredItems}
          initialId={selectedId}
          text={text}
          t={t}
          onClose={closePhoto}
        />
      )}
    </AcademyShell>
  );
}
