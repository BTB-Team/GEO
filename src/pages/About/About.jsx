import AcademyShell from "../../components/academy/AcademyShell";
import useAboutContent from "./useAboutContent";

import AboutHero from "./components/AboutHero";
import AboutSlogan from "./components/AboutSlogan";
import AboutStory from "./components/AboutStory";
import AboutPurpose from "./components/AboutPurpose";
import AboutValues from "./components/AboutValues";
import AboutApproach from "./components/AboutApproach";
import AboutCommitment from "./components/AboutCommitment";

import "../academy-pages.css";

export default function About() {
  const { en, text, section, values, approaches } = useAboutContent();

  return (
    <AcademyShell>
      <main>
        <AboutHero en={en} />

        <AboutSlogan />

        <AboutStory en={en} text={text} section={section} />

        <AboutPurpose en={en} text={text} section={section} />

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
