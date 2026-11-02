import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home/Home"
import Teachers from "../pages/Teachers/Teachers"
import Courses from "../pages/Courses/Courses"
import CourseDetails from "../pages/CourseDetails/CourseDetails"
import ClassSchedule from "../pages/ClassSchedule/ClassSchedule"
import Registration from "../pages/Registration/Registration"
import Contact from "../pages/Contact/Contact"
import Achievements from "../pages/Achievements/Achievements"
import Announcements from "../pages/Announcements/Announcements"
import About from "../pages/About/About"
import Gallery from "../pages/Gallery/Gallery"
import Events from "../pages/Events/Events"
import Blog from "../pages/Blog/Blog"
import Resources from "../pages/Resources/Resources"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/schedule" element={<ClassSchedule />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  )
}

export default AppRoutes