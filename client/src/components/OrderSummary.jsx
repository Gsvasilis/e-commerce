import "../styles/OrderSummary.scss"
import {useCartStore} from "../store/useCartStore"
import {loadStripe} from "@stripe/stripe-js"
import axios from "../lib/axios"

const stripePromise = loadStripe(
  "pk_test_51QKai1CzhPqnu5xvnLwkfm6bluGzfeDUfjnphPCctmhL6QKlCsfF5NDoHZAgwZP7vCrTAWrVYTftulawqdgYvYQv00luN5oVIk"
)

function OrderSummary() {

  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});
   

		if (result.error) {
			console.error("Error:", result.error);
		}
	};
  return (
    <div className="order-summary">
      <div className="orderContainer">
      <div className="title">
        <h2>Order Summary</h2>
      </div>
      <div className="order-price">
        <h4>Original Price</h4>
        <p>${formattedSubtotal}</p>
      </div>
      {savings > 0 && (
        <div className="savings">
          <h4>Savings</h4>
          <p>{formattedSavings}</p>
        </div>
      )}
      {coupon && isCouponApplied && (
        <div className="coupon">
          <h4>Coupon({coupon.code})</h4>
          <p>{coupon.discountPercentage}%</p>
        </div>
      )}
      <div className="total">
        <h4>Total</h4>
        <p>${formattedTotal}</p>
      </div>
      <button onClick={handlePayment}>Procced to Checkout</button>
      <div className="continue">
        <span>or</span>
       <a href="/">Continue Shopping</a>
      </div>
    </div>
    </div>
  )
}

export default OrderSummary