import { useEffect } from "react"
import AppRoutes from "./routes/AppRoutes"
import useLanguageStore from "./store/languageStore"

const App = () => {
  const language = useLanguageStore((state) => state.language)
  const direction = useLanguageStore((state) => state.direction)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = direction
  }, [language, direction])

  return <AppRoutes />
}

export default App