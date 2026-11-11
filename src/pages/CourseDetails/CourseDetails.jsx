import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useLanguageStore } from "../../store/languageStore";

import enTranslation from "../../locales/en/translation";
import faTranslation from "../../locales/fa/translation";

import courses from "../../data/coursesData";

import {
  Clock,
  CalendarDays,
  UserRound,
  DollarSign,
  Heart,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { language } = useLanguageStore();

  const isDari = language === "fa";

  const labels = isDari ? faTranslation : enTranslation;

  const [saved, setSaved] = useState(false);

  // Find selected course
  const course = courses.find((item) => item.id === courseId);

  // If course does not exist
  if (!course) {
    return (
      <div
        dir={isDari ? "rtl" : "ltr"}
        className="mx-auto max-w-7xl p-8 text-center"
      >
        <h2 className="mb-4 text-2xl font-bold text-slate-800">
          {labels.noCoursesFound}
        </h2>

        <button
          onClick={() => navigate("/courses")}
          className="rounded-xl bg-brand-blue px-6 py-3 font-semibold text-white"
        >
          {labels.courses}
        </button>
      </div>
    );
  }

  // Get translated course information
  const courseTitle = labels[course.titleKey];
  const courseDuration = labels[course.durationKey];
  const courseInstructor = labels[course.instructorKey];
  const courseDeadline = labels[course.deadlineKey];
  const courseDescription = labels[course.descriptionKey];

  const level = {
    Beginner: labels.beginner,
    Intermediate: labels.intermediate,
    Advanced: labels.advanced,
  };

  return (
    <main
      dir={isDari ? "rtl" : "ltr"}
      className="min-h-screen"
    >
      <div className="mx-auto max-w-7xl">

        {/* Course Header */}

        <header
          className="sticky top-0 z-50 mb-8 flex items-center gap-4 border-b border-blue-100 bg-[#EFF8FF]/95 px-5 py-3 shadow-sm backdrop-blur-md md:px-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition hover:bg-blue-100"
            aria-label="Go back"
          >
            <ArrowLeft
              size={21}
              className={isDari ? "rotate-180" : ""}
            />
          </button>

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-500">
              {labels.course}
            </span>

            <h1 className="truncate text-lg font-bold text-slate-900 md:text-xl">
              {courseTitle}
            </h1>
          </div>
        </header>

        {/* Main Layout */}

        <div
          dir="ltr"
          className="grid grid-cols-1 items-start gap-6 px-4 pb-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]"
        >

          {/* Main Content */}

          <section dir={isDari ? "rtl" : "ltr"}>

            {/* Course Image */}

            <div className="mb-6 w-full overflow-hidden rounded-2xl shadow-sm">
              <img
                src={course.image}
                alt={courseTitle}
                className="h-48 w-full object-cover md:h-64"
              />
            </div>

            {/* About Course */}

            <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm md:p-5">
              <h2 className="mb-4 text-2xl font-bold text-slate-800">
                {labels.aboutCourse}
              </h2>

              <p className="leading-8 text-slate-600">
                {courseDescription}
              </p>
            </div>

            {/* What You'll Learn */}

            <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm md:p-5">
              <h2 className="mb-5 text-2xl font-bold text-slate-800">
                {labels.whatYouLearn}
              </h2>

              {course.learningPoints.map((point) => (
                <div
                  key={point}
                  className="mb-4 flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-brand-green"
                  />

                  <span className="text-slate-600">
                    {labels[point]}
                  </span>
                </div>
              ))}
            </div>

            {/* Course Requirements */}

            <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm md:p-5">
              <h2 className="mb-4 text-2xl font-bold text-slate-800">
                {labels.courseRequirements}
              </h2>

              <p className="leading-8 text-slate-600">
                {labels[course.requirements]}
              </p>
            </div>

            {/* Course Curriculum */}

            <div className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
              <h2 className="mb-5 text-2xl font-bold text-slate-800">
                {labels.courseCurriculum}
              </h2>

              {course.curriculum.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-0"
                >
                  <BookOpen
                    size={20}
                    className="shrink-0 text-brand-blue"
                  />

                  <span className="text-slate-700">
                    {index + 1}. {labels[item]}
                  </span>
                </div>
              ))}
            </div>

          </section>

          {/* Right Sidebar */}

          <aside
            dir={isDari ? "rtl" : "ltr"}
            className="sticky top-24 h-fit self-start"
          >
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-md">

              {/* Course Title and Level */}

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold text-slate-800">
                  {courseTitle}
                </h3>

                <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-brand-blue">
                  {level[course.level]}
                </span>
              </div>

              {/* Registration Deadline */}

              <div className="mb-6 flex items-start gap-3">
                <CalendarDays
                  className="shrink-0 text-brand-blue"
                  size={21}
                />

                <div>
                  <p className="mb-1 text-sm text-slate-500">
                    {labels.registrationDeadline}
                  </p>

                  <p className="font-semibold text-slate-800">
                    {courseDeadline}
                  </p>
                </div>
              </div>

              {/* Instructor */}

              <div className="mb-6 flex items-start gap-3">
                <UserRound
                  className="shrink-0 text-brand-blue"
                  size={21}
                />

                <div>
                  <p className="mb-1 text-sm text-slate-500">
                    {labels.instructor}
                  </p>

                  <p className="font-semibold text-slate-800">
                    {courseInstructor}
                  </p>
                </div>
              </div>

              {/* Duration */}

              <div className="mb-6 flex items-start gap-3">
                <Clock
                  className="shrink-0 text-brand-blue"
                  size={21}
                />

                <div>
                  <p className="mb-1 text-sm text-slate-500">
                    {labels.duration}
                  </p>

                  <p className="font-semibold text-slate-800">
                    {courseDuration}
                  </p>
                </div>
              </div>

              {/* Monthly Fee */}

              <div className="mb-7 flex items-start gap-3">
                <DollarSign
                  className="shrink-0 text-brand-blue"
                  size={21}
                />

                <div>
                  <p className="mb-1 text-sm text-slate-500">
                    {labels.monthlyFee}
                  </p>

                  <p className="text-xl font-bold text-brand-green">
                    {course.price}
                  </p>
                </div>
              </div>

              {/* Enroll Button */}

              <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green py-4 font-bold text-white transition hover:brightness-95">
                <GraduationCap size={20} />

                {labels.enrollNow}
              </button>

              {/* Save Button */}

              <button
                onClick={() => setSaved(!saved)}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold transition ${
                  saved
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Heart
                  size={19}
                  className={saved ? "fill-red-500" : ""}
                />

                {saved
                  ? labels.courseSaved
                  : labels.saveCourse}
              </button>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}