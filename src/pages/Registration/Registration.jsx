import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"
import geoLogo from "../../assets/image/geo-logo.jpg"
import LanguageSwitcher from "../../components/common/LanguageSwitcher"
import useLanguageStore from "../../store/languageStore"

function Registration() {
  const language = useLanguageStore((state) => state.language)
const isRTL = language === "fa"
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    age: "",
    whatsapp: "",
    email: "",
    country: "",
    province: "",
    district: "",
    courseId: "",
    idDocumentName: "",
    educationCertificateName: "",
    photoName: "",
  })

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"

  // Load courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/courses"
        )

       if (!response.ok) {
  throw new Error("Could not load courses")
}
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Courses error:", error)

        Swal.fire({
          title: "Loading Failed!",
          text: "Could not load courses. Please try again.",
          icon: "error",
          confirmButtonColor: "#DC2626",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target
    const file = files[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        title: "File Too Large!",
        text: "Maximum file size is 5 MB.",
        icon: "error",
        confirmButtonColor: "#DC2626",
      })

      e.target.value = ""
      return
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ]

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        title: "Invalid File!",
        text: "Please select a PDF, JPG or PNG file.",
        icon: "error",
        confirmButtonColor: "#DC2626",
      })

      e.target.value = ""
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: file.name,
    }))
  }
const uploadFiles = async (form) => {
  const uploadData = new FormData()

  uploadData.append(
    "idDocument",
    form.elements.idDocumentName.files[0]
  )

  uploadData.append(
    "educationCertificate",
    form.elements.educationCertificateName.files[0]
  )

  uploadData.append(
    "photo",
    form.elements.photoName.files[0]
  )

  const response = await fetch("http://localhost:5002/upload", {
    method: "POST",
    body: uploadData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message 
      || "File upload failed")
  }

  return data.files
}
  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget

    try {
      setSubmitting(true)

      const selectedCourse = courses.find(
        (course) =>
          String(course.id) === String(formData.courseId)
      )

      const courseTitle =
        typeof selectedCourse?.title === "object"
          ? selectedCourse.title?.en ||
            selectedCourse.title?.fa ||
            ""
          : selectedCourse?.title || ""
const uploadedFiles = await uploadFiles(form)
      
const registrationData = {
  ...formData,

  studentName:` ${formData.firstName} ${formData.lastName}`,
  age: Number(formData.age),
  courseTitle,
idDocumentName: uploadedFiles.idDocument?.[0]?.filename || "",
  educationCertificateName:
    uploadedFiles.educationCertificate?.[0]?.filename || "",
  photoName: uploadedFiles.photo?.[0]?.filename || "",

  idDocumentUrl: uploadedFiles.idDocument?.[0]?.path || "",
  educationCertificateUrl:
    uploadedFiles.educationCertificate?.[0]?.path || "",
  photoUrl: uploadedFiles.photo?.[0]?.path || "",

  status: "pending",
  submittedAt: new Date().toISOString(),
}
      const response = await fetch(
        "http://localhost:5001/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      )

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      setFormData({
        firstName: "",
        lastName: "",
        fatherName: "",
        age: "",
        whatsapp: "",
        email: "",
        country: "",
        province: "",
        district: "",
        courseId: "",
        idDocumentName: "",
        educationCertificateName: "",
        photoName: "",
      })

      form.reset()
await Swal.fire({
        title: "Registration Successful!",
        text: "Your registration has been submitted successfully. We will contact you soon.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16A34A",
        background: "#F0FDF4",
        color: "#166534",
        iconColor: "#16A34A",
      })
    } catch (error) {
      console.error("Registration error:", error)

      await Swal.fire({
        title: "Registration Failed!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#DC2626",
        background: "#FEF2F2",
        color: "#991B1B",
        iconColor: "#DC2626",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main
  dir={isRTL ? "rtl" : "ltr"}
  className="min-h-screen bg-slate-50 px-4 py-10"
>
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-md md:p-10">

        
{/* Page Header */}
<div className="mb-8 text-center">
  <div className="mb-4 flex justify-end">
  <LanguageSwitcher />
</div>

  <img
    src={geoLogo}
    alt="GEO Logo"
    className="mx-auto mb-4 h-32 w-32 object-contain"
  />

  <h1 className="text-3xl font-bold text-slate-800">
    {language === "fa" ? "ثبت‌نام دانشجو" : "Student Registration"}
  </h1>

  <p className="mt-2 text-slate-500">
    {language === "fa"
  ? "لطفاً برای ثبت‌نام در کورس، فورم را تکمیل کنید."
  : "Please complete the form to register for a course."}
  </p>

</div>
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Personal Information */}
          <section>
            <h2 className="mb-5 border-b pb-3 text-xl font-semibold text-slate-800">
              {language === "fa" ? "معلومات شخصی" : "Personal Information"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={language === "fa" ? "نام" : "First Name"}
                className={inputClass}
                required
              />

              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={language === "fa" ? "تخلص" : "Last Name"}
                className={inputClass}
                required
              />

              <input
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder={language === "fa" ? "نام پدر" : "Father's Name"}
                className={inputClass}
                required
              />
<input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder={language === "fa" ? "سن" : "Age"}
                min="1"
                className={inputClass}
                required
              />
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="mb-5 border-b pb-3 text-xl font-semibold text-slate-800">
              {language === "fa" ? "معلومات تماس" : "Contact Information"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder={language === "fa" ? "شماره واتساپ" : "WhatsApp Number"}
                className={inputClass}
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
               placeholder={language === "fa" ? "آدرس ایمیل" : "Email Address"}
                className={inputClass}
                required
              />
            </div>
          </section>

          {/* Address Information */}
          <section>
            <h2 className="mb-5 border-b pb-3 text-xl font-semibold text-slate-800">
              {language === "fa" ? "معلومات آدرس" : "Address Information"}
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder={language === "fa" ? "کشور" : "Country"}
                className={inputClass}
                required
              />
<input
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder={language === "fa" ? "ولایت" : "Province"}
                className={inputClass}
                required
              />

              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder={language === "fa" ? "ولسوالی / ناحیه" : "District / Area"}
                className={inputClass}
                required
              />
            </div>
          </section>

          {/* Course Information */}
          <section>
            <h2 className="mb-5 border-b pb-3 text-xl font-semibold text-slate-800">
              {language === "fa" ? "معلومات کورس" : "Course Information"}
            </h2>

            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className={inputClass}
              disabled={loading || courses.length === 0}
              required
            >
              <option value="">
                {loading
  ? (language === "fa" ? "در حال بارگذاری کورس‌ها..." : "Loading courses...")
  : courses.length === 0
    ? (language === "fa" ? "هیچ کورسی موجود نیست" : "No courses available")
    : (language === "fa" ? "کورس خود را انتخاب کنید" : "Choose your course")}
              </option>

              {courses.map((course) => {
                const title =
                  typeof course.title === "object" &&
                  course.title !== null
                    ? course.title?.en ||
                      course.title?.fa ||
                      course.id
                    : course.title || course.id

                return (
                  <option key={course.id} value={course.id}>
                    {title}
                  </option>
                )
              })}
            </select>
          </section>
{/* Required Documents */}
          <section>
            <h2 className="mb-5 border-b pb-3 text-xl font-semibold text-slate-800">
             {language === "fa" ? "اسناد مورد نیاز" : "Required Documents"}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                 {language === "fa" ? "اسکن تذکره الکترونیکی" : "Electronic ID Scan"}
                </label>

                <input
                  type="file"
                  name="idDocumentName"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  {language === "fa" ? "آخرین سند تحصیلی" : "Latest Education Certificate"}
                </label>

                <input
                  type="file"
                  name="educationCertificateName"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  {language === "fa"
  ? "عکس رسمی با پس‌زمینه سفید"
  : "Official Photo (White Background)"}
                </label>

                <input
                  type="file"
                  name="photoName"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  required
                  className={inputClass}
                />
              </div>

              <p className="text-sm text-slate-500">
                {language === "fa"
  ? "حداکثر حجم فایل: ۵ مگابایت. فرمت‌های قابل قبول: PDF، JPG و PNG."
  : "Maximum file size: 5 MB. Accepted formats: PDF, JPG and PNG."}
              </p>
            </div>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || loading || courses.length === 0}
            className="w-full rounded-lg bg-[#0674C3] px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
           {submitting
  ? (language === "fa" ? "در حال ثبت..." : "Submitting...")
  : (language === "fa" ? "ثبت‌نام" : "Submit Registration")}
          </button>

        </form>
      </div>
    </main>
  )
}
export default Registration