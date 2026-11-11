import { BookOpen, Check } from "lucide-react";

export default function AboutStory({ en, text, section }) {
  const paragraphs = text(section("introduction").body).split("\n\n");

  const checks = en
    ? [
        "Inclusive, quality education",
        "Personal and social growth",
        "Online and in-person learning",
        "Readiness for future opportunities",
      ]
    : [
        "آموزش باکیفیت و فراگیر",
        "رشد فردی و اجتماعی",
        "دسترسی حضوری و آنلاین",
        "آمادگی برای فرصت‌های آینده",
      ];

  return (
    <section
      className="container-custom section-padding gb-story"
      id="our-story"
    >
      <aside className="card-custom gb-history">
        <span className="gb-year">2026</span>

        <h2 className="heading-3">
          {en ? "One belief, one beginning" : "یک باور، یک آغاز"}
        </h2>

        <p className="body-base">{paragraphs[0]}</p>

        <div className="gb-history-note">
          <span className="geo-icon geo-accent-1">
            <BookOpen size={22} />
          </span>

          <div>
            <strong>{en ? "Beyond a certificate" : "فراتر از مدرک"}</strong>

            <small>
              {en
                ? "Thinking, skills, and confidence"
                : "پرورش فکر، مهارت و اعتمادبه‌نفس"}
            </small>
          </div>
        </div>
      </aside>

      <div>
        <span className="gb-kicker">{en ? "ABOUT GEO" : "درباره GEO"}</span>

        <h2 className="heading-2 gb-section-heading">
          {en
            ? "Every girl deserves an opportunity to shine"
            : "هر دختر، شایسته فرصتی برای درخشیدن است"}
        </h2>

        <p className="body-base">{paragraphs[1]}</p>

        <ul className="gb-checks">
          {checks.map((item) => (
            <li key={item}>
              <Check size={17} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
