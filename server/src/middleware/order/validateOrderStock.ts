import { RequestHandler } from "express";
import { SubProductI } from "../../types/schemas";
import Product from "../../models/productModel"

export const validateOrderStock: RequestHandler = async (req, res, next) => {
  const products: Array<SubProductI> = req.body.products 
  try{
    // map every ordered product
    await Promise.all(products.map(async (orderedProduct: SubProductI) => {
      // select original product from db
      const dbProduct = await Product.findOne({ _id: orderedProduct.productId, "stock.size": orderedProduct.size }, {
        stock: { $elemMatch: { size: orderedProduct.size } }
      })
      if(!dbProduct){
        throw "Ooops! One of the products selected is no longer in our catalog"
      }
      // confirm the stock of said product
      const dbProductStock = dbProduct.stock[0]
      if(orderedProduct.amount > dbProductStock.amount){
        throw "Ooops! One of the products selected is out of stock at the moment"
      }
    }))
    // if everything runs without errors, continue
    return next()
  }catch(error){
    console.log(error)
    return res.status(404).json({ error })
  }
}
