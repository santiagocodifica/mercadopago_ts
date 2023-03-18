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
router.get("/prepared-checkout", getPreparedCheckout) // getUserPreparedCheckout
router.get("/orders", getUserOrders) // getUserOrders

// POST
router.post("/prepare-checkout", prepareUserCheckout) // prepareUserCheckout
router.post("/location", createUserLocation) // createUserLocation

// PATCH
router.patch("/", updateUser) // updateUser

// DELETE
router.delete("/", deleteUser) // deleteUser
router.delete("/location/:id", deleteUserLocation) // deleteUserLocation

//
// CMS ROUTES
// 
router.use(requireAdmin)
//
router.get("/", getUsers) // getUsers
router.get("/:id", getUser) // getUser
router.get("/orders/:id") // to use from cms
router.patch("/:id") // to use from cms
//router.delete("/:id") // to use from cms

export default router
