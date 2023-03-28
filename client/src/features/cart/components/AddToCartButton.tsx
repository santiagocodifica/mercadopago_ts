import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { ProductI, StockItem } from "../../../types/schemas"
import { checkProductAvailability } from "../helpers/checkProductAvailability"
import { useCartContext } from "../hooks/useCartContext"

interface AddToCartButtonI {
  product: ProductI
  selectedStockItem: StockItem | null
}

const AddToCartButton = ({ product, selectedStockItem}: AddToCartButtonI) => {
  const { cart, dispatch } = useCartContext()
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    setIsActive(checkProductAvailability(product, selectedStockItem, cart))
  },[selectedStockItem, cart])

  const handleClick = () => {
    if(!selectedStockItem){
      return
    }
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        product: product,
        stockItem: selectedStockItem 
      }
    })
  }

 return (
    <button
      className={`
        ${isActive ? "hover:bg-primary1 hover:text-white" : "border-primary3 text-primary3"}
        flex gap-8 text-lg border border-primary1 rounded p-3 w-full md:w-fit justify-between place-items-center transition-all
      `}
      disabled={isActive ? false : true}
      onClick={handleClick}
    >
      <span>Add to cart</span>
      <AiOutlinePlus />
    </button>
  )
}
export default AddToCartButton
