import { MercadoPagoResponse } from "mercadopago/utils/mercadopago-respose"
import { Types } from "mongoose"

export interface UserI {
  name: string
  email: string
  phone: string
  password: string
  role: "customer" | "admin"
  orders: [Types.ObjectId]
  locations: array<Location> // set this type
  preparedCheckout: array<SubProduct> // set this type
}

export interface ProductI {
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
  categories: array<string>
  gender: "men" | "women" | "unisex"
  specifications: {
    color: string
    fit: string
    weight: string
  }
  stock: [{
    size: string
    amount: number
  }]
  thumb: string
  thumbHover: string
  images: array<string>
}

export interface SubProductI {
  name: string
  price: number
  previousPrice: number
  active: boolean
  smallDescription: string
  thumb: string
  size: string
  amount: number
}

export interface OrderI {
  date: Date
  customer: {
    name: string
    email: string,
    phone?: string,
    location: Location
  }
  products: array<SubProduct>
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
