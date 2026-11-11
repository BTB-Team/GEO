import { useState } from "react";
import { PAGE_SIZE } from "./galleryLabels";

export default function useGallery(galleryItems) {
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const items = Array.isArray(galleryItems) ? galleryItems : [];

  const filteredItems =
    category === "all"
      ? items
      : items.filter((item) => item.category === category);

  const visible = filteredItems.slice(0, visibleCount);
  const hasMore = visible.length < filteredItems.length;

  const isLightboxOpen =
    selectedId !== null && visible.some((item) => item.id === selectedId);

  function changeCategory(nextCategory) {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
    setSelectedId(null);
  }

  function loadMore() {
    setVisibleCount((count) => count + PAGE_SIZE);
  }

  function closePhoto() {
    setSelectedId(null);
  }

  return {
    category,
    selectedId,
    filteredItems,
    visible,
    hasMore,
    isLightboxOpen,
    changeCategory,
    loadMore,
    openPhoto: setSelectedId,
    closePhoto,
  };
}
