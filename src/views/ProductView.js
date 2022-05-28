import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import { getProduct } from "../services/productService"

export default function ProductView() {
  const [ product, setProduct] = useState(null)

  const {catId, prodId} = useParams()

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
              className="img-detalle"
              src={product.prod_img}
              alt={product.prod_name}
            />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6 ">
          <div>
            <button className="btn btn-danger card-addfav">share*</button>
            <button className="btn btn-danger card-addfav">+favs</button>
          </div>
          
          <div className="card-body">
            <h2 className="card-title">
              {product.prod_name}
              <span>{`__catId=${product.categoryId}`}</span>
            </h2>
            <p className="card-text">by {product.prod_designer}</p>
            <p className="card-text card-price">$ {product.prod_price}</p>
          </div>

          <form>
            <div>
              <label>Choose size:</label>
              {product.prod_size.map((item, i) => (
                <button key={i}>{item}</button>
              ))}
            </div>
            <div>
              <label>Choose color:</label>
              {product.prod_color.map((item, i) => (
                <button key={i} style={{background: `${item}`}}>*</button>
              ))}
            </div>
            <div>
              <label>Cantidad:</label>
              <input type="number"></input>
            </div>
            <input type="submit" value="Add to cart" className="btn btn-danger"/>
          </form>
        </div>
      </div>

      
    </div>
  );
}
