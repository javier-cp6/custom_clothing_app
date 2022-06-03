import { useContext } from "react"
import { Link } from "react-router-dom"

import { FavsContext } from "../context/favsContext"

export default function FavsView() {
  const { favs, updateFavs } = useContext(FavsContext)

  return (
    <div className="row mt-4 mx-auto">
      {favs.map(({ prod_name, prod_designer, prod_img, prod_price, categoryId, prod_id }, i) => (
        <div className="col-6 col-md-4" key={i}>
          <div className="card card-product mb-4">
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
            <button className="btn btn-dark btn-sm">
              View product
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

