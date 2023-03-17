import User from "../models/userModel"
import Product from "../models/productModel"
import Order from "../models/orderModel"
import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { ProductI, SubProductI, UserI } from "../types/schemas";

const createToken = (_id: any) => {
  if(!process.env.SECRET){
    throw Error("Could not crete token")
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  try{
    const user: any = await User.login(email, password)
    const token = createToken(user._id)
    return res.status(200).json({ ...user._doc, token })
  }catch(error){
    console.log(error)
    return res.status(401).json({ error: "Login failed" })
  }
}

export const signup: RequestHandler = async (req, res) => {
  const { name, email, password1, password2 } = req.body
  console.log(req.body)
  try{
    const user: any = await User.signup(name, email, password1, password2)
    const token = createToken(user._id)
    return res.status(200).json({ ...user._doc, token })
  }catch(error){
    console.log(error)
    return res.status(401).json({ error: "Signup failed" })
  }
}

export const getUsers: RequestHandler = async (_req, res) => {
  try{
    const users = await User.find({}).sort({ createdAt: -1 })
    return res.status(200).json(users)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Could not find users" })
  }
}

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  try{
    const user = await User.findById(id)
    return res.status(200).json(user)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Could not find user" })
  }
}

export const getPreparedCheckout: RequestHandler = async (req, res) => {
  let totalPrice: number = 0
  const user: UserI = req.user
  try{
    // calculate price
    if(!user.preparedCheckout.products){
      throw Error("Could not find selected products")
    }
    await Promise.all(user.preparedCheckout.products.map(async (product: SubProductI) => {
      const dbProduct: ProductI | null = await Product.findOne({ _id: product.productId })
      console.log(dbProduct)
      if(!dbProduct){
        throw Error("Could not find selected products 2")
      }
      totalPrice = totalPrice + dbProduct.price * product.amount
    }))
    // set the preparedCheckout object to send to client
    const preparedCheckout = {
      products: req.user.preparedCheckout.products,
      location: req.user.preparedCheckout.location,
      totalPrice
    }
    // sent object to client
    return res.status(200).json(preparedCheckout)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Checkout data not available" })
  }
}

export const getUserOrders: RequestHandler = async (req, res) => {
  try{
    const orders = await Order.find({ "_id": { $in: req.user.orders }}).sort({ createdAt: -1 })
    return res.status(200).json(orders)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Orders not found" })
  }
}

export const prepareUserCheckout: RequestHandler = async (req, res) => {
  const { location, products } = req.body
  console.log(req.body)
  const user: UserI = req.user
  try{
    user.preparedCheckout = { products, location, totalPrice: 0 }
    const savedUser = await user.save()
    if(!savedUser){
      throw Error("Could not prepare checkout")
    }
    return res.status(200).json(user)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not prepare checkout" })
  }
}

export const createUserLocation: RequestHandler = async (req, res) => {
  const data = req.body
  const user: UserI = req.user
  try{
    user.locations.push(data)
    const savedUser = await user.save()
    if(!savedUser){
      throw Error("Could not save location")
    }
    return res.status(200).json(user)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not save location" })
  }
}

export const updateUser: RequestHandler = async (req, res) => {
  const { data } = req.body
  try{
    const user: UserI | null = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    })
    return res.status(200).json(user)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not update information" })
  }
}

export const deleteUser: RequestHandler = async (req, res) => {
  const user: UserI = req.user
  try{
    const deleteUser: UserI | null = await User.findByIdAndDelete(user._id)
    return res.status(200).json(deleteUser)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "User failed to be deleted" })
  }
}

export const deleteUserLocation: RequestHandler = async (req, res) => {
  const { id } = req.params
  const user: UserI = req.user
  try{
    const updatedUser: UserI | null = await User.findByIdAndUpdate(user._id, {
      $pull: { locations: { _id: id } }
    }, { new: true })
    return res.status(200).json(updatedUser)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not delete location" })
  }
}
