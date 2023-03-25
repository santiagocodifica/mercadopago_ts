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
    
  }

  return(
    <button className="flex">
      <span>Add to cart</span>
      <AiOutlinePlus />
    </button>
  )
}
export default AddToCartButton
