import { useState, useEffect, createContext } from "react"

export const CartContext = createContext()

const CartContextProvider = (props) => {
    const [ cartProds, setCartProds ] = useState([])

    const updateCart = (product) => {
      setCartProds([...cartProds, product])
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
      <CartContext.Provider value={{cartProds, updateCart }} >
          {props.children}
      </CartContext.Provider>
    )
}

export default CartContextProvider