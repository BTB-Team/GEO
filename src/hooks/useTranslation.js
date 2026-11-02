import useLanguageStore from "../store/languageStore"
import translations from "../locales"

const useTranslation = () => {
  const language = useLanguageStore((state) => state.language)

  const t = translations[language]

  return { t, language }
}

export default useTranslation