import useLanguageStore from "../../store/languageStore";

export default function AcademyShell({ children }) {
  const language = useLanguageStore((state) => state.language);
  const en = language === "en";

  return (
    <div className="geo-page" dir={en ? "ltr" : "rtl"} lang={en ? "en" : "fa"}>
      {children}
    </div>
  );
}
