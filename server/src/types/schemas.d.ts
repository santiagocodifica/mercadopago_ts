import mongoose, { Types, Model } from "mongoose"

export interface UserI extends mongoose.Document {
  name: string
  email: string
  phone: string
  password: string
  role: "customer" | "admin"
  orders: [Types.ObjectId]
  locations: Array<Location>
  preparedCheckout: {
    products?: Array<SubProductI>
    location?: Location
    totalPrice?: number
  }
}

export interface UserIModel extends Model<UserI> {
  login(email: string, password: string): Promise<UserI>
  signup(name: string, email: string, password1: string, password2: string): Promise<UserI>
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
  stock: Array<StockItem>
  thumb: string
  thumbHover: string
  images: [{
    src: string
  }]
}

export type StockItem = {
  _id: Types.ObjectId,
  size: string,
  amount: number
}

export interface SubProductI extends mongoose.Document {
  productId: Types.ObjectId 
  name: string
  price: number
  previousPrice?: number
  active: boolean
  smallDescription: string
  thumb: string
  size: string
  amount: number
}

export interface OrderI extends mongoose.Document {
  customer: {
    name: string
    email: string,
    phone?: string,
    location: Location
  }
  products: Array<SubProductI>
  totalPrice: number
  orderStatus: string
  mercadopagoData?: object 
}

export interface Location extends mongoose.Document {
  name: string
  country: "Uruguay"
  city: string
  address: string
  postalCode: string 
  comment?: string
}
