import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductImages, SizeSelector, useGetProduct } from "../features/products"
import { StockItem } from "../types/schemas"

const Product = () => {
  const { product, getProduct } = useGetProduct()
  const id: string | undefined = useParams().id

  const [selectedSize, setSelectedSize] = useState<StockItem | null>(null)

  useEffect(() => {
    if(id){
      getProduct(id)
    }
  },[])

  return( product &&
    <main className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4 md:p-8 pt-40 md:pt-40">
      <div className="md:col-span-4">
        <ProductImages product={product} />
      </div>
      <div className="flex flex-col gap-4 md:col-start-6 md:col-span-3">
        <header className="uppercase text-primary2">
          <span>{ product.gender } - { product.categories }</span>
        </header>
        <h2 className="font-serif text-5xl">{ product.name }</h2>
        <p className="text-primary2 leading-snug">{ product.description }</p>
        <SizeSelector stock={product.stock} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        <button className="border border-primary1">Add to cart</button>
      </div>
    </main>
  )
}
export default Product
