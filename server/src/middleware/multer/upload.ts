import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    cb(null, path.join(__dirname, "../../client/public/imgs/products/", req.params.path))
  },
  filename: (_req, file, cb) => {
    cb(null, `${ Date.now() }--${ file.originalname }`)
  }
})

const limits = {
  fileSize: 2000000
}

let upload = multer({
  storage,
  limits
})

export default upload.single("image")
