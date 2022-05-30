import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import Swal from "sweetalert2"

import { getProduct } from "../services/productService"

import { CartContext } from "../context/cartContext"
import { FavsContext } from "../context/favsContext"

export default function ProductView() {
  const [ product, setProduct] = useState(null)
  const [ inputs, setInputs] = useState({})

  const {catId, prodId} = useParams()

  const { updateCart } = useContext(CartContext)
  const { favs, updateFavs } = useContext(FavsContext)

  const manageInputs = (e) => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value,
    });
  }

  const addToCart = (e) => {
    e.preventDefault()
    updateCart({...product, ...inputs})
    Swal.fire({
      icon:"success",
      title:"Your selection was added to cart!"
    })

  }

  useEffect(() => {
    const getProductData = async () => {
      try {
        const productData = await getProduct(catId, prodId)
        setProduct(productData)
      } catch (error) {
        throw error
      }
    }
    getProductData()
  },[])

  if(!product) {
    return <h4 className="text-center">Hold on... I'm thinking :p</h4>
  }


  return (
    <div>
      <div className="row mt-4">
        <div className="col-12 col-md-6 col-lg-6 mb-3">
          <div className="d-flex justify-content-center overflow-hidden">
            <img
              // className="img-fluid"
              src={product.prod_img}
              alt={product.prod_name}
            />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6 ">
          <div className="d-flex card-body justify-content-end">
            <button className="btn btn-danger ms-2 card-addfav">share*</button>
            <button className="btn btn-danger ms-2 card-addfav">+favs</button>
          </div>

          <div className="card-body">
            <h2 className="card-title">
              {product.prod_name}
              <span>{`__catId=${product.categoryId}`}</span>
            </h2>
            <p className="card-text">by {product.prod_designer}</p>
            <p className="card-text card-price">$ {product.prod_price}</p>
          </div>

          <form className="card-body" onSubmit={addToCart}>
            <div className="d-flex justify-content-between mb-4">
              <div>Choose size:</div>
              <div className="d-flex" onChange={(e) => {console.log(e.target.value)}}>
                {product.prod_size.map((item, i) => (
                  <div key={i}>
                    <input type="radio" id={`sizeId-${i}`} name="chosenSize" value={item} className="btn-check"
                    onChange={(e) => {manageInputs(e)}}
                    />
                    <label className="btn btn-outline-dark ms-3" htmlFor={`sizeId-${i}`}
                    >{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <p>Choose color:</p>
              <div className="d-flex" onChange={(e) => {console.log(e.target.value)}}>
                {product.prod_color.map((item, i) => (
                  <div key={i}>
                    <input type="radio" id={`colorId-${i}`} name="chosenColor" value={item} className="btn-check"
                    onChange={(e) => {manageInputs(e)}}
                    />
                    <label className="btn btn-outline-dark ms-3" htmlFor={`colorId-${i}`}
                    style={{background:`${item}`, color: "transparent"}}
                    >{item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <label>Quantity:</label>
              <input type="number" min="1" name="chosenQuantity" onChange={(e) => {manageInputs(e)}}></input>
            </div>
            <div className="text-center">
              <input type="submit" value="Add to cart" className="btn btn-danger"/>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h2 className="text-center">We also recommend</h2>
      </div>

      <div>
        <h1 className="mb-4 text-center">Your order</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {favs.map((item, i) => (
              <tr key={i}>
                <td>{item.prod_name}</td>
                <td>{item.prod_price}</td>
                <td>{item.prod_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </div>
  );
}
