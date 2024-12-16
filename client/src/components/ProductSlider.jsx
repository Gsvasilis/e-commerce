import { useEffect, useState } from "react";
import "../styles/ProductSlider.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductSlider({ featuredProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < featuredProducts.length) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    } else {
      setCurrentIndex(Math.max(0, featuredProducts.length - itemsPerPage));
    }
  };

  return (
    <div className="product-slider">
      <div className="container">
        <h1 className="title">Products</h1>
        <div className="carousel">
          <div
            className="carousel-inner"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {featuredProducts.map((product, index) => (
              <div key={product._id || index} className="carousel-item">
                <div className="product-card">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <button className="add-to-cart">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className={`carousel-button prev ${currentIndex === 0 ? "disabled" : ""}`}
          >
            <ChevronLeft className="icon" />
          </button>
          <button
            onClick={nextSlide}
            className={`carousel-button next ${
              currentIndex + itemsPerPage >= featuredProducts.length ? "disabled" : ""
            }`}
          >
            <ChevronRight className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
