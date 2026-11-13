import AcademyShell from "../../components/academy/AcademyShell";
import useAboutContent from "./useAboutContent";

import useLanguageStore from "../../store/languageStore";
import enTranslation from "../../locales/en/translation";
import faTranslation from "../../locales/fa/translation";

import AboutHero from "./components/AboutHero";
import AboutSlogan from "./components/AboutSlogan";
import AboutStory from "./components/AboutStory";
import AboutPurpose from "./components/AboutPurpose";
import AboutValues from "./components/AboutValues";
import AboutApproach from "./components/AboutApproach";
import AboutCommitment from "./components/AboutCommitment";



export default function About() {
  const language = useLanguageStore((state) => state.language);

  const t = language === "en" ? enTranslation : faTranslation;
  const en = language === "en";

  const { text, section, values, approaches } = useAboutContent();

  return (
    <AcademyShell>
      <main>
        <AboutHero />

        <AboutSlogan />

        <AboutStory />

        <AboutPurpose />

        <AboutValues en={en} text={text} values={values} />

        <AboutApproach
          en={en}
          text={text}
          section={section}
          approaches={approaches}
        />

        <AboutCommitment en={en} text={text} section={section} />
      </main>
    </AcademyShell>
  );
}
