import { BookOpen, Users, Sparkles } from "lucide-react";
import useLanguageStore from "../../../store/languageStore";

export default function AboutSlogan() {
  const language = useLanguageStore((state) => state.language);
  const en = language === "en";

  const content = {
    label: en ? "OUR ORGANIZATION'S SLOGAN" : "شعار سازمان ما",
    translation: en
      ? "Educate, empower, and inspire."
      : "آموزش بده، توانمند بساز و الهام ببخش.",
    description: en
      ? "This slogan represents the three core pillars of GEO's work."
      : "این شعار سه رکن اساسی فعالیت GEO را بیان می‌کند.",
    cards: [
      {
        Icon: BookOpen,
        english: "Educate",
        title: en ? "Education" : "آموزش",
        description: en
          ? "Providing learning opportunities and access to knowledge."
          : "فراهم‌سازی فرصت‌های یادگیری و دسترسی به دانش.",
        className: "geo-slogan-educate",
      },
      {
        Icon: Users,
        english: "Empower",
        title: en ? "Empowerment" : "توانمندسازی",
        description: en
          ? "Strengthening girls' abilities, skills, and self-confidence."
          : "تقویت توانایی‌ها، مهارت‌ها و اعتمادبه‌نفس دختران.",
        className: "geo-slogan-empower",
      },
      {
        Icon: Sparkles,
        english: "Inspire",
        title: en ? "Inspiration" : "الهام‌بخشی",
        description: en
          ? "Nurturing hope, creativity, motivation, and leadership."
          : "پرورش امید، خلاقیت، انگیزه و روحیه رهبری.",
        className: "geo-slogan-inspire",
      },
    ],
  };

  return (
    <section className="geo-slogan" aria-labelledby="slogan-title">
      <div className="container-custom">
        <div className="geo-slogan-heading">
          <span className="geo-slogan-label">{content.label}</span>

          <h2 id="slogan-title" dir="ltr">
            Educate <span>•</span> Empower <span>•</span> Inspire
          </h2>

          <p className="geo-slogan-translation">{content.translation}</p>

          <p className="geo-slogan-description">{content.description}</p>
        </div>

        <div className="geo-slogan-grid">
          {content.cards.map(
            ({ Icon, english, title, description, className }) => (
              <article className={`geo-slogan-card ${className}`} key={english}>
                <span className="geo-slogan-icon" aria-hidden="true">
                  <Icon size={26} />
                </span>

                <span className="geo-slogan-english" lang="en">
                  {english}
                </span>

                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
