import { useState } from "react"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Globe,
  MessageCircle,
  Users,
  Camera,
} from "lucide-react"

import useLanguageStore from "../../store/languageStore"

function Contact() {
  const language = useLanguageStore((state) => state.language)
  const isRTL = language === "fa"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitting, setSubmitting] = useState(false)

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0674C3] focus:ring-2 focus:ring-blue-100"

  const t = {
    title: isRTL ? "با ما در تماس شوید" : "Get in Touch",
    subtitle: isRTL
      ? "ما آماده شنیدن پرسش‌ها و پیشنهادهای شما هستیم."
      : "We are here to answer your questions and hear your suggestions.",
    contactInfo: isRTL ? "اطلاعات تماس" : "Contact Information",
    phone: isRTL ? "شماره تماس" : "Phone Number",
    email: isRTL ? "ایمیل" : "Email Address",
    address: isRTL ? "آدرس" : "Our Address",
    hours: isRTL ? "ساعات پاسخ‌گویی" : "Working Hours",
    phoneValue: isRTL ? "شماره رسمی مکتب به‌زودی اضافه می‌شود" : "Official phone number will be added soon",
    emailValue: isRTL ? "ایمیل رسمی مکتب به‌زودی اضافه می‌شود" : "Official email will be added soon",
    addressValue: isRTL ? "آدرس رسمی مکتب به‌زودی اضافه می‌شود" : "Official school address will be added soon",
    hoursValue: isRTL ? "ساعات کاری به‌زودی اعلام می‌شود" : "Working hours will be announced soon",
    messageTitle: isRTL ? "برای ما پیام بفرستید" : "Send Us a Message",
    name: isRTL ? "نام کامل" : "Full Name",
    emailLabel: isRTL ? "آدرس ایمیل" : "Email Address",
    subject: isRTL ? "موضوع پیام" : "Subject",
    message: isRTL ? "پیام شما" : "Your Message",
    namePlaceholder: isRTL ? "نام خود را وارد کنید" : "Enter your full name",
    emailPlaceholder: isRTL ? "ایمیل خود را وارد کنید" : "Enter your email",
    subjectPlaceholder: isRTL ? "موضوع پیام را بنویسید" : "Enter message subject",
    messagePlaceholder: isRTL ? "پیام خود را اینجا بنویسید..." : "Write your message here...",
    send: isRTL ? "ارسال پیام" : "Send Message",
    sending: isRTL ? "در حال ارسال..." : "Sending...",
    mapTitle: isRTL ? "موقعیت مکانی ما" : "Our Location",
    mapText: isRTL
      ? "نقشه پس از دریافت آدرس رسمی مکتب اضافه می‌شود."
      : "The map will be added when the official school address is available.",
    social: isRTL ? "ما را در شبکه‌های اجتماعی دنبال کنید" : "Follow Us on Social Media",
    required: isRTL ? "لطفاً تمام خانه‌ها را تکمیل کنید." : "Please complete all fields.",
    success: isRTL ? "پیام شما با موفقیت ارسال شد." : "Your message has been sent successfully.",
    error: isRTL ? "ارسال پیام موفق نشد. دوباره تلاش کنید." : "Message could not be sent. Please try again.",
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    }

    if (Object.values(cleanedData).some((value) => !value)) {
      Swal.fire({
        icon: "warning",
        text: t.required,
        confirmButtonColor: "#0674C3",
      })
      return
    }

    try {
      setSubmitting(true)

      const response = await fetch("http://localhost:5002/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || t.error)
      }
setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      await Swal.fire({
        icon: "success",
        title: t.success,
        confirmButtonColor: "#16A34A",
      })
    } catch (error) {
      console.error("Contact form error:", error)

      Swal.fire({
        icon: "error",
        text: error.message || t.error,
        confirmButtonColor: "#DC2626",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const contactItems = [
    {
      icon: Phone,
      title: t.phone,
      value: t.phoneValue,
    },
    {
      icon: Mail,
      title: t.email,
      value: t.emailValue,
    },
    {
      icon: MapPin,
      title: t.address,
      value: t.addressValue,
    },
    {
      icon: Clock,
      title: t.hours,
      value: t.hoursValue,
    },
  ]

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 px-4 py-12"
    >
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#0674C3]">
            {isRTL ? "سازمان آموزش دختران" : "Girls Education Organization"}
          </span>

          <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            {t.subtitle}
          </p>
        </div>

        {/* Contact Information and Form */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Contact Information */}
          <section className="rounded-2xl bg-white p-6 shadow-md md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              {t.contactInfo}
            </h2>

            <div className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-blue-100 hover:bg-blue-50/40"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0674C3]">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Media */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="mb-4 font-semibold text-slate-800">
                {t.social}
              </h3>

              <div className="flex gap-3">
                {[Users, Camera, Globe, MessageCircle].map(
                  (Icon, index) => (
                    <div
                      key={index}
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#0674C3]"
                    >
                      <Icon size={21} />
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="rounded-2xl bg-white p-6 shadow-md md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-[#0674C3]">
                <Send size={23} />
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                {t.messageTitle}
              </h2>
            </div>
<form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className={inputClass}
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={inputClass}
                  maxLength={120}
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  {t.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subjectPlaceholder}
                  className={inputClass}
                  minLength={3}
                  maxLength={120}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  className={`‍${inputClass} min-h-36 resize-y`}
                  minLength={10}
                  maxLength={2000}
                  required
                />
                <p className="mt-1 text-xs text-slate-400">
                  {formData.message.length}/2000
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0674C3] px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />
                {submitting ? t.sending : t.send}
              </button>
            </form>
          </section>
        </div>

        {/* Location Section */}
        <section className="mt-8 rounded-2xl bg-white p-6 text-center shadow-md md:p-8">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#0674C3]">
            <MapPin size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            {t.mapTitle}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {t.mapText}
          </p>

          <div className="mt-5 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center text-slate-400">
              <MapPin size={30} className="mx-auto mb-2" />
              <p className="text-sm">
                {isRTL ? "نقشه مکتب" : "School Map"}
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

export default Contact