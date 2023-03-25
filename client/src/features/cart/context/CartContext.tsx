import { createContext, useEffect, useReducer } from "react";
import { ProductI, StockItem, SubProductI } from "../../../types/schemas";
import { createSubproduct } from "../helpers/createSubproduct";
import { findProductInCartIndex } from "../helpers/findProductInCartIndex";

interface CartContextI {
  cart: Array<SubProductI> | null
  dispatch: React.Dispatch<Action>
}
type State = {
  cart: Array<SubProductI> | null 
}
type Action = 
| { type: "SET", payload: Array<SubProductI> }
| { type: "CLEAR" }
| { type: "ADD_PRODUCT", payload: { product: ProductI, stockItem: StockItem }}
| { type: "DECREASE_PRODUCT", payload: SubProductI }
| { type: "REMOVE_PRODUCT", payload: SubProductI }

export const CartContext = createContext<CartContextI>({ cart: null, dispatch: () => null })

const cartReducer = (state: State, action: Action) => {
  switch(action.type){
    case "SET": {
      const cart = action.payload
      localStorage.setItem("cart", JSON.stringify(cart))
      return { cart }
    }
    case "CLEAR": {
      localStorage.removeItem("cart")
      return { cart: null }
    }
    case "ADD_PRODUCT": {
      const product = action.payload.product
      const stockItem = action.payload.stockItem
      const productInCartIndex: number | null = findProductInCartIndex(product, stockItem, state.cart)
      // Should find a cleaner way to handle this with more helper functions
      if(typeof productInCartIndex === "number"){ // add 1
        const updatedCart = [...state.cart || []] // risky line, I know that the ...state.cart is valid because I check it in the findProductInCart function.
        const updatedSubproduct: SubProductI = { ...updatedCart[productInCartIndex] }
        if(updatedSubproduct.amount < stockItem.amount){
          updatedSubproduct.amount ++
        }
        updatedCart[productInCartIndex] = updatedSubproduct
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        return { cart: updatedCart }
      }else{ // insert new subproduct
        const subproduct = createSubproduct(product, stockItem)
        // multiple posibilities
        if(state.cart && stockItem.amount > 0){// add new item
          localStorage.setItem("cart", JSON.stringify([subproduct, ...state.cart]))
          return { cart: [subproduct, ...state.cart] }
        }else if(state.cart && stockItem.amount <= 0){ // maintain current cart
          localStorage.setItem("cart", JSON.stringify(state.cart))
          return { cart: state.cart }
        }else if(!state.cart && stockItem.amount > 0){ // cart is empty and we have to push new item
          localStorage.setItem("cart", JSON.stringify([subproduct]))
          return { cart: [subproduct] }
        }else{ // the cart is empty and there is no stock
          localStorage.removeItem("cart")
          return { cart: null }
        }
      }
    }
    case "DECREASE_PRODUCT": {
      if(!state.cart){ // this would mean the cart is empty...
        return { cart: null }
      }
      const subproductToDecrease = action.payload
      const updatedCart: Array<SubProductI> = state.cart.map(subproduct => {
        // if _ids are the same, return an updated subproduct
        if(subproduct._id === subproductToDecrease._id && subproduct.amount > 1){
          // we are in current subproduct and with amount > 1
          const updatedProduct = subproduct
          const newAmount = subproduct.amount - 1
          updatedProduct.amount = newAmount
          return updatedProduct
        }else{
          // this product should not be changed, return the same
          return subproduct
        }
      })
      return { cart: updatedCart }
    }
    case "REMOVE_PRODUCT": {
      if(!state.cart){ // this would mean the cart is empty...
        return { cart: null }
      }
      const productToDelete: SubProductI = action.payload
      const updatedCart: Array<SubProductI> = state.cart.filter(subproduct => subproduct._id !== productToDelete._id)
      return { cart: updatedCart }
    }
    default: return state
  }
}

type CartContextProviderI = {
  children: React.ReactNode
}

export const CartContextProvider = ({ children }: CartContextProviderI) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: null })

  console.log(state)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart") 
    if(storedCart){
      const cart: Array<SubProductI> = JSON.parse(storedCart)
      dispatch({ type: "SET", payload: cart })
    }
  },[])

  return(
    <CartContext.Provider value={ { ...state, dispatch } }>
      { children }
    </CartContext.Provider>
  )
}
