import { MercadoPagoResponse } from "mercadopago/utils/mercadopago-respose"
import mongoose, { Types } from "mongoose"

export interface UserI extends mongoose.Document {
  name: string
  email: string
  phone: string
  password: string
  role: "customer" | "admin"
  orders: [Types.ObjectId]
  locations: Array<Location>
  preparedCheckout: SubProduct | null
}

export interface ProductI extends mongoose.Document {
  name: string
  price: number
  previousPrice?: number
  active: boolean
  featured: boolean
  inHomeBanner: boolean
  newEntry: boolean
  onSale: boolean
  description: string
  smallDescription: string
  categories: Array<string>
  gender: "men" | "women" | "unisex"
  specifications: {
    color: string
    fit: string
    weight: string
  }
  stock: Array<stockItem>
  thumb: string
  thumbHover: string
  images: Array<string>
}

export type StockItem = {
  _id: Types.ObjectId,
  size: string,
  amount: number
}

export interface SubProductI extends mongoose.Document {
  _id: Types.ObjectId
  productId: Types.ObjectId
  name: string
  price: number
  previousPrice: number
  active: boolean
  smallDescription: string
  thumb: string
  size: string
  amount: number
}

export interface OrderI extends mongoose.Document {
  _id: Types.ObjectId,
  customer: {
    name: string
    email: string,
    phone?: string,
    location: Location
  }
  products: Array<SubProduct>
  totalPrice: number
  orderStatus: string
  mercadopagoData?: MercadoPagoResponse
}

export type Location = {
  name: string
  country: "Uruguay"
  city: string
  address: string
  postalCode: number
  comment?: string
}
