import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Location, SubProductI, UserI } from "../../../types/schemas";
import { useAuthContext } from "../../auth";

const prepareOrderApi = async (user: UserI, location: Location, products: Array<SubProductI>) => {
  const res = await fetch(`/api/v1/order/prepareOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify({ products, location })
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error;
  }
  return json
}

export const usePrepareOrder = () => {
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const prepareOrder = (location: Location | null, products?: Array<SubProductI> | null) => {
    if(!user){
      return
    }
    if(!location){
      setError("You must select a location")
      return
    }
    if(!products || products.length === 0){
      setError("There are no products in the cart")
      return
    }
    prepareOrderApi(user, location, products)
      .then(user => {
        dispatch({
          type: "UPDATE",
          payload: user
        })
        navigate("/checkout")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return { prepareOrder, error }
}
