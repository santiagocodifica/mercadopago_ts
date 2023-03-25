import { ProductI, StockItem, SubProductI } from "../../../types/schemas";

export const findProductInCartIndex = (product: ProductI, stockItem: StockItem, cart: Array<SubProductI> | null) => {
  if(!cart){
    return null
  }

  const productInCartIndex = cart.findIndex((subproduct: SubProductI) => {
    subproduct.productId === product._id && stockItem.size === subproduct.size
  })

  if(productInCartIndex > 0){
    return productInCartIndex
  }else{
    return null
  }
}
