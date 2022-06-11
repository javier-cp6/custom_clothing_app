import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext"
import { AuthContext } from '../context/authContext'

export default function CartView() {
  const { cartProds, removeFromCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  const removeItem = (e, i) => {
    e.preventDefault()
    let cartTmp = [...cartProds]
    cartTmp.splice(i,1)
    removeFromCart(cartTmp)
  }

  const buyNow = () => {
    if(user){
      navigate('/')
    }else{
      navigate('/login')
    }
  }

  return (
    /*
    <div>
      <div>
        <h1 className="mb-4 text-center">Your order</h1>
        <table className="table table-hover">
          <thead>
            <div>
              <th className="col-3" >Design</th>
              <th className="col-5" Product</th>
              <th className="col-2">uantity</th>
              <th className="col-2">You pay</th>
            </div>          </thead>
          <tbody>
            {cartProds.map((item, i) => (
              <div key={i}>
                <div>
                  <p>Color: {item.chosenColor}</p>
                  <img src={item.prod_img} alt={item.prod_name} className="cart-img"/>
                </div>
                <div>
                  <div>
                    <h5>{item.prod_name}</h5>
                    <p>SKU ID: {item.prod_id}</p>
                    <p>Size: {item.chosenSize}</p>
                  </div>
                </div>
                <div>
                  <p>{item.chosenQuantity}</p>
                  <p>Unit price: $ {item.prod_price}</p>
                </div>
                <div>$ 100</div>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    */

    <div>
      <h1 className="mb-4 text-center">Your order</h1>
      <div className="row">
        <div className="d-flex flex-wrap mb-2 text-center border-bottom fw-bold">
          <div className="col-6 col-md-3 d-none d-sm-none d-md-block">Product</div>
          <div className="col-12 col-md-6">Details</div>
          <div className="col-2 col-md-3 d-none d-sm-none d-md-block">Quantity</div>
        </div>
        <div>
          {cartProds.map((item, i) => (
            <div key={i} className="d-flex flex-wrap mb-2 pb-2 border-bottom">
              <div className="col-12 col-md-3 text-center">
                <img src={item.prod_img} alt={item.prod_name} className="cart-img"/>
              </div>
              <div className="d-flex flex-wrap col-12 col-md-6 align-items-center">
                <h5 className="col-12">{item.prod_name}</h5>
                <div className="col-12">SKU ID: {item.prod_id}</div>
                <div className="d-flex col-12">
                  <div className="me-3">Size: {item.chosenSize}</div>
                  <div className="me-3">Color: {item.chosenColor}</div>
                  <button className="btn btn-link p-0" onClick={(e) => {removeItem(e, i)}}>Remove</button>
                </div>
              </div>
              <div className="d-flex flex-wrap col-12 col-md-3 text-center align-items-center">
                <div className="d-flex col-12 col-md-12">
                  <input type="number" value={item.chosenQuantity} className="col-3 col-md-3"></input>
                  <div className="ms-2">items</div>
                  <div className="col-6 col-md-6">Price: $ {item.prod_price}</div>
                </div>
                <div className="col-12 col-md-12">Subtotal: $ {item.chosenQuantity * item.prod_price}</div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="d-flex flex-wrap mb-2 text-center border-bottom fw-bold"> */}
          {/* <div className="col-12 col-md-8">Total</div> */}
          {/* <div className="col-6 col-md-2">## items</div> */}
          {/* <div className="col-6 col-md-2">$ 100</div> */}
        {/* </div> */}
        <div className="text-center">
          <button className="btn btn-dark btn-sm" onClick={buyNow}>
            Buy now
          </button>
        </div>
      </div>
    </div>
  )
}
