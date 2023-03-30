import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../features/auth"
import { useGetCheckout, useMercadopagoForm } from "../features/checkout"

const Checkout = () => {
  const { checkoutData, isLoading, error } = useGetCheckout()
  const { initMercadopagoForm, isLoading: isFormLoading } = useMercadopagoForm()
  const { user } = useAuthContext()

  useEffect(() => {
    checkoutData && initMercadopagoForm(checkoutData) 
  },[checkoutData])

  return(
    <main className="flex place-content-center px-4">
      <form id="form-checkout" className="flex flex-col gap-4 w-96 py-20 h-fil relative">
        <h2 className="text-primary2 mb-10">NEW ARRIVED PAYMENT</h2>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Card Number:</label>
          <div id="cardNumber" className="border border-primary3 rounded p-2 h-12 focus:border-primary1"></div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label className="font-medium">CVV:</label>
            <div id="securityCode" className="border border-primary3 rounded p-2 h-12 focus:border-primary1"></div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Valid thru:</label>
            <div id="expirationDate" className="border border-primary3 rounded p-2 h-12 focus:border-primary1"></div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/4">
            <label className="font-medium">Document:</label>
            <select id="form-checkout__identificationType" className="border border-primary3 rounded p-2 h-12"></select>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <label className="font-medium">Document Number:</label>
            <input type="text" id="form-checkout__identificationNumber" className="border border-primary3 rounded p-2 h-12" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Full Name:</label>
          <input type="text" id="form-checkout__cardholderName" className="border border-primary3 rounded p-2 h-12" />
        </div>
        <select id="form-checkout__issuer" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4 hidden"></select>
        <select id="form-checkout__installments" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4 hidden"></select>
        <input type="email" id="form-checkout__cardholderEmail" onChange={() => {}} className="h-10 w-auto bg-gray-100 p-2 rounded mb-4 hidden" value={user?.email} />
        <div className="flex gap-4 place-items-center mt-10 font-medium text-lg">
          <span>Total: ${ checkoutData?.totalPrice }</span>
          <button type="submit" id="form-checkout__submit" className="grow p-3 bg-secondary2 rounded-md hover:bg-primary1 hover:text-white hover:rounded-none transition-all">PAY</button>
          <Link to="/cart" type="button" className="p-3 bg-primary3 rounded-md hover:bg-primary1 hover:text-white hover:rounded-none transition-all">Cancel</Link>
        </div>
      </form>
    </main>
  )
}
export default Checkout
