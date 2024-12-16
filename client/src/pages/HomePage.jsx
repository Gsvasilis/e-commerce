import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import "../styles/HomePage.scss";
import {useProductStore} from "../store/useProductStore"
import Slider from "../components/Slider";
// import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

function HomePage() {

  const {fetchFeaturedProducts,products,loading} = useProductStore()

  useEffect(()=>{fetchFeaturedProducts()},[fetchFeaturedProducts])

  return (
    <div className="homepage">
      <div className="titleContainer">
        <h1>Explore Our Categories</h1>
        <p>Discover the latest trends in eco-friendly fashion</p>
      </div>

      <div className="categoryContainer">
        {categories.map((category) => (
          <CategoryItem key={category.name} category={category} />
        ))}
      </div>
      {/* {!loading && products.length > 0 &&
     <Slider featuredProducts={products}/> } */}
    </div>
  );
}

export default HomePage;
