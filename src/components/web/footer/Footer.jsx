import React from "react";
import style from "../header/header.module.css";
import { CiFacebook, CiInstagram, CiPhone } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

export default function Footer() {

  return (
    <div className={`${style.footer} text-center  mt-5   `}>
      <h2 className=" text-info pt-5">Thank you for visiting our website to communicate </h2>
      <div>
      <a href="https://www.facebook.com/sohaib.sohaib.796/" className=" fs-1  "><CiFacebook /></a>
     <a href="https://www.instagram.com/sohaibaltarefe/" className=" fs-1  text-danger"><CiInstagram /></a>
     <a href="mailto:sohaibshaltafaltrefe1@gmail.com" className=" fs-1  text-success"><MdEmail /></a>
      <a href="tel:+962787118764" className=" fs-1  text-warning-emphasis "><CiPhone /></a> 
     
     
     </div>
      <p class="mb-0">&copy; 2025 All rights reserved. Developed by <strong> suhib shaltaf</strong>.</p>


    </div>
  );
}
 