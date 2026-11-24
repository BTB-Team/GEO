import express from "express"
import multer from "multer"
import cors from "cors"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 5002

app.use(cors())
app.use(express.json({ limit: "10kb" }))

// Upload directory
const uploadDir = path.resolve("uploads")

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Contact messages file
const messagesFile = path.resolve("messages.json")

if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, "[]", "utf8")
}

// File upload settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const safeName = path
      .basename(file.originalname)
      .replace(/[^a-zA-Z0-9._-]/g, "-")

    const uniqueName = Date.now() + "-" + safeName
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only PDF, JPG and PNG files are allowed"))
    }
  },
})

// Serve uploaded files
app.use("/uploads", express.static(uploadDir))

// Registration file upload
app.post(
  "/upload",
  upload.fields([
    { name: "idDocument", maxCount: 1 },
    { name: "educationCertificate", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  (req, res) => {
    res.json({
      message: "Files uploaded successfully",
      files: req.files,
    })
  }
)

// Contact form
app.post("/messages", (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {}

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        message: "Please provide valid form information.",
      })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanSubject = subject.trim()
    const cleanMessage = message.trim()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      cleanName.length < 2 ||
      cleanName.length > 80 ||
      cleanEmail.length > 120 ||
      !emailPattern.test(cleanEmail) ||
      cleanSubject.length < 3 ||
      cleanSubject.length > 120 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 2000
    ) {
      return res.status(400).json({
        message: "Please check your form information and try again.",
      })
    }

    // Reject HTML tags and control characters
    const values = [
      cleanName,
      cleanEmail,
      cleanSubject,
      cleanMessage,
    ]

    if (
      values.some(
        (value) =>
          /[<>]/.test(value) ||
          /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value)
      )
    ) {
      return res.status(400).json({
        message: "Invalid characters detected.",
      })
    }

    const messages = JSON.parse(
      fs.readFileSync(messagesFile, "utf8")
    )

    const newMessage = {
      id: Date.now().toString(),
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      createdAt: new Date().toISOString(),
    }

    messages.push(newMessage)

    fs.writeFileSync(
      messagesFile,
      JSON.stringify(messages, null, 2),
      "utf8"
    )

    return res.status(201).json({
      message: "Your message was sent successfully.",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    })
  }
})

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
  console.error(error)

  res.status(400).json({
    message: error.message || "Request failed.",
  })
})
// Start server
app.listen(PORT, () => {
  console.log(`Upload server running at http://localhost:${PORT}`)
})