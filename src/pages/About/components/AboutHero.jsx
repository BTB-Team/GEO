import { ArrowLeft, Users } from "lucide-react";

export default function AboutHero({ en }) {
  return (
    <section className="gb-hero section-padding">
      <div className="container-custom gb-two-column">
        <div className="gb-hero-copy">
          <span className="gb-kicker">
            <i />
            {en ? "OUR STORY. OUR VISION." : "داستان ما، چشم‌انداز ما"}
          </span>

          <h1 className="heading-1">
            {en ? "Education is the beginning" : "آموزش، آغازِ"}
            <br />
            <span>{en ? "of a brighter tomorrow." : "ساختن فرداست."}</span>
          </h1>

          <p className="body-large">
            {en
              ? "GEO is an education and development organization working to expand learning opportunities, nurture talent, and empower girls."
              : "سازمان آموزش دختران نهادی آموزشی و توسعه‌محور است که برای گسترش فرصت‌های یادگیری، رشد استعدادها و توانمندسازی دختران فعالیت می‌کند."}
          </p>

          <div className="geo-actions">
            <a className="btn-primary" href="#our-story">
              {en ? "Discover our story" : "دیدن قصه‌های ما"}
              <ArrowLeft size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="gb-hero-photo">
          <img
            src="/images/academy/school.jpg"
            alt="صنف آموزشی دختران"
            width="600"
            height="560"
          />

          <div className="gb-photo-badge gb-badge-bottom">
            <span className="geo-icon geo-accent-1">
              <Users size={22} />
            </span>

            <div>
              <strong>{en ? "Hundreds" : "صدها"}</strong>
              <small>{en ? "Online learners" : "دانش‌آموز آنلاین"}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
