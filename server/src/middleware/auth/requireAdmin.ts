import { RequestHandler } from "express"

const requireAdmin: RequestHandler = (req, res, next) => {
  if(!req.user){
    return res.status(401).json({ error: "You have to be logged in to access this page" })
  }
  if(req.user.role === "admin"){
    return next()
  }else{
    return res.status(401).json({ error: "Unauthorized user" })
  }
}
export default requireAdmin
