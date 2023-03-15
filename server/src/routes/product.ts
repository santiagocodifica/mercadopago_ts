import express from "express"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"

const router = express.Router()

// GET
router.get("/") // getProducts
router.get("/:id") // getProduct
router.get("/query") // getProductsByQuery

// ADMIN ROUTES
router.use(requireAuth)
router.use(requireAdmin)

// POST
router.post("/") // createProduct
router.post("/image/:productId") // createImage + query params

// PATCH
router.patch("/:id") // updateProduct
router.patch("/image/:productId") // updateImage + query params

// DELETE
router.delete("/:id") // deleteProduct
router.delete("/image/:productId") // deleteImage + query params

export default router
