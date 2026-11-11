import { Eye, Target } from "lucide-react";

const purposeCards = [
  {
    id: "vision",
    Icon: Eye,
    fa: "جامعه‌ای که همه دختران فرصت دارند",
    en: "A society where every girl has opportunity",
  },
  {
    id: "mission",
    Icon: Target,
    fa: "یادگیری فراگیر و متناسب با نیازها",
    en: "Inclusive learning that responds to real needs",
  },
];

export default function AboutPurpose({ en, text, section }) {
  return (
    <section className="gb-soft section-padding">
      <div className="container-custom">
        <div className="gb-section-intro">
          <span className="gb-title-line" />

          <h2 className="heading-2">
            {en ? "Our vision and mission" : "چشم‌انداز و مأموریت ما"}
          </h2>

          <p className="body-base">
            {en
              ? "Working for an equal, bright future full of opportunity."
              : "برای ساختن آینده‌ای برابر، روشن و سرشار از فرصت تلاش می‌کنیم."}
          </p>
        </div>

        <div className="gb-two-column gb-purpose-grid">
          {purposeCards.map(({ id, Icon, fa, en: english }, index) => (
            <article className="card-custom gb-purpose" key={id}>
              <span className={`geo-icon geo-accent-${index}`}>
                <Icon size={25} />
              </span>

              <span className="gb-kicker">{text(section(id).title)}</span>

              <h3 className="heading-3">{en ? english : fa}</h3>

              <p className="body-base">{text(section(id).body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
