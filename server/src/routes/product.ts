import express, { NextFunction } from "express"
import { createImage, createProduct, deleteImage, deleteProduct, getFilteredProducts, getProduct, getProducts, getProductsBySearch, updateImage, updateProduct } from "../controllers/productController"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"
import upload from "../middleware/multer/upload"
import multerErrorHandler from "../middleware/multer/multerErrorHandler"
import { Request, Response } from "express"

const router = express.Router()
// GET
router.get("/", getProducts)
router.get("/search", getProductsBySearch)
router.get("/filter", getFilteredProducts)
router.get("/:id", getProduct)

//
// ADMIN ROUTES
//
router.use(requireAuth)
router.use(requireAdmin)
// POST
router.post("/", createProduct)
router.post("/image/:productId/:type", (req: Request, res: Response, next: NextFunction) => upload(req, res, (err: unknown) => multerErrorHandler(res, next, err)), createImage)
// PATCH
router.patch("/:id", updateProduct)
router.patch("/image/:productId/:type", upload, (req: Request, res: Response, next: NextFunction) => upload(req, res, (err: unknown) => multerErrorHandler(res, next, err)), updateImage)
// DELETE
router.delete("/:id", deleteProduct)
router.delete("/image/:productId/:type", deleteImage)

export default router
