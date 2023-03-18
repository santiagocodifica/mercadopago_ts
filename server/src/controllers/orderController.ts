import { RequestHandler } from "express"
import Order from "../models/orderModel"
import User from "../models/userModel"
import Product from "../models/productModel"
import { OrderI, ProductI, StockItem, SubProductI } from "../types/schemas"

export const getOrders: RequestHandler = async (_req, res) => {
  try{
    const orders = await Order.find({}).sort({ createdAt: -1 })
    return res.status(200).json(orders)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Orders not found" })
  }
}

export const getOrder: RequestHandler = async (req, res) => {
  const { id } = req.params
  try{
    const order = await Order.findById(id)
    return res.status(200).json(order)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Order not found" })
  }
}

export const getOrdersByStatus: RequestHandler = async (req, res) => {
  const { status } = req.params
  try{
    const orders = await Order.find({ orderStatus: status }).sort({ createdAt: -1 })
    return res.status(200).json(orders)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Orders not found" })
  }
}

export const createOrder: RequestHandler = async (req, res) => {
  try{
    const order: OrderI = await Order.create({
      customer: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone || "",
        location: req.body.location
      },
      products: req.body.products,
      totalPrice: req.body.totalPrice,
      mercadopagoData: req.mercadopagoResponse || {}
    })
    // check if this have been done
    if(!order){
      throw "Order not created"
    }
    // find the user that made the order
    // 
    await User.findOneAndUpdate({ _id: req.user._id }, {
      $push: { orders: order._id },
      $set: { preparedCheckout: { } }
    }, { new: true })
    //
    // reduce product stock
    await Promise.all(order.products.map(async (orderedProduct: SubProductI) => {
      const product: ProductI | null = await Product.findById(orderedProduct.productId)
      if(!product){
        throw "Could not find ordered product in catalog"
      }
      const updatedStock: Array<StockItem> = await Promise.all(product.stock.map((item: StockItem) => {
        if(item.size === orderedProduct.size){
          return {
            _id: item._id,
            size: item.size,
            amount: Number(item.amount - orderedProduct.amount)
          }
        }else{
          return item
        }
      }))
      product.stock = updatedStock
      const saveProduct = await product.save()
      if(!saveProduct){
        throw "Could not update product stock"
      }
    }))
    // SUCCESS
    return res.status(200).json(order)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "There was a problem processing your order, please get in touch with us."})
  }
}

export const updateOrderStatus: RequestHandler = async (req, res) => {
  const { id, status } = req.params
  try{
    const order = await Order.findOneAndUpdate({ _id: id }, {
      $set: { orderStatus: status }
    }, { new: true })
    return res.status(200).json(order)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Could not update order status" })
  }
}

export const deleteOrder: RequestHandler = async (req, res) => {
  const { id } = req.params
  try{
    const order = await Order.findOneAndDelete({ _id: id })
    return res.status(200).json(order)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Could not delete order"})
  }
}
