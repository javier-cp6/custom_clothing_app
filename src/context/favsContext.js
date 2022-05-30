import { useState, useEffect, createContext } from "react"
import CartContextProvider from "./cartContext";

export const FavsContext = createContext()

const FavsContextProvider = (props) => {
  const [ favs, setFavs ] = useState([])

  const updateFavs = (product) => {
    setFavs([...favs, product])
  }

  useEffect(() => {
    const favsStorage = JSON.parse(localStorage.getItem("fav_products"))
    if(favsStorage){
      setFavs(favsStorage)
    }
  }, [])

  useEffect(() => {
    if(favs.length === 0) return
    localStorage.setItem("fav_products", JSON.stringify(favs))
  }, [favs])

  return (
    <FavsContext.Provider value={{ favs, updateFavs }}>
      {props.children}
    </FavsContext.Provider>
  )
}

export default FavsContextProvider
