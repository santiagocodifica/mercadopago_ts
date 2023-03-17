import { RequestHandler } from "express"

const requireAdmin: RequestHandler = (req, res, next) => {
  if(!req.user){
    return res.status(401).json({ error: "No tienes los permisos necesarios" })
  }
  if(req.user.role === "admin"){
    return next()
  }else{
    return res.status(401).json({ error: "No tienes los permisos necesarios" })
  }
}
export default requireAdmin
