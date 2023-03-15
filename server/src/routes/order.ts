import express from "express"
import requireAdmin from "../middleware/requireAdmin"
import requireAuth from "../middleware/requireAuth"

const router = express.Router()

router.use(requireAuth)
router.use(requireAdmin)

// GET
router.get("/") // getOrders
router.get("/:id") // getOrder
router.get("/status/:status") // getOrderByStatus

// POST
router.post("/:method") // createOrder => specify mercadopago or admin eg

// PATCH
router.patch("/:id") // updateOrder

// DELETE
router.delete("/:id") // deleteOrder

export default router
