import { RequestHandler } from "express";
import Product from "../models/productModel"
import { ProductI } from "../types/schemas";
import fs from "fs"
import path from "path"

export const getProducts: RequestHandler = async (_req, res) => {
  try{
    const products = await Product.find({}).sort({ createdAt: -1 })
    return res.status(200).json(products)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Products not found" })
  }
}

export const getProduct: RequestHandler = async (req, res) => {
  const { id } = req.params
  try{
    const product = Product.findById(id)
    return res.status(200).json(product)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Product not found" })
  }
}

export const getProductsBySearch: RequestHandler = async (req, res) => {
  const { name } = req.query
  try{
    const products = Product.find({ name: name }).sort({ createdAt: -1 })
    return res.status(200).json(products)
  }catch(error){
    return res.status(404).json({ error: "Products not found" })
  }
}

export const createProduct: RequestHandler = async (req, res) => {
  const data = req.body
  try{
    const product: ProductI = await Product.create(data)
    return res.status(200).json(product)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not create product, check inputs" })
  }
}

export const createImage: RequestHandler = async (req, res) => {
  const { productId } = req.params 
  try{
    // only to upload images
    const product = await Product.findByIdAndUpdate(productId, {
      $push: { images: { src: req.file?.filename } }
    }, { new: true })
    return res.status(200).json(product)
  }catch(error){
    console.log(error)
    return res.status(404).json("Could not create image")
  }
}

export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params
  try{
    const product: ProductI | null = await Product.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        price: req.body.price,
        previousPrice: req.body.previousPrice,
        active: req.body.active,
        featured: req.body.featured,
        inHomeBanner: req.body.inHomeBanner,
        newEntry: req.body.newEntry,
        onSale: req.body.onSale,
        description: req.body.description,
        smallDescription: req.body.smallDescription,
        categories: req.body.categories,
        gender: req.body.gender,
        specifications: req.body.specifications,
        stock: req.body.stock
      }
    }, { new: true })
    return res.status(200).json(product)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Product not updated. Check input fields." })
  }
}

export const updateImage: RequestHandler = async (req, res) => {
  const { path: imgPath } = req.params
  const { imageId } = req.query
  try{
    // delete previous image
    const product: ProductI | null = await Product.findOne({ "images._id": imageId }, { "images.$": 1 })
    if(!product){
      throw Error("Could not find product to update")
    }
    const imgSrcToDelete: string = product.images[0].src
    fs.unlinkSync(path.join(__dirname, "../../../client/public/imgs/products/", imgPath, imgSrcToDelete))
    const newProduct = await Product.findOneAndUpdate({ "images._id": imageId }, {
      $set: { "images.$.src": req.file?.filename }
    }, { new: true })
    return res.status(200).json(newProduct)
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not update image" })
  }
}

export const deleteProduct: RequestHandler = async (_req, _res) => {
}

export const deleteImage: RequestHandler = async (_req, _res) => {
}
