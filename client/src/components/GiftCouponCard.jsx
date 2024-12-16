import "../styles/GiftCouponCard.scss"
import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore"

function GiftCouponCard() {

  const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};


  return (
    <div className="gift-coupon-card">
      <form>
        <label htmlFor="voucher"> Do you have a voucher or gift card?</label>
        <input type="text" id="voucher"
        placeholder="Enter the code here" 
        value={userInputCode}
        onChange={(e)=>setUserInputCode(e.target.value)}
        required/>
        <button onClick={handleApplyCoupon}>Apply Code</button>
      </form>
      {isCouponApplied && coupon && (
        <div className="coupon-apply">
          <h4>Applied Coupon</h4>
          <p>{coupon.code} - {coupon.discountPercentage}% off </p>
          <button onClick={handleRemoveCoupon}>Remove Coupon</button>
        </div>
      )}
      {coupon && (
        <div className="coupon-available">
          <h4>Your Available Coupon:</h4>
          <p> {coupon.code} - {coupon.discountPercentage}% off </p>
        </div>
      )}
    </div>
  )
}

export default GiftCouponCard