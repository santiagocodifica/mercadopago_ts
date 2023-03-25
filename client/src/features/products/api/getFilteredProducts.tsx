import { useState } from "react"
import { ProductI } from "../../../types/schemas"

const filteredProductsApi = async (booleans: string, gender?: string) => {
  const encodedBooleans= encodeURIComponent(booleans)

  let URI = `/api/v1/product/filter/?booleans=${encodedBooleans}`
  if(typeof gender === "string"){
    URI = `/api/v1/product/filter/?booleans=${encodedBooleans}&gender=${gender}`
  }
  const res = await fetch(URI, { method: "GET" })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useGetFilteredProducts = () => {
  const [products, setProducts] = useState<Array<ProductI> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getProducts = (filter: string, gender?: string) => {
    filteredProductsApi(filter, gender)
      .then(products => {
        setProducts(products)
      })
      .catch(err => {
        setError(err)
      })
  }

  // useEffect(() => {
    // filteredProductsApi(filter, limit)
      // .then(products => {
        // setProducts(products) 
      // })
      // .catch(err => {
        // setError(err)
      // })
  // },[])

  return { getProducts, products, error }
}
