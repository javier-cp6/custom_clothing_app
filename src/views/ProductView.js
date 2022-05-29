import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"

import { getProduct } from "../services/productService"

import { CartContext } from "../context/cartContext"

export default function ProductView() {
  const [ product, setProduct] = useState(null)

  const {catId, prodId} = useParams()


  // const contexto = useContext(CartContext)
  // console.log(contexto)

  const { cartProds, addToCart } = useContext(CartContext)

  const addProduct = (e) => {
    e.preventDefault()
    console.log(e)
    addToCart(product)
    console.log(cartProds)
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
            {/* testing addProduct with fav button */}
            <button className="btn btn-danger ms-2 card-addfav" onClick= {(e) =>{addProduct(e)}}>+favs</button>
          </div>
          
          <div className="card-body">
            <h2 className="card-title">
              {product.prod_name}
              <span>{`__catId=${product.categoryId}`}</span>
            </h2>
            <p className="card-text">by {product.prod_designer}</p>
            <p className="card-text card-price">$ {product.prod_price}</p>
          </div>

          <form className="card-body" onSubmit={addProduct}>
            <div className="d-flex justify-content-between mb-4">
              <label>Choose size:</label>
              <div className="d-flex" onChange={(e) => {console.log(e.target.value)}}>
                {product.prod_size.map((item, i) => (
                  <div key={i}>
                    
                    <label className="btn btn-outline-dark">
                      <input type="radio"  name="size" value={item} className="btn-check"/>
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-4" onChange={(e) => {console.log(e.target.value)}}>
              <label>Choose color:</label>
              <div className="d-flex">
                {product.prod_color.map((item, i) => (
                  <div key={i}>
                    <label className="btn btn-outline-dark ms-2" style={{background: `${item}`, color: "transparent"}}>
                      <input type="radio" name="color" value={item} className="btn-check ms-2"></input>
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <label>Cantidad:</label>
              <input type="number" min="1"></input>
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {cartProds.map(({prod_name, prod_price, prod_id}, i) => (
              <tr key={i}>
                <td>{prod_name}</td>
                <td>{prod_price}</td>
                <td>{prod_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
