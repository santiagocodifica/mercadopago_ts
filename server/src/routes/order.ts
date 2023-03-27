import express from "express"
import { createOrder, getOrder, getOrders, getOrdersByStatus, prepareOrder, updateOrderStatus } from "../controllers/orderController"
import mercadopagoPayment from "../middleware/mercadopago/mercadopagoPayment"
import mercadopagoToken from "../middleware/mercadopago/mercadopagoToken"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"
import { validateOrderInputs } from "../middleware/order/validateOrderInputs"
import { validateOrderStock } from "../middleware/order/validateOrderStock"

const router = express.Router()

router.use(requireAuth)
// POST
router.post("/", validateOrderInputs, validateOrderStock, createOrder)
router.post("/mercadopago",validateOrderInputs, validateOrderStock, mercadopagoToken, mercadopagoPayment, createOrder)
router.post("/prepareOrder", prepareOrder) // prepareOrder
//
// CMS ROUTES
//
router.use(requireAdmin)
// GET
router.get("/", getOrders)
router.get("/:id", getOrder)
router.get("/status/:status", getOrdersByStatus)
// POST
// router.post("/admin") // createOrder directly from admin
// PATCH
router.patch("/:status/:id", updateOrderStatus)
// DELETE
// router.delete("/:id", deleteOrder) // deleteOrder

export default router
