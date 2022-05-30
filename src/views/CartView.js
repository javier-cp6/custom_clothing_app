import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export default function CartView() {
  const { cartProds } = useContext(CartContext)
  
  return (
    <div>
      <div>
        <h1 className="mb-4 text-center">Your order</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>id</th>
              <th>Size</th>
              <th>Color</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartProds.map((item, i) => (
              <tr key={i}>
                <td>{item.prod_name}</td>
                <td>{item.prod_price}</td>
                <td>{item.prod_id}</td>
                <td>{item.chosenSize}</td>
                <td>{item.chosenColor}</td>
                <td>{item.chosenQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
