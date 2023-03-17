import multer from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const filePath = path.join(__dirname, "../../../../client/public/imgs/products/", req.params.productId)
    if(!fs.existsSync(filePath)){ // create new dir
      fs.mkdirSync(filePath)
    }
    cb(null, filePath)
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
