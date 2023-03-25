import { ProductI } from "../../../types/schemas"

interface ProductImagesI {
  product: ProductI
}

const ProductImages = ({ product }: ProductImagesI) => {
  return( product &&
    <ul className="flex gap-4 overflow-x-auto nowrap md:grid md:grid-cols-2">
      { product.images.map(img => { return(
        <li key={img._id} className="flex-shrink-0 flex-grow-0">
          <img src={`/imgs/products/${product._id}/${img.src}`} className="h-72 md:h-auto" />
        </li>
      )})}
    </ul>
  )
}
export default ProductImages
