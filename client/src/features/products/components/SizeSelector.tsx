import { StockItem } from "../../../types/schemas"

interface SizeSelectorI {
  stock: Array<StockItem>
  selectedSize: StockItem | null
  setSelectedSize: React.Dispatch<React.SetStateAction<StockItem | null>>
}

const SizeSelector = ({ stock, setSelectedSize, selectedSize }: SizeSelectorI) => {

  const handleClick = (size: string, amount: number, _id: string) => {
    setSelectedSize({ size, amount, _id })
  }

  return(
    <ul className="flex gap-2 my-6 w-full flex-wrap">
      { stock.map(item => { return(
        <li
          key={item._id}
          className={`border border-primary1 py-2 px-3 text-lg rounded hover:bg-primary1 hover:text-white transition-all cursor-pointer ${ selectedSize &&  selectedSize.size === item.size ? "bg-primary1 text-white" : "" }`}
          onClick={() => handleClick(item.size, item.amount, item._id)}
        >
          { item.size }
        </li>
      )})}
    </ul>
  )
}
export default SizeSelector
