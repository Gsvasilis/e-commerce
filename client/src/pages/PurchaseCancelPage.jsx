import "../styles/PurchaseCancelPage.scss";
import { Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";

function PurchaseCancelPage() {
  return (
    <div className="purchaseCancelPage">
      <div className="cancelContainer">
        <div className="titleContainer">
        
        <h1>  <XCircle /> Purchase Cancelled</h1>
        <p>Your order has been cancelled. No charges have been made.</p>
        </div>
        <div className="payment-false">
          <p>
            If you encountered any issues during the checkout process, please
            don&apos;t hesitate to contact our support team.
          </p>
        </div>
        <div className="return">
          <Link className="link" to="/">
            <ArrowLeft size={18} />
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCancelPage;
