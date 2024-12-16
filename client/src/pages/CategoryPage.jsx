import "../styles/CategoryPage.scss";
import { useProductStore } from "../store/useProductStore";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);
  return (
    <div className="category-page">
      <div className="title">
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className="noProducts">
          {products?.length === 0 && <h2>No Products Found</h2>}
        </div>
        <div className="productsContainer">
          {products?.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard product={product}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
