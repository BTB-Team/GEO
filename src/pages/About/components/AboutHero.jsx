import { ArrowLeft, Users } from "lucide-react";
import useLanguageStore from "../../../store/languageStore";
import enTranslation from "../../../locales/en/translation";
import faTranslation from "../../../locales/fa/translation";

export default function AboutHero() {
  const language = useLanguageStore((state) => state.language);

  const t =
    language === "en"
      ? enTranslation.aboutPage.hero
      : faTranslation.aboutPage.hero;

  return (
    <section className="gb-hero section-padding">
      <div className="container-custom gb-two-column">
        <div className="gb-hero-copy">
          <span className="gb-kicker">
            <i />
            {t.kicker}
          </span>

          <h1 className="heading-1">
            {t.title}
            <br />
            <span>{t.titleHighlight}</span>
          </h1>

          <p className="body-large">{t.description}</p>

          <div className="geo-actions">
            <a className="btn-primary" href="#our-story">
              {t.button}
              <ArrowLeft size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="gb-hero-photo">
          <img
            src="/images/academy/school.webp"
            alt={t.imageAlt}
            width="600"
            height="560"
          />

          <div className="gb-photo-badge gb-badge-bottom">
            <span className="geo-icon geo-accent-1">
              <Users size={22} />
            </span>

            <div>
              <strong>{t.badgeTitle}</strong>
              <small>{t.badgeText}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
