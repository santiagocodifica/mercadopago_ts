export interface UserI {
  token: string
  id: string
  name: string
  email: string
  phone: string
  password: string
  role: "customer" | "admin"
  orders: [string]
  locations: Array<Location>
  preparedCheckout: {
    products?: Array<SubProductI>
    location?: Location
    totalPrice?: number
  }
}

export interface ProductI {
  _id: string
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
    src: string,
    _id: string
  }]
}

export type gender = "men" | "women" | "unisex"

export type StockItem = {
  _id: string
  size: string,
  amount: number
}

export interface SubProductI {
  _id: string // THIS IS WRONG, DELETE LATER
  productId: string
  name: string
  price: number
  previousPrice?: number
  active: boolean
  smallDescription: string
  thumb: string
  size: string
  amount: number
}

export interface OrderI {
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

export interface Location {
  name: string
  country: "Uruguay"
  city: string
  address: string
  postalCode: number
  comment?: string
}
