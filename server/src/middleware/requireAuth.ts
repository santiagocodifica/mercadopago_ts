import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import User from "../models/userModel"

const requireAuth: RequestHandler = async (req, res, next) => {
  const authorization = req.headers["authorization"]
  if(!authorization){
    return res.status(401).json({ error: "Usuario no autorizado" })
  }

  const bearer = authorization.split(" ")
  const token = bearer[1]

  try{
    if(!process.env.SECRET){
      throw Error("Token secret not set")
    }
    const { _id } = jwt.verify(token, process.env.SECRET) as { _id: string }
    const user = await User.findOne({ _id })
    req.user = user
    return next()
  }catch(error){
    console.log(error)
    return res.status(401).json({ error: "Usuario no autorizado"})
  }
}

export default requireAuth
