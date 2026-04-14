import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function Cart() {

  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>

      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map(item => (
          <div key={item.id}>
            {item.name} - ₹{item.price}

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Cart;