import "../styles/ProductPage.scss";
import { useProductStore } from "../store/useProductStore";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

function ProductPage() {
  const { products } = useProductStore();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const { id } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [id, products]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please Login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(productData);
    }
  };

  return productData ? (
    <div className="product-page">
      <div className="left">
        <div className="smallImgContainer">
          {productData.image.map((item, index) => (
            <img
              onMouseEnter={() => setImage(item)}
              src={item}
              key={index}
              alt=""
            />
          ))}
        </div>
        <div className="mainImgContainer">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="product-name">
          <h4>{productData.name}</h4>
        </div>
        <div className="product-desc">
          <p>{productData.description}</p>
        </div>
        <div className="product-price">
          <p>${productData.price.toFixed(2)}</p>
        </div>
        <div className="btn">
          <button onClick={handleAddToCart}>
            <ShoppingCart />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ProductPage;
