import { useState } from "react"
import { ProductI } from "../../../types/schemas"

const getProductApi = async (id: string) => {
  const URI = `/api/v1/product/${id}`
  const res = await fetch(URI, { method: "GET" })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useGetProduct = () => {
  const [product, setProduct] = useState<ProductI | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getProduct = (id: string) => {
    getProductApi(id)
      .then(prod => {
        setProduct(prod)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
  }

  return { product, getProduct, error }
}
