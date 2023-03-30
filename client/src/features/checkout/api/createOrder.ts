import { useNavigate } from "react-router-dom";
import { UserI } from "../../../types/schemas";
import { useAuthContext } from "../../auth";
import { useCartContext } from "../../cart";
import { CardFormI } from "../hooks/useMercadopagoForm";
import { CheckoutDataI } from "./getCheckout";

const createOrderApi = async (checkoutData: CheckoutDataI, cardForm: CardFormI, user: UserI) => {
  const res = await fetch(`/api/v1/order/mercadopago`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify({
      products: checkoutData.products,
      location: checkoutData.location,
      totalPrice: checkoutData.totalPrice,
      mercadopagoData: {
        token: cardForm.token,
        issuer_id: cardForm.issuerId,
        payment_method_id: cardForm.paymentMethodId,
        transaction_amount: checkoutData.totalPrice,
        installments: Number(cardForm.installments),
        description: "Product description...",
        payer: {
          email: cardForm.cardholderEmail,
          identification: {
            type: cardForm.identificationType,
            number: cardForm.identificationNumber
          }
        }
      }
    })
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useCreateOrder = () => {
  const { user } = useAuthContext()
  const { dispatch: cartDispatch } = useCartContext()
  const navigate = useNavigate()

  const createOrder = (checkoutData: CheckoutDataI, cardForm: CardFormI) => {
    if(!user){
      return
    }
    createOrderApi(checkoutData, cardForm, user)
      .then(() => {
        cartDispatch({ type: "CLEAR" })
        navigate("/success")
      })
      .catch(err => {
        navigate(`/error/?error=${ encodeURI(err) }`)
      })
  }

  return { createOrder }
}
