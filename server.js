import express from "express"
import multer from "multer"
import cors from "cors"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 5002

app.use(cors())

const uploadDir = "uploads"

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-")

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

app.use("/uploads", express.static(path.resolve(uploadDir)))

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

app.use((error, req, res, next) => {
  res.status(400).json({
    message: error.message,
  })
})

app.listen(PORT, () => {
  console.log(`Upload server running at http://localhost:${PORT}`)
})