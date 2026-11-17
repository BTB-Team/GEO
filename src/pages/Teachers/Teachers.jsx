import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";

function TeacherCard({ teacher, language, t, courses }) {
  const teacherCourses = courses.filter((course) =>
    teacher.courseIds.includes(course.id),
  );
  return (
    <article className="card-custom h-full border-t-4 border-t-brand-blue p-5 shadow-[0_10px_24px_-8px_#0674c326] transition-shadow hover:shadow-[0_16px_32px_-8px_#0674c34d]">
      <div className="mx-auto mb-4 grid size-36 place-items-center overflow-hidden rounded-full bg-surface-secondary">
        {teacher.photo ? (
          <img
            src={teacher.photo}
            alt=""
            className="size-full object-contain"
          />
        ) : (
          <UserRound className="size-10 text-brand-blue" aria-hidden="true" />
        )}
      </div>
      <h2 className="heading-4 text-center text-brand-blue">
        {teacher.name[language]}
      </h2>
      <p className="mt-2 text-text-secondary">{teacher.education[language]}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {teacher.specialties.map((specialty) => (
          <li
            key={specialty.en}
            className="rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-sm font-medium text-text-primary"
          >
            {specialty[language]}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm text-text-secondary">
        {t.teacherExperience}: {teacher.experienceYears}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-text-primary">
        {teacher.bio[language]}
      </p>

      <ul className="mt-3 list-disc ps-5 text-sm text-text-primary marker:text-brand-blue">
        {teacherCourses.map((course) => (
          <li key={course.id}>{course.title[language]}</li>
        ))}
      </ul>
    </article>
  );
}

export default function TeachersPage() {
  const { t, language } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeachers() {
      try {
        const [teachersResponse, coursesResponse] = await Promise.all([
          fetch("http://localhost:5000/teachers", {
            signal: controller.signal,
          }),
          fetch("http://localhost:5000/courses", { signal: controller.signal }),
        ]);

        if (!teachersResponse.ok || !coursesResponse.ok) {
          throw new Error("Could not load teachers or courses");
        }

        const teachersData = await teachersResponse.json();
        const coursesData = await coursesResponse.json();

        setTeachers(teachersData);
        setCourses(coursesData);
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Could not load teachers:", error);
          setStatus("error");
        }
      }
    }

    loadTeachers();
    return () => controller.abort();
  }, []);

  const availableCourses = courses.filter((course) =>
    teachers.some((teacher) => teacher.courseIds.includes(course.id)),
  );

  const visibleTeachers = teachers.filter(
    (teacher) =>
      selectedCourseId === "" || teacher.courseIds.includes(selectedCourseId),
  );

  return (
    <main className="container-custom section-padding">
      <header className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-brand-blue to-text-primary px-6 py-10 text-white sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-12 -top-20 -z-10 size-64 rounded-full border-[32px] border-white/10"
        />

        <h1 className="heading-1">{t.teachers}</h1>

        <p className="body-base mt-3 max-w-xl text-white/90">
          {t.teachersIntro}
        </p>
      </header>
      {status === "loading" && <p>{t.teachersLoading}</p>}
      {status === "error" && <p role="alert">{t.teachersError}</p>}
      {status === "success" && teachers.length === 0 && (
        <p>{t.teachersEmpty}</p>
      )}

      {status === "success" && availableCourses.length > 0 && (
        <label className="mt-6 block max-w-sm">
          <span className="mb-2 block text-sm font-semibold text-text-primary">
            {t.teachersCourseFilter}
          </span>

          <select
            className="input-custom"
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
          >
            <option value="">{t.teachersAllCourses}</option>

            {availableCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title[language]}
              </option>
            ))}
          </select>
        </label>
      )}

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visibleTeachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard
              teacher={teacher}
              language={language}
              t={t}
              courses={courses}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
