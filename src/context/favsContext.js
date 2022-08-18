import { useState, useEffect, createContext } from "react"
import Swal from "sweetalert2"

export const FavsContext = createContext()

const FavsContextProvider = (props) => {
  const [ favs, setFavs ] = useState([])

  // const updateFavs = (product) => {
  //   setFavs([...favs, product])
  // }
  const updateFavs = (product) => {
    if(favs.filter((item) => item.prod_id === product.prod_id).length > 0) return
    setFavs([...favs, product])
    Swal.fire({
      icon:"success",
      title:"Your selection was added to your favorites!"
    })
  }

  const removeFromFavs = (products) => {
    setFavs(products)
  }

  useEffect(() => {
    const favsStorage = JSON.parse(localStorage.getItem("fav_products"))
    if(favsStorage){
      setFavs(favsStorage)
    }
  }, [])

  useEffect(() => {
    if(favs.length === 0) {
      localStorage.removeItem("fav_products")
    } else {
    localStorage.setItem("fav_products", JSON.stringify(favs))
    }
  }, [favs])

  return (
    <FavsContext.Provider value={{ favs, updateFavs, removeFromFavs }}>
      {props.children}
    </FavsContext.Provider>
  )
}

export default FavsContextProvider
