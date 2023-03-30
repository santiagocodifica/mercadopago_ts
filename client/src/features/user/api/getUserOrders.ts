import { useEffect, useState } from "react";
import { OrderI, UserI } from "../../../types/schemas";
import { useAuthContext } from "../../auth";

const getUserOrdersApi = async (user: UserI) => {
  const res = await fetch(`/api/v1/user/orders`, {
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

export const useGetUserOrders = () => {
  const { user } = useAuthContext()
  const [orders, setOrders] = useState<Array<OrderI> | null>(null)

  useEffect(() => {
    if(!user){
      return
    }
    getUserOrdersApi(user)
      .then(orders => {
        setOrders(orders)
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  return { orders }
}
