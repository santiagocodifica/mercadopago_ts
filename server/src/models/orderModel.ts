import mongoose from "mongoose";
import { subProductSchema } from "./productModel";
import { OrderI } from "../types/schemas";
import { locationSchema } from "./userModel";

const Schema = mongoose.Schema

const orderSchema = new Schema<OrderI>({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    location: locationSchema
  },
  products: [subProductSchema],
  totalPrice: { type: Number, required: true },
  orderStatus: { type: String, required: true, default: "ordered" },
  mercadopagoData: { type: Object, required: false }
},{ timestamps: true })

export default mongoose.model<OrderI>("order", orderSchema)
