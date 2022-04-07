import "./CheckOutStyle.scss";
import { FaUsers } from "react-icons/fa";
import { MdConfirmationNumber, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import user_icon from "../../imgage/userIcon.jpg";
import iteam from "../../imgage/item1.jpg"; // gives image path
import { useContext, useEffect, useState } from "react";
import Contex from "../../store/Context";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  SetCart,
  SetDialogShow,
  SetFirstAdd,
  SetOpenBar,
  SetUser,
} from "../../store/Actions";
import { useParams, useNavigate } from "react-router-dom";
const CheckOut = () => {
  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { isSignedIn, user, cart, totalPrice } = state;
  const navigate = useNavigate();
  useEffect(() => {
    //update name user in header
    if (user) {
      //update name user in header

      const header_userName = document.querySelector(".account_name");
      header_userName.innerHTML = user.displayName;
      document.querySelector(".info-name").innerHTML = user.displayName;
      try {
        document.querySelector(".img_account").src = user.photoURL;
        document.querySelector(".img_account_checkout").src = user.photoURL;
      } catch (error) {
        console.log("imgage err");
      }
    }
    //scrool to top
    const handlOnTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
        /* you can also use 'auto' behaviour
                in place of 'smooth' */
      });
    };
    handlOnTop();
  }, [user]);

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

  const handleReturnToShop = () => {
    navigate("/category/best-foods");
  };
  return (
    <div className="checkout">
      <div className="checkout_content wrapper_web row">
        <div className="content_left col-6 col-sm-12">
          <div className="checkout-progress">
            <div className="checkout-progress__node active">
              <div className="checkout-progress__icon">
                <FaUsers />
              </div>
              <span className="checkout-progress__description">Login</span>
            </div>
            <div className="checkout-progress__line active_line"></div>
            <div className="checkout-progress__node active">
              <div className="checkout-progress__icon">
                <MdConfirmationNumber />
              </div>
              <span className="checkout-progress__description">Confirm</span>
            </div>
            <div className="checkout-progress__line"></div>

            <div className="checkout-progress__node">
              <div className="checkout-progress__icon">
                <AiOutlineLike />
              </div>
              <span className="checkout-progress__description">Success!</span>
            </div>
          </div>
          <div className="checkout-user">
            <h2>Contact information</h2>
            <div className="checkout-user-info">
              <img className="img_account_checkout" src={user_icon} />
              <div className="info-content">
                <span className="info-name">nguyễn hoàng</span>
                <div className="info-logout" onClick={() => logout()}>
                  Log out
                </div>
              </div>
            </div>
            <div className="price-block">
              <label>
                <input type="checkbox" name="radio-button" value="" />
                <span>Keep me up to date on news and offers</span>
              </label>
            </div>
          </div>
          <div className="checkout-form">
            <h2 className="form-title">Shipping address</h2>
            <div className="form-input">
              <div className="input-row">
                <div className="input-field">
                  <input placeholder="First name"></input>
                  <span className="errName"></span>
                </div>
                <div className="input-field">
                  <input placeholder="Last name"></input>
                  <span className="errLastName"></span>
                </div>
              </div>
              <div className="input-row">
                <div className="input-field" style={{ margin: 0 }}>
                  <input placeholder="Address"></input>
                  <span className="errAddress"></span>
                </div>
              </div>
              <div className="input-row">
                <div className="input-field">
                  <input placeholder="First name"></input>
                  <span className="errName"></span>
                </div>
                <div className="input-field">
                  <input placeholder="Phone"></input>
                  <span className="errPhone"></span>
                </div>
              </div>
            </div>
            <div className="form-btns">
              <div className="return-to-shop">
                <div className="arrow">
                  <MdKeyboardArrowLeft />
                </div>
                <span onClick={() => handleReturnToShop()}>return to shop</span>
              </div>
              <button className="btn btn_order">checkout</button>
            </div>
          </div>
        </div>
        <div className="content_right col-6 col-sm-12">
          <ul className="content_product">
            {cart.map((val) => {
              return (
                <li>
                  <div className="li_product">
                    <div className="product_img">
                      <img src={val.img} />
                    </div>
                    <div className="product_content">
                      <span className="product_name">{val.name}</span>
                      <span className="product_address">{val.country}</span>
                    </div>
                  </div>
                  <div className="product_price">{`$${val.price}`}</div>
                </li>
              );
            })}
          </ul>
          <div className="checkout-discount">
            <input type="text" placeholder="Gift card or discount code" />
            <button className="btn btn_order btn_custom">apply</button>
          </div>
          <div className="checkout-detail">
            <div className="checkout-detail_row">
              <span className="detail_label">Discount</span>
              <span className="detail_price">$0</span>
            </div>
            <div className="checkout-detail_row">
              <span className="detail_label">Shipping Cost</span>
              <span className="detail_price">Free</span>
            </div>
            <div className="checkout-detail_row">
              <span className="detail_label">Taxes (estimated)</span>
              <span className="detail_price">$0</span>
            </div>
          </div>
          <div className="checkout-total">
            <span className="total_label">Total</span>
            <span className="total_price">{`$${totalPrice.toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
