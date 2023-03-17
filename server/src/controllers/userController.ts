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
  try{
    // calculate price
    if(!req.user.preparedCheckout.products){
      throw Error("Could not find selected products")
    }
    await Promise.all(req.user.preparedCheckout.products.map(async (product: SubProductI) => {
      const dbProduct: ProductI | null = await Product.findById(product._id)
      if(!dbProduct){
        throw Error("Could not find selected products")
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
  const user = req.user
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
  const { location } = req.body
  const user = req.user
  try{
    user.locations.push(location)
    const savedUser = await user.save()
    if(!savedUser){
      throw Error("Could not save location")
    }
    const newLocation = user.locations[user.locations.length - 1]
    return res.status(200).json(newLocation)
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

export const deleteUser: RequestHandler = async (_req, _res) => {
}

export const deleteUserLocation: RequestHandler = async (req, res) => {
  // const { id } = req.params
  try{
    // req.user.locations.id(id).remove()
    const savedUser = await req.user.save()
    if(!savedUser){
      throw Error("Could not delete location")
    }
    return res.status(200).json(req.user)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not delete location" })
  }
}
