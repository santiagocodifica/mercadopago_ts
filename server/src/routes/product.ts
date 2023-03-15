import express from "express"
import { createImage, createProduct, deleteImage, deleteProduct, getProduct, getProducts, getProductsBySearch, updateImage, updateProduct } from "../controllers/productController"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"

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
router.post("/image/:productId", createImage) // createImage + query params

// PATCH
router.patch("/:id", updateProduct) // updateProduct
router.patch("/image/:productId", updateImage) // updateImage + query params

// DELETE
router.delete("/:id", deleteProduct) // deleteProduct
router.delete("/image/:productId", deleteImage) // deleteImage + query params

export default router
