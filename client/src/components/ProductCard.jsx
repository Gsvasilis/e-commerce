import "../styles/ProductCard.scss"


function ProductCard({product}) {




  return (
    <div className="product-card">
        <div className="imgContainer">
            <img src={product.image[0]} alt="" />
        </div>
    </div>
  )
}

export default ProductCard