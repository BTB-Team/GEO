import { Link } from "react-router-dom";

export default function AboutApproach({ en, text, section, approaches }) {
  return (
    <section className="gb-approach section-padding">
      <div className="container-custom gb-two-column">
        <div>
          <span className="gb-kicker">
            {en ? "OUR EDUCATIONAL APPROACH" : "رویکرد آموزشی ما"}
          </span>

          <h2 className="heading-2">
            {en
              ? "The learner at the heart of every experience"
              : "یادگیرنده در مرکز هر تجربه"}
          </h2>

          <p className="body-base">{text(section("approach").body)}</p>

          <Link className="gb-white-button" to="/courses">
            {en
              ? "Explore our educational programs"
              : "آشنایی با برنامه‌های آموزشی"}
          </Link>
        </div>

        <div className="gb-approach-grid">
          {approaches.slice(0, 4).map((value, index) => {
            const raw = text(value);
            const split = raw.indexOf(":");

            return (
              <article key={index}>
                <span>{String(index + 1).padStart(2, "0")}</span>

                <h3 className="heading-4">{raw.slice(0, split)}</h3>

                <p className="body-small">{raw.slice(split + 1)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
