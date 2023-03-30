// import { loadMercadoPago } from "@mercadopago/sdk-js"
import { useMercadopago } from "react-sdk-mercadopago"
import { useState } from "react"
import { CheckoutDataI } from "../api/getCheckout"
import { useCreateOrder } from "../api/createOrder"

export interface CardFormI {
  amount: string
  cardholderEmail: string
  identificationNumber: string
  identificationType: string
  installments: string
  issuerId: string
  merchantAccountId: string | ""
  paymentMethodId: string
  processingMode: string
  token: string
}

export const useMercadopagoForm = () => {
  // import processPayment hook
  const { createOrder } = useCreateOrder()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // loadMercadoPago()
  const mp = useMercadopago.v2(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY_TEST, {
    locale: "es-UY"
  })

  const initMercadopagoForm = (checkoutData: CheckoutDataI) => {
    if(!mp){
      return
    }
    const cardForm = mp.cardForm({
      amount: ""+checkoutData.totalPrice,
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: { id: "cardNumber", placeholder: "Numero de tarjeta", },
        expirationDate: { id: "expirationDate", placeholder: "MM/YY", },
        securityCode: { id: "securityCode", placeholder: "Código de seguridad", },
        cardholderName: { id: "form-checkout__cardholderName", placeholder: "Titular de la tarjeta", },
        issuer: { id: "form-checkout__issuer", placeholder: "Banco emisor", },
        installments: { id: "form-checkout__installments", placeholder: "Cuotas", },        
        identificationType: { id: "form-checkout__identificationType", placeholder: "Tipo de documento", },
        identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "Número del documento", },
        cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "E-mail", },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if(error){ return console.warn("Form Mounted handling error: ", error)}
        },
        onSubmit: (event: any) => {
          event.preventDefault()
          const form: CardFormI = cardForm.getCardFormData()
          createOrder(checkoutData, form)
        },
        onFetching: () => {
          setIsLoading(true)
          return () => setIsLoading(false)
        },
        onValidityCheck: (error: any, event: any) => {
          console.log(error, event)
        },
        onError: (error: any) => {
          console.log(error)
        }
      }
    })
  }

  return { initMercadopagoForm, isLoading }
}
