import { useState } from "react"
import { LocationFormData } from "../../../types/schemas"
import { useModalsContext } from "../../modals"
import { useShippingLocation } from "../api/addShippingLocation"


const AddLocationForm = () => {
  const [name, setName] = useState<string>("")
  const [country] = useState<"Uruguay">("Uruguay")
  const [city, setCity] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [postalCode, setPostalCode] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const { addShippingLocation } = useShippingLocation()
  const { dispatch } = useModalsContext()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data: LocationFormData = { name, country, city, address, postalCode, comment }
    await addShippingLocation(data)
    dispatch({
      type: "CLOSE",
      payload: "addLocationModal"
    })
  }
  const handleCancel = () => {
    dispatch({
      type: "CLOSE",
      payload: "addLocationModal"
    })
  }

  return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 py-20 h-fit relative">
      <h3 className="mb-4 uppercase text-primary2">Add Shipping Location</h3>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Name:</label>
        <input
          type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type a name..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div> 
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Country:</label>
          <input
            type="text" value={country} disabled={true} placeholder="Type a country..."
            className="w-full border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
          />
        </div> 
        <div className="flex flex-col gap-2">
          <label className="font-medium">City:</label>
          <input
            type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Type a city..."
            className="w-full border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
          />
        </div> 
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Address:</label>
        <input
          type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Type an address..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div> 
      <div className="flex flex-col gap-2">
        <label className="font-medium">Postal Code:</label>
        <input
          type="number" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Type a postalCode..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div> 
      <div className="flex flex-col gap-2">
        <label className="font-medium">Comment (optional):</label>
        <input
          type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..."
          className="border border-primary3 focus:border-primary1 placeholder:text-primary3 p-2 outline-none rounded"
        />
      </div> 
      <div className="flex gap-2 mt-4">
        <button type="submit" className="p-2 border border-primary1 text-lg rounded grow">Create location</button>
        <button type="button" onClick={handleCancel} className="p-2 bg-primary3 text-lg rounded">Cancel</button>
      </div>
    </form>
  )
}
export default AddLocationForm
