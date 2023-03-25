import { ProductI, StockItem, SubProductI } from "../../../types/schemas";
import { findProductInCartIndex } from "./findProductInCartIndex";

export const checkProductAvailability = (product: ProductI, stockItem: StockItem | null, cart: Array<SubProductI> | null) => {
  if(!stockItem){ // there is no stockItem selected to check
    return false
  }
  if(stockItem.amount < 1){ // there is no stock
    return false
  }
  if(!cart){
    return true // no items on cart, and the stock amount is positive, nothing to check
  }

  const productInCartIndex = findProductInCartIndex(product, stockItem, cart)
  if(typeof productInCartIndex !== "number"){ // item is not in the cart
    return true
  }

  const productInCart = cart[productInCartIndex]
  if(productInCart.amount < stockItem.amount){
    return true
  }else{
    return false
  }
}
