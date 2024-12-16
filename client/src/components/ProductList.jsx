import "../styles/ProductList.scss"
import { useProductStore } from "../store/useProductStore"
import {Smile,Frown,Trash} from "lucide-react"



function ProductList() {

  const {products,deleteProduct,toggleFeaturedProduct} = useProductStore()
  console.log("products", products);

  return (
    <div className="product-list">
      <div className="productContainer">
        <p>Product</p>
        <p>Price</p>
        <p>Category</p>
        <p>Featured</p>
        <p>Actions</p>
      </div>
      <div className="product">
        {products?.map((product)=>(
          <div className="product-item" key={product._id} >
            <div className="imgContainer">
               <img src={product.image[0]} alt="" />
            </div>    
            <p>${product.price.toFixed(2)}</p>
            <p>{product.category}</p>
            <p onClick={() => toggleFeaturedProduct(product._id)}> {product.isFeatured ? <Smile /> : <Frown />} </p>
            <p className="remove" onClick={()=>deleteProduct(product._id)}><Trash/></p>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default ProductList