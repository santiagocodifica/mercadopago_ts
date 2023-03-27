import { Link } from "react-router-dom"
import { CartItemsList, ProceedToCheckoutButton, useCartContext } from "../features/cart"

const Cart = () => {
  const { cart } = useCartContext()

  return(
    <main className="p-4 md:p-8 mt-52">
      { cart && cart.length > 0
        ?
        <>
          <h2 className="uppercase text-primary2 mb-6">Products in Cart:</h2>
          <div className="md:grid md:grid-cols-2">
            <CartItemsList />
            <ProceedToCheckoutButton />
          </div>
        </>
        :
        <div>
          Your cart is empty, <Link to="/catalog" className="underline hover:text-primary2">go to the store</Link>.
        </div>
      }
    </main>
  )
}
export default Cart
