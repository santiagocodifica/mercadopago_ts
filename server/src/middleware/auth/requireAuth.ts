import { RequestHandler, Request } from "express"
import jwt from "jsonwebtoken"
import User from "../../models/userModel"
import { UserI } from "../../types/schemas"

const requireAuth: RequestHandler = async (req: Request, res, next) => {
  const authorization: string | undefined = req.headers["authorization"]
  if(!authorization){
    return res.status(401).json({ error: "User not authorized" })
  }

  const bearer = authorization.split(" ")
  const token: string = bearer[1]

  try{
    if(!process.env.SECRET){
      throw Error("Token secret not set")
    }
    const { _id } = jwt.verify(token, process.env.SECRET) as { _id: string }
    const user: UserI | null = await User.findOne({ _id })
    if(!user){
      throw Error("User not authorized")
    }
    req.user = user
    return next()
  }catch(error){
    console.log(error)
    return res.status(401).json({ error: "User not authorized" })
  }
}

export default requireAuth
