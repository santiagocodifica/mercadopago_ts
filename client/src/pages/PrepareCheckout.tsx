import { useState } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../features/auth"
import { useCartContext } from "../features/cart"
import { useModalsContext } from "../features/modals"
import { AddLocationModal } from "../features/user"
import { Location } from "../types/schemas"

const PrepareCheckout = () => {
  const { user } = useAuthContext()
  const { cart } = useCartContext()
  const { dispatch } = useModalsContext()
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleAddLocation = () => {
    dispatch({ type: "OPEN", payload: "addLocationModal" })
  }

  const handleSubmit = () => {
    if(!selectedLocation){
      setError("You must select a shipping location")
      return
    }
    if(!cart || cart.length === 0){
      setError("There are no items selected in the cart")
      return
    }
    navigate("/payment")
  }

  return(
    <main className="p-4 md:p-8 mt-52">
      <AddLocationModal />
      <h2 className="uppercase text-primary2 mb-6">Shipping Locations</h2>
      <div className="md:grid md:grid-cols-2">
        <section>
          <h3 className="font-serif text-2xl">Choose a Shipping Location:</h3>
          <ul className="flex gap-2 my-4 place-items-center">
            { user && user.locations && user.locations.map(location => { return(
              <li
                key={ location._id }
                onClick={() => setSelectedLocation(location)}
                className={`p-2 border border-primary1 rounded cursor-pointer hover:bg-primary3 transition-all ${selectedLocation && selectedLocation._id === location._id && "bg-primary1 text-white"}`}>
                { location.name }
              </li>
            )})} 
            <li onClick={handleAddLocation} className="ml-2 font-medium underline cursor-pointer hover:text-primary3 transition-all">Add location</li>
          </ul>
          { selectedLocation && 
            <p className="text-sm text-primary2">
              { selectedLocation.name }<br/>
              { selectedLocation.city}, { selectedLocation.country }<br/>
              { selectedLocation.address }<br/>
              { selectedLocation.postalCode }
            </p>
          }
        </section>
        <div className="fixed flex flex-col md:relative top-24 md:top-0 left-0 md:left-auto w-full p-4 md:p-0 text-right">
          <button onClick={handleSubmit} className="flex w-full md:w-fit gap-10 place-items-center place-self-end bg-secondary2 p-2 rounded text-lg">
            <span className="flex-grow text-left">Proceed to Payment</span>
            <AiOutlineArrowRight />
          </button>
          { error &&
            <span className="mt-4 text-secondary1">{ error }</span>
          } 
        </div>
      </div>
    </main>
  )
}
export default PrepareCheckout
