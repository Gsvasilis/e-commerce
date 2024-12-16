import "../styles/CategoryItem.scss"
import {Link} from "react-router-dom"


function CategoryItem({category}) {
  return (
    <div className="item">
        <Link to={"/category" + category.href }>
        <div className="imgContainer">
          <img src={category.imageUrl} alt="" />
        </div>
        <div className="category-name">
          <h4>{category.name}</h4>
        </div>
        </Link>
    </div>
  )
}

export default CategoryItem