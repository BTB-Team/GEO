import { Eye, Target } from "lucide-react";
import useLanguageStore from "../../../store/languageStore";
import enTranslation from "../../../locales/en/translation";
import faTranslation from "../../../locales/fa/translation";

const purposeCards = [
  {
    id: "vision",
    Icon: Eye,
  },
  {
    id: "mission",
    Icon: Target,
  },
];

export default function AboutPurpose() {
  const language = useLanguageStore((state) => state.language);
  const en = language === "en";

  const translation = en ? enTranslation : faTranslation;
  const purpose = translation.aboutPage.introduction.purpose;

  return (
    <section className="gb-soft section-padding">
      <div className="container-custom">
        <div className="gb-section-intro">
          <span className="gb-title-line" />

          <h2 className="heading-2">{purpose.title}</h2>

          <p className="body-base">{purpose.description}</p>
        </div>

        <div className="gb-two-column gb-purpose-grid">
          {purposeCards.map(({ id, Icon }, index) => {
            const card = purpose[id];

            return (
              <article className="card-custom gb-purpose" key={id}>
                <span className={`geo-icon geo-accent-${index}`}>
                  <Icon size={25} />
                </span>

                <span className="gb-kicker">{card.title}</span>

                <h3 className="heading-3">{card.heading}</h3>

                <p className="body-base">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
