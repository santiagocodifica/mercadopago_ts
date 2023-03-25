import { useGetFilteredProducts } from "../api/getFilteredProducts"

const HomeProduct = () => {
  const { products } = useGetFilteredProducts("inHomeBanner", "1")
  return( products &&
    <div>
      { products.map((product) => { return(
        <div key={product._id}>
          {product.name}
        </div>
      )})}
    </div>
  )
}
export default HomeProduct
