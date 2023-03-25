import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useGetFilteredProducts } from "../api/getFilteredProducts"
import NewEntryTag from "../components/NewEntryTag"

const HomeProduct = () => {
  const { getProducts, products } = useGetFilteredProducts()

  useEffect(() => {
    getProducts("inHomeBanner")
  },[])

  return( products &&
    <main className="w-full md:h-screen mt-40 md:mt-0 mb-40 md:mb-0 p-4 md:p-0 md:flex md:place-items-center md:place-content-center">
      { products.map((product) => { return(
        <div key={product._id} className="flex flex-col md:flex-row gap-4 md:w-2/3">
          <div className="relative flex-1">
            <img src={`/imgs/products/${product._id}/${product.thumb}`} className="w-full" />
            { product.newEntry && <NewEntryTag /> }
          </div>
          <div className="flex flex-col gap-4 md:w-2/3">
            <h5 className="uppercase text-primary2 text-sm">{ product.gender }</h5>
            <h2 className="font-serif font-normal text-4xl md:text-5xl">{ product.name }</h2>
            <p className="text-primary2">{ product.description }</p>
            <Link to={`product/${product._id}`} className="font-medium border-b border-primary1 place-self-start">DISCOVER PRODUCT</Link>
          </div>
        </div>
      )})}
    </main>
  )
}
export default HomeProduct
