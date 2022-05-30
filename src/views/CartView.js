import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export default function CartView() {
  const { cartProds } = useContext(CartContext)
  
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
        <div className="d-flex flex-wrap text-center">
          <div className="col-6 col-lg-3">Design</div>
          <div className="col-6 col-lg-6">Product</div>
          <div className="col-2 col-lg-3">Quantity</div>
        </div>
        <div>
          {cartProds.map((item, i) => (
            <div key={i} className="d-flex flex-wrap mb-2 border-bottom">
              <div className="col-12 col-lg-3 text-center">
                <img src={item.prod_img} alt={item.prod_name} className="cart-img"/>
              </div>
              <div className="d-flex flex-wrap col-12 col-lg-6 align-items-lg-center">
                <h5 className="col-12">{item.prod_name}</h5>
                <p className="col-12">SKU ID: {item.prod_id}</p>
                <div className="d-flex col-12">
                  <p className="col-3">Size: {item.chosenSize}</p>
                  <p className="col-3">Color: {item.chosenColor}</p>
                </div>
                <button>Remove</button>
              </div>
              <div className="d-flex flex-wrap col-12 col-lg-3 text-center align-items-lg-center">
                <input type="number" value={item.chosenQuantity} className="col-3 col-lg-3"></input>
                <div></div>
                <div className="col-3">items</div>
                {/* <p className="col-6 col-lg-6">{item.chosenQuantity} items</p> */}
                <div className="col-6 col-lg-6">Price: $ {item.prod_price}</div>
                <div className="col-12 col-lg-12">Subtotal: $ {item.chosenQuantity * item.prod_price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
