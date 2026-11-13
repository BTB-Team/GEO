import { BookOpen, Check } from "lucide-react";
import useLanguageStore from "../../../store/languageStore";
import enTranslation from "../../../locales/en/translation";
import faTranslation from "../../../locales/fa/translation";

export default function AboutStory() {
  const language = useLanguageStore((state) => state.language);

  const t =
    language === "en" ? enTranslation.aboutPage : faTranslation.aboutPage;

  const paragraphs = t.introduction.body.split("\n\n");

  return (
    <section
      className="container-custom section-padding gb-story"
      id="our-story"
    >
      <aside className="card-custom gb-history">
        <span className="gb-year">{t.story.year}</span>

        <h2 className="heading-3">{t.story.historyTitle}</h2>

        <p className="body-base">{t.story.historyText}</p>

        <div className="gb-history-note">
          <span className="geo-icon geo-accent-1">
            <BookOpen size={22} />
          </span>
          <div>
            <strong>{t.story.historyNoteTitle}</strong>
            <small>{t.story.historyNoteText}</small>
          </div>
        </div>
      </aside>
      <div>
        <span className="gb-kicker">{t.story.kicker}</span>
        <h2 className="heading-2 gb-section-heading">{t.story.heading}</h2>
        <p className="body-base">{t.story.historyNoteText}</p>
        <ul className="gb-checks">
          {t.story.checks.map((item, index) => (
            <li key={index}>
              <Check size={17} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
