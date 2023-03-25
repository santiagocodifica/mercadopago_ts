import { AiOutlinePlus } from "react-icons/ai"
import { ProductI, StockItem } from "../../../types/schemas"
import { useCartContext } from "../hooks/useCartContext"

interface AddToCartButtonI {
  product: ProductI
  stockItem: StockItem | null
}

const AddToCartButton = ({ product, stockItem }: AddToCartButtonI) => {
  const { dispatch } = useCartContext()

  const handleClick = () => {
    if(!stockItem){
      return
    }
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        product: product,
        stockItem: stockItem
      }
    })    
  }

  return(
    <button
      className={`flex gap-8 border border-primary1 rounded p-2 w-fit place-items-center hover:bg-primary1 hover:text-white transition-all`}
      disabled={stockItem ? false : true}
      onClick={handleClick}
    >
      <span>Add to cart</span>
      <AiOutlinePlus />
    </button>
  )
}
export default AddToCartButton
