import { useState, useEffect, createContext } from "react"
import Swal from "sweetalert2"

export const CartContext = createContext()

const CartContextProvider = (props) => {
    const [ cartProds, setCartProds ] = useState([])

    const updateCart = (product) => {
      setCartProds([...cartProds, product])
      Swal.fire({
        icon:"success",
        title:"Your selection was added to your cart!"
      })
    }

    const removeFromCart = (products) => {
      setCartProds(products)
    }

    useEffect(() => {
      const cartStorage = JSON.parse(localStorage.getItem("cart_products"))
      if(cartStorage){
        setCartProds(cartStorage)
      }
    }, [])

    useEffect(() => {
      if(cartProds.length === 0) return
      localStorage.setItem("cart_products", JSON.stringify(cartProds))
    }, [cartProds])

    return (
      <CartContext.Provider value={{cartProds, updateCart, removeFromCart }} >
          {props.children}
      </CartContext.Provider>
    )
}

export default CartContextProvider