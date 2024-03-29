import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { banner } from "../data/data";
import { HiOutlineShoppingCart } from "react-icons/hi";

import "./HomeBannerStyle.scss";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context  from "../store/Context";

const HomeBanner = () => {
  //get url global value
  const { state, depatch } = useContext(Context);
  //detructering...
  const { url } = state;

  const navigate = useNavigate();
  return (
    <Carousel className="banner">
      {banner.map((val) => {
        return (
          <div key={val.id} className="banner_wrapper">
            <img src={val.img} />
            <div className="wrapper_web">
              <div className="banner_content">
                <p className="banner_text">{val.text}</p>
                <h2 className="banner_title">
                  {val.title}
                  <br />
                  <strong>{val.red}</strong>
                </h2>
                <button
                  className="btn btn_order"
                  onClick={() => navigate('/category/burgers')}
                >
                  {" "}
                  <span>
                    {" "}
                    <HiOutlineShoppingCart />
                  </span>
                  Đặt Ngay
                </button>
                
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeBanner;