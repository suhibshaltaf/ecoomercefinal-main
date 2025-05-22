import axios from "axios";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/Cart";
import { useQuery } from "react-query";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { createOrder, loginSchema } from "../validation/validate.js";
import { UserContext } from "../context/User.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CreateOrder() {
    const navigate = useNavigate(); // 👈 إنشاء الكائن

  const { getCartContext } = useContext(CartContext);
  const getCart = async () => {
    const res = await getCartContext();
    return res;
  };
  let token = localStorage.getItem("userToken");
  const initialValues = {
    address: "",
    phone: "",
    couponName: "",
  };
  const onSubmit = async (info) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        info,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message == "success") {
        toast.success("your order is successfully created!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
          navigate("/profile/orders");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createOrder,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const inputs = [
    {
      id: "address",
      type: "text",
      name: "address",
      title: "Address",
      value: formik.values.address,
    },
    {
      id: "phone",
      type: "number",
      name: "phone",
      title: "Phone Number",
      value: formik.values.phone,
    },
    {
      id: "couponName",
      type: "text",
      name: "couponName",
      title: "Coupon Name",
      value: formik.values.couponName,
    },
  ];
  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      name={input.name}
      id={input.id}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
  const { data, isLoading } = useQuery("cart", getCart);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  let total = 0;
  return (
    <>
      <div className="container  pt-5">
        <div className="row">
          <div className="cart col-md-4">
            {data?.products
              ? data.products.map((product, index) => (
                  <React.Fragment key={index}>
                    <div className="pro pt-5">
                      <h2>{product.details.name}</h2>
                      <img src={product.details.mainImage.secure_url} alt="" />
                      <h2>Discount: {product.details.discount}</h2>
                      <h2>Price: {product.details.price}</h2>
                      <h2>Quantity: {product.quantity}</h2>         
                                   <h2>Final Price: {product.details.finalPrice*product.quantity}</h2>

                    </div>
                    
                  </React.Fragment>
                ))
              : ""}
          </div>
          <div className="form col-md-8">
            <h2 className=" text-center">CreateOrder</h2>
            <form onSubmit={formik.handleSubmit} className="p-4">
              {renderInputs}
              <div className="input-group my-4 d-block m-auto w-50 ">
                <input
                  type="submit"
                  className="submit text-white"
                  disabled={!formik.isValid}
                  value="Create Order"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
