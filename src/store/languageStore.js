import { create } from "zustand"
import { persist } from "zustand/middleware"

const useLanguageStore = create(
  persist(
    (set) => ({
      language: "en",
      direction: "ltr",

      setLanguage: (language) =>
        set({
          language,
          direction: language === "fa" ? "rtl" : "ltr",
        }),
    }),
    {
      name: "academy-language",
    }
  )
)

export default useLanguageStore