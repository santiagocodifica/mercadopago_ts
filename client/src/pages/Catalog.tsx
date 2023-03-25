import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useGetFilteredProducts } from "../features/products"
import ProductsList from "../features/products/layouts/ProductsList"
import { gender } from "../types/schemas"

const Catalog = () => {
  const [ searchParams ] = useSearchParams()
  const { products, getProducts } = useGetFilteredProducts()

  useEffect(() => {
    if(searchParams.get("gender") && (searchParams.get("gender") === "men" || searchParams.get("gender") === "women")){
      getProducts(`active`, searchParams.get("gender") as gender)
    }else{
      getProducts(`active`)
    }
  },[searchParams])

  return(
    <main className="p-4 md:p-8">
      <h2 className="mt-40 md:mt-60 font-serif text-5xl mb-20">Selected sneakers for everyone</h2>
      { products &&
        <ProductsList products={products} />
      }
    </main>
  )
}
export default Catalog
