import useLanguageStore from "../../store/languageStore";
import content from "../../data/aboutPage.json";

export default function useAboutContent() {
  const en = useLanguageStore((state) => state.language) === "en";

  const text = (value) => value?.[en ? "en" : "fa"] || "";

  const section = (id) => content.sections.find((item) => item.id === id);

  return {
    en,
    text,
    section,
    values: section("values").items,
    approaches: section("approach").items,
  };
}
