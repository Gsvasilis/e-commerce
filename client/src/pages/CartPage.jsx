import "../styles/CartPage.scss"
import {useCartStore} from "../store/useCartStore"
import CartItem from "../components/CartItem"
import {Link} from "react-router-dom"
import {ShoppingCart} from "lucide-react"
import OrderSummary from "../components/OrderSummary"
import GiftCouponCard from "../components/GiftCouponCard"

function CartPage() {

  const {cart} = useCartStore()

  return (
    <div className="cart-page">
      <div className="left">
       <div className="cartContainer">
        {cart.length === 0 ?(
          <div className="cart-empty">
            <EmptyCartUI/>
          </div>
        ):(
          <div className="cart-item">
            {cart.map((item)=>(
              <CartItem key={item._id} item={item}/>
            ))}
          </div>
        )}
      </div>
      </div>
      {cart.length > 0 && (
          <div className="right">
        <div className="order">
          <OrderSummary/>
        </div>
        <div className="coupon">
          <GiftCouponCard/>
        </div>
      </div>
      )}
    
    </div>
  )
}

export default CartPage


const EmptyCartUI = ()=>(
  <div className="emptyContainer">
    <ShoppingCart size={100}/>
    <h3>Your cart is empty</h3>
    <p>Looks Like you havent added anything to your cart yet</p>
      <Link to="/">
      <button>Start Shoppping</button>
      </Link>
  </div>
)