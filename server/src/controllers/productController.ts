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
    const product = await Product.findById(id)
    return res.status(200).json(product)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Product not found" })
  }
}

export const getProductsBySearch: RequestHandler = async (req, res) => {
  const { name } = req.query
  try{
    const products = await Product.find({ name: name }).sort({ createdAt: -1 })
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
  const { productId, type } = req.params 
  try{
    if(!req.file?.filename){
      throw Error("Image did not upload")
    }
    if(type === "images"){
      const product: ProductI | null = await Product.findByIdAndUpdate(productId, {
        $push: { images: { src: req.file.filename } }
      }, { new: true })
      return res.status(200).json(product)
    }else if(type === "thumb"){
      const product: ProductI | null = await Product.findByIdAndUpdate(productId, {
        $set: { thumb: req.file.filename }
      }, { new: true })
      return res.status(200).json(product)
    }else if(type === "thumbHover"){
      const product: ProductI | null = await Product.findByIdAndUpdate(productId, {
        $set: { thumbHover: req.file.filename }
      }, { new: true })
      return res.status(200).json(product)
    }else{
      fs.unlinkSync(path.join(__dirname, "../../../client/public/imgs/products/", productId, req.file.filename))
      return res.status(400).json({ error: "Unknown image type"})
    }
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
  const { productId, type } = req.params
  const { imageId } = req.query
  try{
    if(!req.file?.filename){
      throw Error("Failed to upload file")
    }
    if(type === "images"){
      const product: ProductI | null = await Product.findOne({ "images._id": imageId }, { "images.$": 1 })
      if(!product){
        throw Error("Could not find product to update")
      }
      const imgSrcToDelete: string = product.images[0].src
      fs.unlinkSync(path.join(__dirname, "../../../client/public/imgs/products/", productId, imgSrcToDelete))
      const newProduct = await Product.findOneAndUpdate({ "images._id": imageId }, {
        $set: { "images.$.src": req.file.filename }
      }, { new: true })
      return res.status(200).json(newProduct)
    }else if(type === "thumb"){
      const product: ProductI | null = await Product.findById(productId)
      if(!product){
        throw Error("Could not find product to update")
      }
      const imgSrcToDelete: string = product.thumb
      fs.unlinkSync(path.join(__dirname, "../../../client/public/imgs/products", productId, imgSrcToDelete))
      const newProduct: ProductI | null = await Product.findByIdAndUpdate(productId, {
        $set: { thumb: req.file.filename }
      }, { new: true })
      return res.status(200).json(newProduct)
    }else if(type === "thumbHover"){
      const product: ProductI | null = await Product.findById(productId)
      if(!product){
        throw Error("Could not find product to update")
      }
      const imgSrcToDelete: string = product.thumbHover
      fs.unlinkSync(path.join(__dirname, "../../../client/public/imgs/products", productId, imgSrcToDelete))
      const newProduct: ProductI | null = await Product.findByIdAndUpdate(productId, {
        $set: { thumbHover: req.file.filename }
      }, { new: true })
      return res.status(200).json(newProduct)
    }else{
      fs.unlinkSync(path.join(__dirname, "../../../client/public/imgs/products/", productId, req.file.filename))
      return res.status(400).json({ error: "Unknown image type"})
    }
  }catch(error){
    console.log(error)
    return res.status(400).json({ error: "Could not update image" })
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params
  try{
    // delete image directory
    const imagesDirectory: string = path.join(__dirname, "../../../client/public/imgs/products/", id)
    if(imagesDirectory){
      fs.rmdirSync(imagesDirectory, { recursive: true })
    }
    // delete document from database
    const product = await Product.findByIdAndDelete(id)
    return res.status(200).json(product)
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Could not delete product" })
  }
}

export const deleteImage: RequestHandler = async (req, res) => {
  const { productId, type } = req.params
  const { imageId } = req.query
  try{
    if(type === "images"){
      const product: ProductI | null = await Product.findOne({ "images._id": imageId }, { "images.$": 1 })
      if(!product){
        throw Error
      }
      fs.rmSync(path.join(__dirname, "../../../client/public/imgs/products/", productId, product.images[0].src))
      const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, {
        $pull: { images: { _id: imageId } }
      }, { new: true })
      return res.status(200).json(updatedProduct)
    }else if(type === "thumb"){
      const product: ProductI | null = await Product.findById(productId)
      if(!product){
        throw Error
      }
      fs.rmSync(path.join(__dirname, "../../../client/public/imgs/products/", productId, product.thumb))
      const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, {
        $unset: { thumb: "" }
      }, { new: true })
      return res.status(200).json(updatedProduct)
    }else if(type === "thumbHover"){
      const product: ProductI | null = await Product.findById(productId)
      if(!product){
        throw Error
      }
      fs.rmSync(path.join(__dirname, "../../../client/public/imgs/products/", productId, product.thumbHover))
      const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, {
        $unset: { thumbHover: "" }
      }, { new: true })
      return res.status(200).json(updatedProduct)
    }else{
      throw Error("Type of image not set")
    }
  }catch(error){
    console.log(error)
    return res.status(404).json({ error: "Failed to delete image" })
  }
}
