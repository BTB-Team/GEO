import { useEffect, useState } from "react";
import useTranslation from "../../hooks/useTranslation";

export default function ClassSchedulePage() {
  const { t, language } = useTranslation();
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [deliveryMode, setDeliveryMode] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSchedules() {
      try {
        const options = { signal: controller.signal };

        const [schedulesResponse, coursesResponse, teachersResponse] =
          await Promise.all([
            fetch("http://localhost:5000/classSchedules", options),
            fetch("http://localhost:5000/courses", options),
            fetch("http://localhost:5000/teachers", options),
          ]);

        for (const response of [
          schedulesResponse,
          coursesResponse,
          teachersResponse,
        ]) {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status} — ${response.url}`);
          }
        }

        const [schedulesData, coursesData, teachersData] = await Promise.all([
          schedulesResponse.json(),
          coursesResponse.json(),
          teachersResponse.json(),
        ]);

        setSchedules(schedulesData);
        setCourses(coursesData);
        setTeachers(teachersData);
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Could not load class schedules:", error);
          setStatus("error");
        }
      }
    }

    loadSchedules();

    return () => controller.abort();
  }, []);

  const currentSchedules = schedules.filter(
    (schedule) => schedule.scheduleGroup === "current-year",
  );

  const visibleSchedules = currentSchedules.filter(
    (schedule) =>
      deliveryMode === "all" || schedule.deliveryMode === deliveryMode,
  );

  return (
    <main className="container-custom section-padding">
      <header className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-brand-blue to-text-primary px-6 py-10 text-white sm:px-10 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-12 -top-20 -z-10 size-64 rounded-full border-[32px] border-white/10"
        />

        <h1 className="heading-1">{t.classSchedule}</h1>

        <p className="body-base mt-3 max-w-xl text-white/90">
          {t.scheduleIntro}
        </p>
      </header>

      {status === "loading" && <p className="mt-4">{t.scheduleLoading}</p>}

      {status === "error" && (
        <p className="mt-4" role="alert">
          {t.scheduleError}
        </p>
      )}

      {status === "success" && currentSchedules.length === 0 && (
        <p className="mt-4">{t.scheduleEmpty}</p>
      )}

      {status === "success" && currentSchedules.length > 0 && (
        <>
          <label className="mt-4 block max-w-xs">
            <span className="mb-1 block text-sm">{t.scheduleModeFilter}</span>
            <select
              className="input-custom"
              value={deliveryMode}
              onChange={(event) => setDeliveryMode(event.target.value)}
            >
              <option value="all">{t.scheduleAllModes}</option>
              <option value="in-person">
                {t.scheduleDeliveryModes["in-person"]}
              </option>
              <option value="online">{t.scheduleDeliveryModes.online}</option>
            </select>
          </label>

          {visibleSchedules.length === 0 && (
            <p className="mt-4">{t.scheduleNoMatches}</p>
          )}
        </>
      )}

      <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {visibleSchedules.map((schedule) => {
          const course = courses.find((item) => item.id === schedule.courseId);
          const teacher = teachers.find(
            (item) => item.id === schedule.teacherId,
          );
          const isOnline = schedule.deliveryMode === "online";

          return (
            <li
              key={schedule.id}
              className="card-custom h-full shadow-[0_8px_22px_-8px_#0674c333] transition-shadow hover:shadow-[0_14px_30px_-8px_#0674c34d]"
            >
              <div
                className={`border-t-4 px-5 py-5 ${
                  isOnline
                    ? "border-brand-blue bg-brand-blue/10"
                    : "border-brand-green bg-brand-green/10"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-semibold text-text-primary">
                    {schedule.programLevel?.[language] ??
                      course?.title?.[language] ??
                      "—"}
                  </h2>

                  <span
                    className={`rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-text-primary ${
                      schedule.deliveryMode === "online"
                        ? "bg-brand-blue/10"
                        : "bg-brand-green/10"
                    }`}
                  >
                    {t.scheduleDeliveryModes[schedule.deliveryMode] ?? "—"}
                  </span>
                </div>

                <bdi
                  dir="ltr"
                  className="mt-3 inline-block text-2xl font-bold tabular-nums text-text-primary sm:text-3xl"
                >
                  {schedule.startTime}–{schedule.endTime}
                </bdi>
              </div>

              <dl className="grid gap-3 border-t border-border px-5 py-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-text-secondary">{t.scheduleDayLabel}</dt>
                  <dd className="mt-1 font-medium">
                    {t.scheduleDays[schedule.dayOfWeek] ??
                      t.scheduleToBeAnnounced}
                  </dd>
                </div>

                <div>
                  <dt className="text-text-secondary">
                    {t.scheduleTeacherLabel}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {teacher?.name?.[language] ?? t.scheduleToBeAnnounced}
                  </dd>
                </div>

                <div>
                  <dt className="text-text-secondary">
                    {t.scheduleStatusLabel}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {t.scheduleStatuses[schedule.status] ??
                      t.scheduleToBeAnnounced}
                  </dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
