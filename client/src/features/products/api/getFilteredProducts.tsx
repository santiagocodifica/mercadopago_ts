import { useEffect, useState } from "react"
import { ProductI } from "../../../types/schemas"

const filteredProductsApi = async (filter: string, limit: string) => {
  const encodedFilter = encodeURIComponent(filter)
  const res = await fetch(`/api/v1/product/filter/?filter=${encodedFilter}&limit=${limit}`, {
    method: "GET"
  })
  const json = await res.json()
  if(!res.ok){
    throw json.error
  }
  return json
}

export const useGetFilteredProducts = (filter: string, limit: string) => {
  const [products, setProducts] = useState<Array<ProductI> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    filteredProductsApi(filter, limit)
      .then(products => {
        setProducts(products) 
      })
      .catch(err => {
        setError(err)
      })
  },[])

  return { products, error }
}
