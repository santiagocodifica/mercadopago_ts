import express from "express"
import { createOrder, getOrder, getOrders, getOrdersByStatus, updateOrderStatus } from "../controllers/orderController"
import mercadopagoPayment from "../middleware/mercadopago/mercadopagoPayment"
import mercadopagoToken from "../middleware/mercadopago/mercadopagoToken"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"
import { validateOrderInputs } from "../middleware/order/validateOrderInputs"
import { validateOrderStock } from "../middleware/order/validateOrderStock"

const router = express.Router()

router.use(requireAuth)

router.post("/", validateOrderInputs, validateOrderStock, createOrder)
router.post("/mercadopago", mercadopagoToken, mercadopagoPayment, createOrder) // createOrder => specify mercadopago or admin eg

router.use(requireAdmin)

// GET
router.get("/", getOrders) // getOrders
router.get("/:id", getOrder) // getOrder
router.get("/status/:status", getOrdersByStatus) // getOrdersByStatus

// POST
// router.post("/admin") // createOrder directly from admin

// PATCH
router.patch("/:status/:id", updateOrderStatus) // updateOrderStatus

// DELETE
// router.delete("/:id", deleteOrder) // deleteOrder

export default router
