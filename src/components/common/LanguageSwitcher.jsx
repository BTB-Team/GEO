import useLanguageStore from "../../store/languageStore"

const LanguageSwitcher = () => {
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fa" : "en")
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
    >
      {language === "en" ? "فارسی" : "English"}
    </button>
  )
}

export default LanguageSwitcher