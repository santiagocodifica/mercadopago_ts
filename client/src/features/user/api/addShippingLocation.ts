import { Location, UserI } from "../../../types/schemas"
import { useAuthContext } from "../../auth"

const addShippingLocationApi = async (user: UserI, data: Location) => {
  const res = await fetch(`/api/v1/user/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify(data)
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useShippingLocation = () => {
  const { user, dispatch } = useAuthContext()
  
  const addShippingLocation = async (data: Location) => {
    if(!user){
      return
    }
    await addShippingLocationApi(user, data)
      .then(user => {
        dispatch({
          type: "UPDATE",
          payload: user
        }) 
      })
      .catch(err => {
        console.log(err)
      })
  }

  return { addShippingLocation }
}
