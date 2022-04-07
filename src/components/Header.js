import "../styles/HeaderStyle.scss";
import logo from "../imgage/logo.svg";
import user_icon from "../imgage/userIcon.jpg";
import "./Header.scss";
import cartApi from "../api/cartApi";

import { AiOutlineHome } from "react-icons/ai";

import { MdAccountBox } from "react-icons/md";
import { FaRegNewspaper, FaBars, FaVoteYea } from "react-icons/fa";
import { IoStorefrontOutline, IoLogOutOutline } from "react-icons/io5";
import { GiKnifeFork } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { nav } from "../data/data";
import { useContext, useEffect } from "react";
import Contex from "../store/Context";
import BtnScroll from "./BtnScroll";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Routes, Route, Link, Outlet, NavLink } from "react-router-dom";
import {
  SetCart,
  SetDialogShow,
  SetFirstAdd,
  SetOpenBar,
  SetOpenWishList,
  SetUser,
} from "../store/Actions";
const Header = () => {
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { totalProduct, openWishList,totalPrice, cart, user, isSignedIn, openBar,firstAdd } = state;

  useEffect(() => {
    const handScroll = () => {
      const header = document.querySelector(".header");
      const btnSroll = document.querySelector(".btn-scroll");
      // console.log(window.scrollY);
      if (window.scrollY > 50) {
        header.classList.add("color_black");
      } else {
        header.classList.remove("color_black");
      }
      //   show Btn-scroll
      if (window.scrollY > 100) {
        btnSroll.classList.add("active-btnScrool");
      } else {
        btnSroll.classList.remove("active-btnScrool");
      }
    };
    window.addEventListener("scroll", handScroll);
    if (user) {
      //update name user in header
      console.log(user);
      const header_userName = document.querySelector(".account_name");
      header_userName.innerHTML = user.displayName;

      if (!user.photoURL) {
        document.querySelector(".img_account").src = user.photoURL;
      }
    }

    //cleanup function
    return () => {
      window.removeEventListener("scroll", handScroll);
    };
  }, [user]);

  useEffect(()=>{
          //fetch product in cart
          const fetchCartList = async () => {
            try {
              const response = await cartApi.getById("cart", { id: user.email });

              if (response.length !== 0) {
              
                depatch(SetCart(response[0].items));
                 //lan dau them vao gio hang             
                 depatch(SetFirstAdd(false));
    
              } 
            } catch (error) {
              console.log("Failed to fetch product list: ", error);
            }
          };
          fetchCartList();
  }, [user, firstAdd])

  const handleOpenCart = () => {
    //nếu đã đăng nhập tài khoản thì active cart
    if (isSignedIn) {
      const cartDetail = document.querySelector(".cartDetails");
      const cartOverlay = document.querySelector(".cart_overlay");
      cartOverlay.classList.add("active_cartOverlay");
      cartDetail.classList.add("active_cartDetails");
    } else {
      //thông báo phải login mới thực hiện được chức năng( dialogshow)
      depatch(SetDialogShow(true));
    }
  };

  //login account
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
        depatch(SetUser(null));
        //set num cart
        depatch(SetCart([]));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleOpenBar = () => {
    depatch(SetOpenBar(true));
  };

  const handleOpenWishList = () =>{
    depatch(SetOpenWishList(true));
  }
  return (
    <header className="header">
      <div className="container">
        <div className="bar" onClick={() => handleOpenBar()}>
          <FaBars />
        </div>
        <div className="header_left">
          <Link to="/">
            {" "}
            <img src={logo} />
          </Link>
          <nav>
            <ul>
              {nav.map((val) => {
                return (
                  <li key={val.id}>
                    <span>{val.icon}</span>
                    <Link
                      className="nav_link"
                      to={
                        val.text === "order online"
                          ? "/category/best-foods"
                          : "/"
                      }
                    >
                      {val.text}
                    </Link>
                  </li>
                );
              })}

              {/* <li><span><AiOutlineHome /></span><a>pages</a></li>
                            <li><span><GiKnifeFork /></span> <a>Order online</a></li>
                            <li><span><FaRegNewspaper /></span><a>news</a></li>
                            <li><span><IoStorefrontOutline /></span>  <a>Store locations</a></li> */}
            </ul>
          </nav>
        </div>
        <div className="header_right">
          <div className="cart" onClick={() => handleOpenCart()}>
            <span>
              {" "}
              <HiOutlineShoppingCart />
            </span>
            <span className="cart_number">{totalProduct}</span>
          </div>
          <div className="account">
            {
              //      isSignedIn ? (
              <Link to="/login" className="account">
                <div className="account_icon">
                  <img className="img_account" src={user_icon} />
                </div>
                <span className="account_name">sign in</span>
              </Link>
              //   ):
              //   (
              //     <div to="login" className='account'>
              //         <div className='account_icon'>
              //          <img className='img_account' src={user_icon} />
              //         </div>
              //         <span className='account_name' >sign inok</span>
              //    </div>
              //   )
            }
            {isSignedIn ? (
              <div className="account_option">
                <ul>
                  <li>
                    <span>
                      <MdAccountBox />
                    </span>
                    <a>my account</a>
                  </li>
                  <li onClick={() => handleOpenWishList()}>
                    <span>
                      <FaVoteYea />
                    </span>
                    <a>my wishlist</a>
                  </li>
                  <li onClick={() => logout()}>
                    <span>
                      <IoLogOutOutline />
                    </span>
                    <a>log out</a>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
