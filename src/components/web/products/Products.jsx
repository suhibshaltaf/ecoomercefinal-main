import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "./pro.module.css";
import { Puff } from "react-loading-icons";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Products() {
  const [pro, setPro] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [name, setName] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // Get All Products
  const getProducts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}`
      );
      setPro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Sorting
  const getProductsSorted = async (pageNumber, sort) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&sort=${sort}`
      );
      setPro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Filter by price
  const getProductsByPrice = async (pageNumber, priceValue) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&price=${priceValue}`
      );
      setPro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Filter by discount
  const getProductsByDiscount = async (pageNumber, discountValue) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&discount=${discountValue}`
      );
      setPro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Filter by name
  const getProductsByName = async (pageNumber, nameValue) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&name=${nameValue}`
      );
      setPro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // Filter by range
  const getProductsByMin = async (pageNumber, minVal, maxVal) => {
    if (minVal === "" && maxVal !== "") minVal = 0;
    if (maxVal === "" && minVal !== "") maxVal = 10000;

    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${pageNumber}&price[gte]=${minVal}&price[lte]=${maxVal}`
      );
      setPro(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const ResetInputs = () => {
    setPrice("");
    setDiscount("");
    setName("");
    setMin("");
    setMax("");
    getProducts(1);
  };

  const getPage = async (pageNumber) => {
    setPage(pageNumber);
    await getProducts(pageNumber);
  };

  const avgRate = (product) => {
    if (product.reviews.length === 0) return 0;
    let sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / product.reviews.length);
  };

  const getStars = (avg) => {
    let stars = [];
    for (let i = 0; i < avg; i++) {
      stars.push(<FaStar key={`filled-${i}`} color="yellow" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} />);
    }
    return stars;
  };

  useEffect(() => {
    getProducts(page);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Puff height="80" width="80" color="#1115e7" />
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Sorting Dropdown */}
      <select
        onChange={(e) => getProductsSorted(page, e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Sort Options</option>
        <option value="price">Price</option>
        <option value="discount">Discount</option>
        <option value="name">Name</option>
      </select>

      {/* Search Inputs */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (price) getProductsByPrice(page, price);
          if (discount) getProductsByDiscount(page, discount);
          if (name) getProductsByName(page, name);
        }}
        className={`${style.search} ms-2`}
      >
        <input
          type="text"
          placeholder="Search by value"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setDiscount(e.target.value);
            setName(e.target.value);
          }}
          className="ms-2 p-1 me-2"
        />
        <input type="submit" value="Search" className={style.submit} />
      </form>

      {/* Min-Max Price Filter */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getProductsByMin(page, min, max);
        }}
        className={`${style.search} ms-2`}
      >
        <input
          type="text"
          value={min}
          placeholder="Min"
          onChange={(e) => setMin(e.target.value)}
          className={`${style.min} ms-2 p-1 me-2`}
        />
        <input
          type="text"
          value={max}
          placeholder="Max"
          onChange={(e) => setMax(e.target.value)}
          className={`${style.max} ms-2 p-1 me-2`}
        />
        <input type="submit" value="Get" className={style.submit} />
      </form>

      <button className={style.reset} onClick={ResetInputs}>
        Reset
      </button>

      {/* Products Display */}
      <div className="row">
        {pro?.products?.map((product) => (
          <div key={product._id} className="col-md-3">
            <div className={`${style.pro} my-3 py-5 d-flex flex-column align-items-center`}>
              <img src={product.mainImage.secure_url} alt={product.name} />
              <p className="pt-2">Price: ${product.price}</p>
              <p>Discount: {product.discount}</p>
              <h2 className={style.pro}>{product.name}</h2>
              <h2>{avgRate(product)}</h2>
              <span>{getStars(avgRate(product))}</span>
              <Link to={`${product._id}`} className={style.details}>
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => getPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: Math.ceil(pro?.total / pro?.page) }).map((_, index) => (
            <li className="page-item" key={index}>
              <button className="page-link" onClick={() => getPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => getPage(page + 1)}
              disabled={page >= Math.ceil(pro?.total / pro?.page)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
