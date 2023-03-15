import express from "express"
import { createOrder, deleteOrder, getOrder, getOrders, getOrdersByStatus, updateOrderStatus } from "../controllers/orderController"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"

const router = express.Router()

router.use(requireAuth)
router.use(requireAdmin)

// GET
router.get("/", getOrders) // getOrders
router.get("/:id", getOrder) // getOrder
router.get("/status/:status", getOrdersByStatus) // getOrdersByStatus

// POST
router.post("/:method", createOrder) // createOrder => specify mercadopago or admin eg

// PATCH
router.patch("/status/:id", updateOrderStatus) // updateOrderStatus

// DELETE
router.delete("/:id", deleteOrder) // deleteOrder

export default router
