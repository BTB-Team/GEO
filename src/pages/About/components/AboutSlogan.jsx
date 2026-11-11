import { BookOpen, Users, Sparkles } from "lucide-react";

export default function AboutSlogan() {
  return (
    <section className="geo-slogan" aria-labelledby="slogan-title">
      <div className="container-custom">
        <div className="geo-slogan-heading">
          <span className="geo-slogan-label">شعار سازمان ما</span>

          <h2 id="slogan-title" dir="ltr">
            Educate <span>•</span> Empower <span>•</span> Inspire
          </h2>

          <p className="geo-slogan-translation">
            آموزش بده، توانمند بساز و الهام ببخش.
          </p>

          <p className="geo-slogan-description">
            این شعار سه رکن اساسی فعالیت GEO را بیان می‌کند.
          </p>
        </div>

        <div className="geo-slogan-grid">
          <article className="geo-slogan-card geo-slogan-educate">
            <span className="geo-slogan-icon" aria-hidden="true">
              <BookOpen size={26} />
            </span>

            <span className="geo-slogan-english" lang="en">
              Educate
            </span>

            <h3>آموزش</h3>
            <p>فراهم‌سازی فرصت‌های یادگیری و دسترسی به دانش.</p>
          </article>

          <article className="geo-slogan-card geo-slogan-empower">
            <span className="geo-slogan-icon" aria-hidden="true">
              <Users size={26} />
            </span>

            <span className="geo-slogan-english" lang="en">
              Empower
            </span>

            <h3>توانمندسازی</h3>
            <p>تقویت توانایی‌ها، مهارت‌ها و اعتمادبه‌نفس دختران.</p>
          </article>

          <article className="geo-slogan-card geo-slogan-inspire">
            <span className="geo-slogan-icon" aria-hidden="true">
              <Sparkles size={26} />
            </span>

            <span className="geo-slogan-english" lang="en">
              Inspire
            </span>

            <h3>الهام‌بخشی</h3>
            <p>پرورش امید، خلاقیت، انگیزه و روحیه رهبری.</p>
          </article>
        </div>
      </div>
    </section>
  );
}