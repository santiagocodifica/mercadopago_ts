import { useModalsContext } from "../../modals"
import AddLocationForm from "../components/AddLocationForm"

const AddLocationModal = () => {
  const { addLocationModal } = useModalsContext()
  return(
    <div className={`${ addLocationModal.isOpen ? "z-20" : "-z-10 hidden" } fixed top-0 w-screen min-h-full max-h-full bg-white flex px-4 md:px-8 place-content-center overflow-scroll`}>
      <AddLocationForm />
    </div>
  )
}
export default AddLocationModal
