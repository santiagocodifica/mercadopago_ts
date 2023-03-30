import { ProductI } from "../../../types/schemas"
import ProductCard from "../components/ProductCard"

interface ProductsListI {
  products: Array<ProductI>
}

const ProductsList = ({ products }: ProductsListI) => {
  return( products &&
    <ul className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
      { products.map(product => { return(
        <li key={product._id}>
          <ProductCard
            thumb={product.thumb}
            gender={product.gender}
            price={product.price}
            previousPrice={product.previousPrice}
            name={product.name}
            _id={product._id}
            newEntry={product.newEntry}
          />
        </li>
      )})} 
    </ul>
  )
}
export default ProductsList
