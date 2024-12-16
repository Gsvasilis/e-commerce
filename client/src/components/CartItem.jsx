import "../styles/CartItem.scss";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="cart-item">
      <div className="productContainer">
        <div className="imgContainer">
          <img src={item.image[0]} alt="" />
        </div>
        <div className="quantity">
          <span>Choose Quantity</span>
          <div className="btns">
            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
              <Minus />
            </button>
            <p>{item.quantity}</p>
            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
              <Plus />
            </button>
          </div>
        </div>
        <div className="price">
          <p>${item.price.toFixed(2)}</p>
          <p>{item.name}</p>
        </div>
        <div className="remove">
          <button onClick={() => removeFromCart(item._id)}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
