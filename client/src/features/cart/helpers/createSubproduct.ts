import { ProductI, StockItem, SubProductI } from "../../../types/schemas";

export const createSubproduct = (product: ProductI, stockItem: StockItem) => {

  const subproduct: SubProductI = {
    productId: product._id,
    name: product.name,
    price: product.price,
    previousPrice: product.previousPrice,
    active: product.active,
    smallDescription: product.smallDescription,
    thumb: product.thumb,
    size: stockItem.size,
    amount: 1,
    stock: stockItem.amount
  } 

  return subproduct
}
