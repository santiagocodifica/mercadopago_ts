import mongoose from "mongoose";
import { ProductI } from "../types/schemas";

const Schema = mongoose.Schema

export const subProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  previousPrice: { type: Number, required: true },
  active: { type: Boolean, required: true },
  smallDescription: { type: String, required: true },
  thumb: { type: String, required: true },
  size: { type: String, required: true },
  amount: { type: Number, required: true }
})

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  previousPrice: { type: Number, required: false },
  active: { type: Boolean, required: true, default: false },
  featured: { type: Boolean, required: true, default: false },
  inHomeBanner: { type: Boolean, required: true, default: false },
  newEntry: { type: Boolean, required: true, default: true },
  onSale: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  smallDescription: { type: String, required: true },
  categories: { type: Array, of: String, required: true },
  gender: { type: String, required: true },
  specifications: {
    color: { type: String, required: false },
    fit: { type: String, required: false },
    weight: { type: String, required: false }
  },
  stock: [{
    size: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  thumb: { type: String, required: true },
  thumbHover: { type: String, required: true },
  images: { type: Array, of: String, required: true }
})

export default mongoose.model<ProductI>("product", productSchema)
