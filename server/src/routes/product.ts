import express from "express"
import { createImage, createProduct, deleteImage, deleteProduct, getProduct, getProducts, getProductsBySearch, updateImage, updateProduct } from "../controllers/productController"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"
import multerErrorHandler from "../middleware/multer/multerErrorHandler"
import upload from "../middleware/multer/upload"

const router = express.Router()

// GET
router.get("/", getProducts) // getProducts
router.get("/:id", getProduct) // getProduct
router.get("/search", getProductsBySearch) // getProductsBySearch

// ADMIN ROUTES
router.use(requireAuth)
router.use(requireAdmin)

// POST
router.post("/", createProduct) // createProduct
router.post("/image/:productId/:path", (req, res, next) => upload(req, res, err => multerErrorHandler(res, next, err)), createImage) // createImage + query params

// PATCH
router.patch("/:id", updateProduct) // updateProduct
router.patch("/image/:productId/:path", (req, res, next) => upload(req, res, err => multerErrorHandler(res, next, err)), createImage) // updateImage + query params

// DELETE
router.delete("/:id", deleteProduct) // deleteProduct
router.delete("/image/:productId/:path", deleteImage) // deleteImage + query params

export default router
