import { SubProductI } from "../../../types/schemas";

export const findSubproductInCartIndex = (subproductToFind: SubProductI, cart: Array<SubProductI> | null) => {
  if(!cart){
    return null
  }

  const cartIndex = cart.findIndex((subproduct: SubProductI) => subproduct.productId === subproductToFind.productId && subproduct.size === subproductToFind.size)

  if(cartIndex >= 0){
    return cartIndex
  }else{
    return null
  }
}
