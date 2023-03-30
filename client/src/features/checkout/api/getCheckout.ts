import { useEffect, useState } from "react";
import { Location, SubProductI, UserI } from "../../../types/schemas";
import { useAuthContext } from "../../auth";

const getCheckoutApi = async (user: UserI) => {
  const res = await fetch(`/api/v1/user/prepared-checkout`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export interface CheckoutDataI {
  products: Array<SubProductI>
  location: Location
  totalPrice: number
}

export const useGetCheckout = () => {
  const { user } = useAuthContext()
  const [checkoutData, setCheckoutData] = useState<CheckoutDataI | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    if(!user){
      setError("You must be logged in to acces checkout")
      return
    }
    getCheckoutApi(user)
      .then(data => {
        setCheckoutData(data)
        setIsLoading(false)
        setError(null)
      })
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  },[user])

  return { checkoutData, isLoading, error }
}
