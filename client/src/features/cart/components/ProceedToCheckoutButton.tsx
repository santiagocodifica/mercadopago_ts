import { Link } from "react-router-dom"
import { AiOutlineArrowRight } from "react-icons/ai"

const ProceedToCheckoutButton = () => {
  return(
    <div className="fixed md:relative top-24 md:top-0 left-0 w-full p-4 md:p-0 md:place-content-end">
      <Link to="/prepareOrder" className="flex w-full md:w-fit md:float-right gap-10 place-items-center bg-secondary2 p-2 rounded text-lg hover:text-white hover:bg-primary1 transition-all">
        <span className="flex-grow text-left">Proceed to Checkout</span>
        <AiOutlineArrowRight />
      </Link>
    </div>
  )
}
export default ProceedToCheckoutButton
