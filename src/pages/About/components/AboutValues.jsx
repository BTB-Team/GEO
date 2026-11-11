import {
  Globe,
  Sparkles,
  HandHeart,
  Heart,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";

const valueIcons = [Globe, Sparkles, HandHeart, Heart, ShieldCheck, Lightbulb];

export default function AboutValues({ en, text, values }) {
  return (
    <section className="container-custom section-padding">
      <div className="gb-section-intro">
        <span className="gb-kicker">{en ? "OUR COMPASS" : "قطب‌نمای ما"}</span>

        <h2 className="heading-2">
          {en
            ? "Values that light our way"
            : "ارزش‌هایی که راه ما را روشن می‌کنند"}
        </h2>
      </div>

      <div className="gb-value-grid">
        {values.slice(0, 6).map((value, index) => {
          const Icon = valueIcons[index];
          const raw = text(value);
          const split = raw.indexOf(":");

          return (
            <article className="card-custom gb-value" key={index}>
              <span className={`geo-icon geo-accent-${index % 3}`}>
                <Icon size={23} />
              </span>

              <h3 className="heading-4">{raw.slice(0, split)}</h3>

              <p className="body-small">{raw.slice(split + 1)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
