import express from "express"
import { createUserLocation, deleteUser, deleteUserLocation, getPreparedCheckout, getUser, getUserOrders, getUsers, login, prepareUserCheckout, signup, updateUser } from "../controllers/userController"
import requireAdmin from "../middleware/auth/requireAdmin"
import requireAuth from "../middleware/auth/requireAuth"

const router = express.Router()

// AUTHENTICATION ROUTES
router.post("/login", login)
router.post("/signup", signup)

// REQUIRE AUTH
router.use(requireAuth)
// GET
router.get("/prepared-checkout", getPreparedCheckout)
router.get("/orders", getUserOrders)
// POST
router.post("/prepare-checkout", prepareUserCheckout)
router.post("/location", createUserLocation)
// PATCH
router.patch("/", updateUser)
// DELETE
router.delete("/", deleteUser)
router.delete("/location/:id", deleteUserLocation)

//
// CMS ROUTES
// 
router.use(requireAdmin)
//
router.get("/", getUsers)
router.get("/:id", getUser)
// router.get("/orders/:id") // to use from cms
// router.patch("/:id") // to use from cms
// router.delete("/:id") // to use from cms

export default router
