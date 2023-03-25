import { FeaturedProducts, HomeProduct, NewProducts } from "../features/products"

const Home = () => {
  return(
    <div className="">
      <HomeProduct />
      <div className="flex flex-col gap-40">
        <NewProducts />
        <FeaturedProducts />
      </div>
    </div>
  )
}
export default Home
