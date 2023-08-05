import axios from "axios";
import React from "react";

export default function AddProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompnay] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = axios.post("http://localhost:5500/add-product", {
      name,
      price,
      category,
      company,
      userId,
    });
    result = await result;
    console.warn(result);
    setName("");
    setCategory("");
    setCompnay("");
    setPrice("");
    setError("");
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
}
