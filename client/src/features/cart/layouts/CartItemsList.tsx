import CartProductCard from "../components/CartProductCard"
import { useCartContext } from "../hooks/useCartContext"

const CartItemsList = () => {

  const { cart } = useCartContext()

  return( cart &&
    <ul className="flex flex-col gap-20">
      { cart.map(subproduct => { return(
        <CartProductCard subproduct={subproduct} key={subproduct.productId + subproduct.size} />          
      )})}
    </ul>
  )
}
export default CartItemsList
