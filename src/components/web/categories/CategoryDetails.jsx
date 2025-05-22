import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './categories.css'
import style from "../products/pro.module.css";
import { Puff } from "react-loading-icons";
export default function CategoryDetails() {
  const { id } = useParams();
  const getCategoryDetails = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${id}`
    );
    return data.products;
  };
  const { data, isLoading } = useQuery("category_details", getCategoryDetails);
  if (isLoading) {
    return  <>
    <Puff
  visible="true"height="80"
width="80"
color="#1115e7"
aria-label="puff-loading"

/>
  </>
  }
 return( 
  <div className="container">
    <div className="row">
      {data.length ? data.map((product) => (
        <div key={product._id} className="col-md-4 text-center my-5">
          <div className={`${style.pro}`}>
            <img src={product.mainImage.secure_url} className="pb-3" alt={product.name} />
            <h2>{product.name}</h2>
            <Link to={`/products/${product._id}`} className={`${style.details} text-decoration-none`}>Details</Link>
          </div>
        </div>
      )) : <h2>product not found</h2>}
    </div>
  </div>
);
}
