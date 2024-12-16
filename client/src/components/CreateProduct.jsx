import { useState } from "react";
import "../styles/CreateProduct.scss";
import { PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import toast from "react-hot-toast";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "bags"];

function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      if(files.length + newProduct.images.length > 8){
        toast.error("You can Upload a maximum of 10 images per procuct")

      }
      const readers = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers)
        .then((images) => {
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            images: [...prevProduct.images, ...images],
          }));
        })
        .catch((error) => console.log("Error reading files", error));
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <div className="create-product">
      <form onSubmit={handleSubmit}>
        <h2>Create Product</h2>
        <div className="box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder=" Name"
            value={newProduct.name}
            onChange={handleInput}
          />
        </div>
        <div className="box">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            rows={4}
            cols={36}
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInput}
          />
        </div>
        <div className="box">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            placeholder=" Price"
            value={newProduct.price}
            onChange={handleInput}
          />
        </div>
        <div className="box">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={newProduct.category}
            onChange={handleInput}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="box">
          <input
            type="file"
            id="images"
            accept="image/*"
            hidden
            multiple
            onChange={handleImageChange}
          />
          <label className="img-label" htmlFor="images">
            {" "}
            <Upload />
            Upload Image
          </label>
          {newProduct.images.length > 0 && <span>{newProduct.images.length} images uploaded</span>}
        </div>
        <button type="submit" disabled={loading}>
          {" "}
          <PlusCircle />
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
