import { Link } from "react-router-dom"
import NewEntryTag from "./NewEntryTag"

interface ProductCardI {
  thumb: string
  gender: string
  price: number
  previousPrice?: number
  name: string
  _id: string
  newEntry: boolean
}

const ProductCard = (props: ProductCardI) => {
  const product = props
  return(
    <Link to={`/product/${product._id}`}>
      <div className="relative">
        <img src={`/imgs/products/${ product._id }/${ product.thumb}`} />
        <NewEntryTag />
      </div>
      <div className="flex text-primary2 text-sm uppercase my-2">
        <span className="grow">{ product.gender }</span>
        <span>${ product.price }</span>
      </div>
      <h3 className="font-serif text-xl md:text-2xl">{ product.name }</h3>
    </Link>
  )
}
export default ProductCard
