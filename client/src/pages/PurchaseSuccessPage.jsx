import "../styles/PurchaseSuccess.scss";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";

function PurchaseSuccessPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const { checkAuth } = useUserStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      checkAuth();
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing) return "Processing...";

  if (error) return `Error: ${error}`;

  return (
    <div className="purchaseSuccessPage">
      <div className="confetti">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
          style={{ zIndex: 99 }}
          numberOfPieces={700}
          recycle={false}
        />
      </div>
      <div className="successContainer">
        <div className="titleContainer">
          <h1>
            {" "}
            <CheckCircle /> Purchase Successful!
          </h1>
          <p>Thank you for your order. {"We're"} processing it now.</p>
          <p>Check your email for order details and updates.</p>
        </div>
        <div className="orderContainer">
          <div>
            <span>Order number</span>
            <span>#12345</span>
          </div>
          <div>
            <span>Estimated delivery</span>
            <span>3-5 business days</span>
          </div>
        </div>

        <Link className="btnContainer" to="/">
            <HandHeart size={18} />
            Thanks for trusting us!
            <span>
              Continue Shopping
            <ArrowRight size={18} />
              </span> 
        </Link>
      </div>
    </div>
  );
}

export default PurchaseSuccessPage;
