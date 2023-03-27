import { SubProductI } from "../../../types/schemas"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useCartContext } from "../hooks/useCartContext"

interface CartProductCard {
  subproduct: SubProductI
}
const CartProductCard = ({ subproduct }: CartProductCard) => {
  const { dispatch } = useCartContext()

  const handleIncrease = () => {
    dispatch({
      type: "INCREASE_PRODUCT",
      payload: subproduct
    })
  }

  const handleDecrease = () => {
    dispatch({
      type: "DECREASE_PRODUCT",
      payload: subproduct
    })
  }

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: subproduct
    })
  }

  return(
    <li className="flex flex-col md:flex-row gap-4">
      <img src={`/imgs/products/${subproduct.productId}/${subproduct.thumb}`} className="w-1/3" />
      <section className="flex flex-col gap-2">
        <h3 className="font-serif text-3xl">{ subproduct.name }</h3>
        <span className="text-primary2">SIZE: { subproduct.size } | AMOUNT: { subproduct.amount }</span>
        <div className="flex gap-2 place-items-center text-lg mt-2">
          <button className="border border-primary1 p-3 rounded" onClick={handleIncrease}><AiOutlinePlus /></button>
          <button className="border border-primary1 p-3 rounded" onClick={handleDecrease}><AiOutlineMinus /></button>
          <button className="text-sm uppercase ml-2 font-medium underline" onClick={handleRemove}>Remove from Cart</button>
        </div>
      </section>
    </li>
  )
}
export default CartProductCard
