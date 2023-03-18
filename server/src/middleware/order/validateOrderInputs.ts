import { RequestHandler } from "express";
import { Location, SubProductI } from "../../types/schemas";

export const validateOrderInputs: RequestHandler = async (req, res, next) => {
  try{
    const products: Array<SubProductI> = req.body.products
    const location: Location = req.body.location
    const totalPrice: number = req.body.totalPrice
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
