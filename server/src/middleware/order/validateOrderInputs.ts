import { NextFunction, Request, Response } from "express";
import { Location, SubProductI } from "../../types/schemas";

export const validateOrderInputs = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const products: Array<SubProductI> = req.body.products
    const location: Location = req.body.location
    const totalPrice: number = req.body.totalPrice
    if(!req.user){
      throw "User not logged in"
    }
    if(!products || products.length === 0 || !location || !totalPrice || totalPrice <= 0){
      throw "Missing inputs to proceed with payment"
    }
    if(!location.name || !location.country || !location.city || !location.address || !location.postalCode){
      throw "Missing shiping information"
    }
    return next()
  }catch(error){
    console.log(error)
    return res.status(401).json({ error })
  }
}
