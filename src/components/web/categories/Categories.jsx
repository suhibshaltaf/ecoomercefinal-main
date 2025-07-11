import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Puff } from "react-loading-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "./categories.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories/active?limit=5`
    );
    return data;
  };

  const { data, isLoading } = useQuery("web_categories", getCategories);
  if (isLoading) {
    return (
      <>
        <Puff
  visible="true"  height="80"
  width="80"
  color="#1115e7"
  aria-label="puff-loading"

  />
      </>
    );
  }
  return (
    <div className="container">
      <div className="swiper-custom-pagination py-5"></div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3.5}
        navigation
        pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
        loop={true}
        autoplay={{
          delay: 1000,
        }}
     
      >
        {data?.categories.length ? (  
          data?.categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`/products/category/${category._id}`} className="text-decoration-none">
                <div className="category">
                  <img
                    src={category.image.secure_url}
                    alt=""
                    className="rounded-circle"
                  />
                  <h2 >{category.name}</h2>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <h1>no category found</h1>
        )}
      </Swiper>
   
    </div>
  );
}
