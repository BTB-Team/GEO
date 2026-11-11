import { Sparkles } from "lucide-react";

export default function AboutCommitment({ en, text, section }) {
  return (
    <section className="container-narrow section-padding gb-gallery-commitment">
      <Sparkles className="gb-commitment-icon" size={30} />

      <h2 className="heading-2">
        {en ? "Our commitment to girls’ futures" : "تعهد ما به آینده دختران"}
      </h2>

      <p className="body-large">
        {text(section("commitment").body).split("\n\n")[0]}
      </p>

      <blockquote className="body-large">
        {en
          ? "No girl should be prevented from realizing her potential because she lacks educational opportunities."
          : "«هیچ دختری نباید به دلیل محرومیت از فرصت‌های آموزشی، از شکوفایی استعدادهای خود بازبماند.»"}
      </blockquote>
    </section>
  );
}
