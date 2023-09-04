import React, { useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import "./AddProduct.css";
import axios from "axios";
export default function UpdateProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log('params',params["id"]);
    fetchProductData(params["id"]);
  },[params]);
  async function fetchProductData(id){
    let result = axios.get("http://localhost:5500/product/"+id);
    result = await result;
    setName(result?.data?.name);
    setPrice(result?.data?.price);
    setCategory(result?.data?.category);
    setCompany(result?.data?.company);
  }
  async function updateProduct(){
    axios.put("http://localhost:5500/product/"+params["id"],{
      headers:{
        Authorization:'Bearer ' + JSON.parse(localStorage.getItem('auth'))
      }},{name,price,category,company});
    setName("");
    setCategory("");
    setCompany("");
    setPrice("");
    navigate('/');
  }
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
}
