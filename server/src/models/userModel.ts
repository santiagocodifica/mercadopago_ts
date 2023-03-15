import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import { UserI } from "../types/schemas";
import { subProductSchema } from "./productModel";

const Schema = mongoose.Schema

export const locationSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: Number, required: true },
  comment: { type: String, required: false }
})

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "customer" },
  orders: [{ type: Schema.Types.ObjectId, required: false }],
  locations: [locationSchema],
  preparedCheckout: [subProductSchema]
})

userSchema.statics.signup = async function(name, email, password1, password2){
  if(!name || !email || !password1 || !password2){
    throw Error("Rellenar todos los campos")
  }
  if(password1 !== password2){
    throw Error("Contraseñas no coinciden")
  }
  if(!validator.isEmail(email)){
    throw Error("Email no válido")
  }
  if(!validator.isStrongPassword(password1)){
    throw Error("La contraseña es muy débil")
  }

  const exists = await this.findOne({ email })
  if(exists){
    throw Error("El email ingresado ya está en uso")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password1, salt)

  const user: UserI = await this.create({ name, email, password: hash })

  return user
}

userSchema.statics.login = async function(email, password){
  if(!email || !password){ throw Error("Deben rellenarse todos los campos") }

  const user: UserI = await this.findOne({ email })
  if(!user){
    throw Error("Email incorrecto")
  }

  const match = await bcrypt.compare(password, user.password)
  if(!match){
    throw Error("Contraseña incorrecta")
  }

  return user
}

export default mongoose.model<UserI>("user", userSchema)
