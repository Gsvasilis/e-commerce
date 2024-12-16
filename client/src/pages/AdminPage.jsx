import "../styles/Admin.scss"
import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import CreateProduct from "../components/CreateProduct"
import ProductsList from "../components/ProductList"
import { useProductStore } from "../store/useProductStore";


const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
];

function AdminPage() {
  const [activeTab,setActiveTab] = useState("create")

  const {fetchAllProducts} = useProductStore()

  useEffect(()=>{fetchAllProducts()},[fetchAllProducts])

  return (
    <div className="admin">
      <div className="title">
    <h2>Admin DashBoard</h2>
      </div>
      <div className="tabsContainer">
        {tabs.map((tab)=>(
          <button key={tab.id}
          onClick={()=>setActiveTab(tab.id)}
          ><tab.icon/>{tab.label}</button>
        ))}
      </div>
      {activeTab === "create" && <CreateProduct />}
      {activeTab === "products" && <ProductsList />}
    </div>

  )
}

export default AdminPage