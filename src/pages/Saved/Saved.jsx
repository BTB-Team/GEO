import { useState } from "react";

import {
  Heart,
  Trash2,
  Clock,
  DollarSign,
  Search,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLanguageStore } from "../../store/languageStore";

import enTranslation from "../../locales/en/translation";
import faTranslation from "../../locales/fa/translation";

import courses from "../../data/coursesData";

export default function SavedPage() {
  const navigate = useNavigate();

  const { language } = useLanguageStore();

  const isDari = language === "fa";

  const labels = isDari ? faTranslation : enTranslation;

  // Saved Courses
  const [savedIds, setSavedIds] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("savedCourses") || "[]"
    );

    return saved.map((item) =>
      typeof item === "string" ? item : item.id
    );
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Get complete course information
  const savedCourses = courses.filter((course) =>
    savedIds.includes(course.id)
  );

  // Remove Course
  const removeCourse = (id) => {
    const updatedIds = savedIds.filter(
      (courseId) => courseId !== id
    );

    setSavedIds(updatedIds);

    localStorage.setItem(
      "savedCourses",
      JSON.stringify(updatedIds)
    );
  };

  // Categories
  const categories = [
    { id: "all", label: labels.savedCoursesAll },
    { id: "academic", label: labels.academic },
    { id: "examPreparation", label: labels.examPreparation },
    { id: "languages", label: labels.languages },
    { id: "technology", label: labels.technology },
  ];

  // Filter Courses
  const filteredCourses = savedCourses.filter((course) => {
    const matchesCategory =
      category === "all" || course.category === category;

    const courseTitle = labels[course.titleKey] || "";

    const matchesSearch = courseTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort Courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const titleA = labels[a.titleKey] || "";
    const titleB = labels[b.titleKey] || "";

    if (sortBy === "name-asc") {
      return titleA.localeCompare(titleB);
    }

    if (sortBy === "name-desc") {
      return titleB.localeCompare(titleA);
    }

    return 0;
  });

  // Level Colors
  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-orange-100 text-orange-700",
    Advanced: "bg-purple-100 text-purple-700",
  };

  // Level Translation
  const levelLabels = {
    Beginner: labels.savedCoursesBeginner,
    Intermediate: labels.savedCoursesIntermediate,
    Advanced: labels.savedCoursesAdvanced,
  };

  return (
    <main
      dir={isDari ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 py-12"
    >
      <div className="container-custom">

        {/* Header */}

        <header className="mb-12 rounded-3xl bg-gradient-to-r from-blue-50 to-sky-100 px-6 py-12 text-center">

          <span className="mb-5 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            {labels.academy}
          </span>

          <div className="mb-3 flex justify-center">
            <Heart size={32} className="text-red-500" />
          </div>

          <h1 className="heading-1 mb-4 text-slate-900">
            {labels.savedCoursesTitle}
          </h1>

          <p className="text-slate-500">
            {labels.savedCoursesSubtitle}
          </p>

        </header>

       {/* Search and Filters */}

<section className="mb-10">

  <div
    dir="ltr"
    className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"
  >

    {/* Search Bar */}

    <div className="relative w-full md:w-[360px]">

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={labels.savedCoursesSearch}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm outline-none transition focus:border-brand-blue"
        style={{
          paddingLeft: isDari ? "2.75rem" : "1rem",
          paddingRight: isDari ? "1rem" : "2.75rem",
          textAlign: isDari ? "right" : "left",
        }}
      />

      <Search
        size={18}
        className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
          isDari ? "left-4" : "right-4"
        }`}
      />

    </div>

    {/* Dropdowns */}

    <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">

      {/* Category */}

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
      >
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>

      {/* Sort */}

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-brand-blue"
      >
        <option value="popular">
          {labels.savedCoursesPopular}
        </option>

        <option value="name-asc">
          {labels.savedCoursesAZ}
        </option>

        <option value="name-desc">
          {labels.savedCoursesZA}
        </option>
      </select>

      {/* Courses Count */}

      <div className="whitespace-nowrap rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-brand-blue">
        {isDari
          ? `${sortedCourses.length.toLocaleString("fa-IR")} ${labels.savedCoursesCount}`
          : `${sortedCourses.length} ${labels.savedCoursesCount}`}
      </div>

    </div>

  </div>

</section>

        {/* Empty State */}

        {savedCourses.length === 0 ? (

          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">

            <Heart
              size={50}
              className="mx-auto mb-5 text-slate-300"
            />

            <p className="text-lg text-slate-500">
              {labels.savedCoursesEmpty}
            </p>

          </div>

        ) : sortedCourses.length === 0 ? (

          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">

            <Search
              size={45}
              className="mx-auto mb-5 text-slate-300"
            />

            <p className="text-lg text-slate-500">
              {labels.savedCoursesNoResults}
            </p>

          </div>

        ) : (

          /* Course Cards */

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">

            {sortedCourses.map((course) => (

              <article
                key={course.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}

                <div className="relative h-52 w-full overflow-hidden bg-slate-100">

                  <img
                    src={course.image}
                    alt={labels[course.titleKey]}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Level Badge */}

                  <span
                    className={`absolute top-4 ${
                      isDari ? "right-4" : "left-4"
                    } rounded-full px-4 py-2 text-xs font-bold ${
                      levelColors[course.level] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {levelLabels[course.level]}
                  </span>

                  {/* Saved Heart */}

                  <button
                    onClick={() => removeCourse(course.id)}
                    aria-label={labels.savedCoursesRemove}
                    className={`absolute top-4 ${
  isDari ? "left-4" : "right-4"
} flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-red-300`}>
                    <Heart
                      size={20}
                      fill="currentColor"
                      className="text-red-500"
                    />
                  </button>

                </div>

                {/* Card Content */}

                <div className="p-5">

                  <h2 className="mb-3 text-xl font-bold text-slate-800">
                    {labels[course.titleKey]}
                  </h2>

                  <p className="mb-5 line-clamp-2 text-sm leading-7 text-slate-500">
                    {labels[course.descriptionKey]}
                  </p>

                  {/* Duration */}

                  <div className="mb-4 flex items-center justify-between text-sm">

                    <span className="flex items-center gap-2 text-slate-500">
                      <Clock size={17} />
                      {labels.savedCoursesDuration}
                    </span>

                    <span className="font-semibold text-slate-700">
                      {labels[course.durationKey]}
                    </span>

                  </div>

                  {/* Fee */}

                  <div className="mb-5 flex items-center justify-between text-sm">

                    <span className="flex items-center gap-2 text-slate-500">
                      <DollarSign size={17} />
                      {labels.savedCoursesFee}
                    </span>

                    <span className="font-bold text-brand-green">
                      {course.price}
                    </span>

                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(`/courses/${course.id}`)
                      }
                      className="btn-primary flex flex-1 items-center justify-center gap-2"
                    >
                      {labels.savedCoursesDetails}

                      <ArrowRight
                        size={17}
                        className={isDari ? "rotate-180" : ""}
                      />
                    </button>

                    <button
                      onClick={() => removeCourse(course.id)}
                      aria-label={labels.savedCoursesRemove}
                      className="flex items-center justify-center rounded-xl border border-red-200 px-4 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              </article>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}