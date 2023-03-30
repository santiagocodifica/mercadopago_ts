import { useAuthContext } from "../features/auth"
import { useGetUserOrders } from "../features/user"

const Account = () => {
  const { user } = useAuthContext()
  const { orders } = useGetUserOrders()
  return( user &&
    <main className="p-4 md:p-8">
      <h2 className="mt-40 mb-6 font-serif text-4xl">Hello { user.name }!</h2>
      <div className="md:w-2/3">
        <h3 className="uppercase text-sm font-medium mb-4">Your Orders</h3>
        { orders &&
          <ul className="border-t-2 border-primary1 flex flex-col gap-4 pt-4">
            { orders.map(order => { return(
              <li key={order._id} className="border-b-2 border-primary1 pb-12 md:grid md:grid-cols-3 gap-4">
                <ul className="flex flex-col gap-4 mb-4 md:col-span-2">
                  { order.products.map(product => { return(
                    <li key={product.productId + product.size} className="flex gap-4">
                      <img src={`/imgs/products/${product.productId}/${product.thumb}`} className="h-32" />
                      <div>
                        <h3 className="font-serif text-2xl">{product.name}</h3>
                        <span className="text-sm text-primary2">SIZE: {product.size} | AMOUNT: {product.amount}</span>
                        <br/>
                        <span className="font-medium">${product.price * product.amount}</span>
                      </div>
                    </li>
                  )})} 
                </ul>
                <div>
                  <p>
                    Date: <span className="text-primary2">{order.createdAt.substring(0, 10)}</span><br/>
                    Status: <span className="text-primary2">{order.orderStatus}</span><br/>
                  </p>
                  <h4 className="font-medium text-lg mt-2">Total: ${order.totalPrice}</h4>
                </div>
              </li>
            )})}
          </ul>
        }
      </div>
    </main>
  )
}
export default Account
