import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavsContext } from "../context/favsContext"

export default function ProductList({categories}) {
  const filtCategories = categories.filter((cat) => cat.products.length > 0);
  const arrProducts = filtCategories.map((item) => item.products).flat();

  const { favs, updateFavs } = useContext(FavsContext)

  const addToFavs = (e, {i}) => {
    console.log(arrProducts[i])
    e.preventDefault()
    updateFavs(arrProducts[i])
  }

  return (
    <div className="row mt-4 mx-auto">
      {arrProducts.map(({ prod_name, prod_designer, prod_img, prod_price, categoryId, prod_id }, i) => (
        // <div className="col-6 col-md-4" key={i}>
          <div className="card card-product mb-4 col-6 col-md-4" key={i}>
            <Link className="card-link" to={`/productdetails/${categoryId}/${prod_id}`}></Link>
            <img
              src={prod_img}
              className="card-img-top img-fluid"
              alt={prod_name}
            />
            <div className="card-body">
              <h5 className="card-title">{prod_name}</h5>
              <p className="card-text">by {prod_designer}</p>
              <p className="card-text card-price">$ {prod_price}</p>
            </div>
            <button className="btn mx-1 btn-card-addfav" onClick={(e)=> {addToFavs(e, {i})}}>
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        // </div>
      ))}
    </div>
  )
}
