import { useState } from "react";

import {
  Search,
  Clock,
  BookOpen,
  ArrowRight,
  Heart,
  DollarSign,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../../store/languageStore";

import enTranslation from "../../locales/en/translation";
import faTranslation from "../../locales/fa/translation";

import courses from "../../data/coursesData";

export default function CoursesPage() {
  const navigate = useNavigate();

  const { language } = useLanguageStore();

  const isDari = language === "fa";

  const labels = isDari ? faTranslation : enTranslation;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Saved Course IDs
  const [favorites, setFavorites] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("savedCourses") || "[]"
    );

    return saved.map((course) =>
      typeof course === "string" ? course : course.id
    );
  });

  // Categories
  const categories = [
    { id: "all", label: labels.all },
    { id: "academic", label: labels.academic },
    { id: "examPreparation", label: labels.examPreparation },
    { id: "languages", label: labels.languages },
    { id: "technology", label: labels.technology },
  ];

  // Filter Courses
  const filteredCourses = courses.filter((course) => {
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

  // Toggle Favorite
  const toggleFavorite = (id) => {
    const alreadySaved = favorites.includes(id);

    const updatedFavorites = alreadySaved
      ? favorites.filter((courseId) => courseId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "savedCourses",
      JSON.stringify(updatedFavorites)
    );
  };

  // Level Colors
  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-orange-100 text-orange-700",
    Advanced: "bg-purple-100 text-purple-700",
  };

  return (
    <main
      dir={isDari ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 py-12"
    >
      <div className="container-custom">

        {/* Page Header */}

        <header className="mb-12 rounded-3xl bg-[#EFF8FF] px-6 py-12 text-center">

          <span className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-brand-blue">
            {labels.academy}
          </span>

          <h1 className="heading-1 mb-4 text-slate-900">
            {labels.coursesTitle}
          </h1>

          <p className="body-large mx-auto max-w-2xl text-slate-500">
            {labels.coursesDescription}
          </p>

        </header>

        {/* Search and Filters Toolbar */}

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
              placeholder={labels.search}
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
                {labels.sortPopular}
              </option>

              <option value="name-asc">
                {labels.sortAZ}
              </option>

              <option value="name-desc">
                {labels.sortZA}
              </option>
            </select>

            {/* Courses Count */}

            <div className="whitespace-nowrap rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-brand-blue">
              {isDari
                ? `${filteredCourses.length.toLocaleString("fa-IR")} ${labels.coursesFound}`
                : `${filteredCourses.length} ${labels.coursesFound}`}
            </div>

          </div>
        </div>

        {/* Course Cards */}

        {sortedCourses.length > 0 ? (

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {sortedCourses.map((course) => (

              <article
                key={course.id}
                className="group card-custom overflow-hidden bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Course Image */}

                <div className="relative h-52 overflow-hidden bg-slate-200">

                  <img
                    src={course.image}
                    alt={labels[course.titleKey]}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Level Badge */}

                  <span
                    className={`absolute top-4 ${
                      isDari ? "right-4" : "left-4"
                    } rounded-full px-4 py-2 text-xs font-bold shadow-sm ${
                      levelColors[course.level]
                    }`}
                  >
                    {labels.levels[course.level]}
                  </span>

                  {/* Favorite Button */}

                  <button
                    type="button"
                    onClick={() => toggleFavorite(course.id)}
                    aria-label={labels.saveCourse}
                    className={`absolute top-4 ${
                      isDari ? "left-4" : "right-4"
                    } flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-red-300`}
                  >
                    <Heart
                      size={20}
                      className={
                        favorites.includes(course.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-500"
                      }
                    />
                  </button>

                </div>

                {/* Course Information */}

                <div className="flex flex-col p-6">

                  <h3 className="heading-4 mb-3 text-slate-900 transition group-hover:text-brand-blue">
                    {labels[course.titleKey]}
                  </h3>

                  <p className="mb-6 min-h-12 text-sm leading-7 text-slate-500">
                    {labels[course.descriptionKey]}
                  </p>

                  {/* Duration */}

                  <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={18} className="text-brand-blue" />
                      <span>{labels.duration}</span>
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {labels[course.durationKey]}
                    </span>

                  </div>

                  {/* Monthly Fee */}

                  <div className="mb-6 flex items-center justify-between">

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <DollarSign size={18} className="text-brand-green" />
                      <span>{labels.monthlyFee}</span>
                    </div>

                    <span className="text-lg font-bold text-brand-green">
                      {course.price}
                      <span className="ms-1 text-xs font-normal text-slate-500">
                        / {labels.month}
                      </span>
                    </span>

                  </div>

                  {/* Details Button */}

                  <button
                    type="button"
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="btn-primary w-full"
                  >
                    {labels.details}

                    <ArrowRight
                      size={18}
                      className={isDari ? "rotate-180" : ""}
                    />
                  </button>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* Empty State */

          <div className="py-16 text-center text-slate-500">

            <BookOpen size={42} className="mx-auto mb-4" />

            <p>{labels.empty}</p>

          </div>

        )}

      </div>
    </main>
  );
}