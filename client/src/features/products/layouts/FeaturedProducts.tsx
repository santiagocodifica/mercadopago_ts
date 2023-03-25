import { useEffect } from "react"
import { useGetFilteredProducts } from "../api/getFilteredProducts"
import ProductsList from "./ProductsList"

const FeturedProducts = () => {

  const { getProducts, products } = useGetFilteredProducts()

  useEffect(() => {
    getProducts("active featured") 
  },[])
  
  return(
    <section className="p-4 md:p-8">
      <header className="w-100 mb-12 flex flex-col md:flex-row place-items-baseline justify-between gap-8">
        <h2 className="w-100 text-6xl font-serif md:w-1/2 lg:w-2/5">Everyone's favorites</h2>
        <span className="border-b border-primary1 md:place-self-end md:justify-end">SHOP MORE</span>
      </header>
      { products &&
        <ProductsList products={products} />
      }
    </section>
  )
}
export default FeturedProducts
