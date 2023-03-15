import express from "express"

const router = express.Router()

// AUTHENTICATION ROUTES
router.post("/login")
router.post("/signup")

// REQUIRE AUTH

// GET
router.get("/") // getUsers
router.get("/:id") // getUser
router.get("/preparedCheckout") // getUserPreparedCheckout
router.get("/orders") // getUserOrders

// POST
router.post("/prepareCheckout") // prepareUserCheckout
router.post("/location") // createUserLocation

// PATCH
router.patch("/") // updateUser

// DELETE
router.delete("/") // deleteUser
router.delete("/location/:id") // deleteUserLocation

//
// CMS ROUTES
// 
router.get("/orders/:id") // to use from cms
router.patch("/:id") // to use from cms
router.delete("/:id") // to use from cms

export default router
