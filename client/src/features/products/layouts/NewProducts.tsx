import { useGetFilteredProducts } from "../api/getFilteredProducts"
import ProductCard from "../components/ProductCard"

const NewProducts = () => {

  const { products } = useGetFilteredProducts("active newEntry", "8")
  
  return(
    <section className="p-4 md:p-8">
      <header className="w-100 mb-12 flex flex-col md:flex-row place-items-baseline justify-between gap-8">
        <h2 className="w-100 text-6xl font-serif md:w-1/2 lg:w-1/3">The Latest of the New Arrival</h2>
        <span className="border-b border-primary1 md:place-self-end md:justify-end">SHOP MORE</span>
      </header>
      { products &&
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          { products.map(product => { return(
            <li key={ product._id }>
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
      }
    </section>
  )
}
export default NewProducts
