import React from 'react';

import "./ProductDetailStyle.scss";
import "../../components/card/CardProductStyle.scss";
import bs1 from "../../imgage/bestsell01.png";
import user_icon from "../../imgage/userIcon.jpg";

import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import { BsHeart, BsCalendarCheck, BsCartPlus } from "react-icons/bs";
import { GoPlusSmall } from "react-icons/go";
import { HiOutlineMinusSm } from "react-icons/hi";
import { MdOutlineLocalShipping } from "react-icons/md";

import { useContext, useEffect, useState } from "react";
import Contex from "../../store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardProduct from "../card/CardProduct";

import productApi from "../../api/productApi";

import item1 from "../../imgage/item1.jpg";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";

import {
  Link,
  useParams,
  Outlet,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { SetCart, SetDialogShow, SetFirstAdd } from "../../store/Actions";
import cartApi from '../../api/cartApi';

const ProductDetail = () => {
  const params = useParams();
 
  const [activeTab, setACtiveTab] = useState(true);
  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, isSignedIn, user, cart, firstAdd } = state;

  const [itemList, setItemList] = useState([]);

  //so san pham hien tai dang xem
  const [number, setNumber] = useState(1);

  const [product, setProduct] = useState([])

  //so star dang duoc danh gia(in comment)
  const [star, setStar] = useState(0);

  const handleActiveTab = () => {
    setACtiveTab(!activeTab);
  };

  useEffect( () =>{
    if (user) {
      //update name user in header
   
      const header_userName = document.querySelector(".account_name");
      header_userName.innerHTML = user.displayName;
      
        try {
          
          document.querySelector(".img_account").src = user.photoURL;
          document.querySelector(".img_user").src = user.photoURL;
        } catch (error) {
          console.log("imgage err");
        }
      
    }
    

  }, [])

  useEffect(() => {
    //featch product
    const fetchProductList = async () => {
      try {
        const response = await productApi.getAll(url, { _limit: 8 });

        const responseProdcuct = await productApi.getAll(url,{id:params.FoodID} );

        setProduct(responseProdcuct)
        setItemList(response);
      
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();

    //scrool to top
    const handlOnTop = () =>{
      window.scrollTo({
          top: 0, 
          behavior: 'smooth'
          /* you can also use 'auto' behaviour
             in place of 'smooth' */
        });
  }
  handlOnTop();


  }, [params.FoodID]);

  //toast notify
  const notify = () => {
    //nếu đã đăng nhập tài khoản thì active cart
    if (isSignedIn) {
      toast.success("The product has been added to your cart", {
        theme: "colored",
      });
    } else {
      //thông báo phải login mới thực hiện được chức năng( dialogshow)
      depatch(SetDialogShow(true));
    }
  };

  const notifyFavotites = () => {
    //nếu đã đăng nhập tài khoản thì active cart
    if (isSignedIn) {
      toast.error("The product has been added to your favorites", {
        theme: "colored",
        icon: ({ theme, type }) => <BsHeart />,
      });
    } else {
      depatch(SetDialogShow(true));
    }
  };

  const handlePluss =() => {
    
        const newNumber = number+1;
        setNumber(newNumber);
      
  } 

  const handleMinuss =() => {
      if(number > 1){

        const newNumber = number-1;
        setNumber(newNumber);
      }
    
    
} 

//xu ly di chuot vao star (active so star tuong ung)
 const handleRateStar = (e) =>{
  //lay ra class tuong ung
  console.log(e.target.classList);
    const value = +e.target.classList.value.slice(0,1);
    console.log(value);
    setStar(value)
 }

 const handleAddToCart = () =>{
 //kiem tra dang nhap chua
 if(isSignedIn){
  //lan dau them sanpham vao gio hang
    if (firstAdd && isSignedIn) {
      //add product in cart
      const addIntoCart = async () => {
        try {
          const response = await cartApi.addProductIntoCart(
            "cart",
            user.email,
            product[0]
          );
          notify();

          //khong con la lan dau nua
          depatch(SetFirstAdd(false));
        } catch (error) {
          console.log("Failed to fetch product list: ", error);
        }
      };
      addIntoCart();
    } else {
      const newCart = checkCart(cart,product[0]);
      depatch(SetCart(newCart));

      const addIntoCart = async () => {
        try {
          const response = await cartApi.updateProductInCart(
            "cart",
            user.email,
            newCart
          );
          notify();
        } catch (error) {
          console.log("Failed to fetch product list: ", error);
        }
      };
      addIntoCart();
    }
  }
  else{
     //thông báo phải login mới thực hiện được chức năng( dialogshow)
     depatch(SetDialogShow(true));
  }
 }
 //kiem tra sp da co trong cart chua
 const checkCart = (cartFood, food) => {
  
  let check = false;
  //kiem tra san pham muon them da co trong cart chua?
  const newCart = cartFood.map((val) => {
    if (val.id === food.id) {
      val.quatity = val.quatity + number;
      check = true;
    }
    return val;
  });
  const CartNew = [...cartFood, { ...food, quatity: 1 }];
 
  if (check) {
    return newCart;
  }
  return CartNew;
};

  return (
    <div className="detail_product">
      {
        product.length === 0 ? <h2 className="loading">Loading...</h2> :
           
            <div className="detail_content wrapper_web row">
              <div className="content_img col-6 col-sm-12">
                  <InnerImageZoom
                      src={product[0].img}
                      zoomSrc={product[0].img}
                     
                      zoomType="hover"
                      zoomPreload={true}
                  
                  />
              </div>
              <div className="content_text col-6 col-sm-12">
                <h2 className="detail_content__title">{product[0].name} </h2>
                <div className="detail_content__rate">
                  <div className="rate_star">
                    {
                      Array.from( {length: product[0].rate}, (val, idx) =>{
                        return (
                          <span>
                            {" "}
                            <AiTwotoneStar />
                           
                          </span>
                        )
                     } )
                      
                    }
                    {
                      Array.from( {length: 5 - product[0].rate}, (val, idx) =>{
                        return (
                          <span>
                            {" "}
                           
                            <AiOutlineStar />
                          </span>
                        )
                     } )
                      
                    }

                  </div>
                  <div className="rate_comment">
                    <span>0</span> Customer Reviews
                  </div>
                </div>
                <div className="detail_content__price">
                  <span>{`$${product[0].price.toFixed(2)}`}</span>
                </div>
                <div className="detail_content__tags">
                  <div className="detail_content__tag">
                    <div className="detail_content__tag-label">Category:</div>
                    <div className="detail_content__tag-detail">{url}</div>
                  </div>
                  <div className="detail_content__tag">
                    <div className="detail_content__tag-label">Country:</div>
                    <div className="detail_content__tag-detail">{product[0].country}</div>
                  </div>
                </div>
                <div className="detail_content__desc">
                  The Original Butcher's Feast® for 4
                </div>
                <div className="detail_content__form">
                  <div className="price-block">
                    <label>
                      <input type="radio" name="radio-button"  value="15" checked={number ===2 ? true : false} />
                      <span>Buy 2 get 15 percent off</span>
                    </label>
                  </div>
                  <div className="price-block">
                    <label>
                      <input type="radio" name="radio-button" value="20"  checked={number ===3 || number===4 ? true : false} />
                      <span>Buy 3 get 25 percent off</span>
                    </label>
                  </div>
                  <div className="price-block">
                    <label>
                      <input type="radio" name="radio-button" value="50" checked={number >= 5 ? true : false} />
                      <span>Buy 5 get 50 percent off</span>
                    </label>
                  </div>
                </div>
                <div className="detail_content__btns">
                  <div className="detail_content__btns-handle">
                    <span className="handle_add btn_cicle"
                          onClick={()=>handleMinuss()}
                      >
                      <HiOutlineMinusSm />
                    </span>
                    <span className="handle_qnt">{number}</span>
                    <span className="handle_minus btn_cicle"
                          onClick={()=>handlePluss()}
                    >
                      <GoPlusSmall />
                    </span>
                  </div>
                  <div className="detail_content__add">
                    <button className="btn btn_order"
                      onClick={() => handleAddToCart() }
                      >
                      <span>
                        <BsCartPlus />
                      </span>
                      add to cart
                    </button>
                  </div>
                  <div className="btn_cicle" onClick={() => notifyFavotites()}>
                    <BsHeart />
                  </div>
                </div>
                <div className="detail_content__commits">
                  <div className="detail_content__commit">
                    <span>
                      {" "}
                      <MdOutlineLocalShipping />
                    </span>
                    <p>Free global shipping on all orders</p>
                  </div>
                  <div className="detail_content__commit">
                    <span>
                      <BsCalendarCheck />
                    </span>
                    <p>2 hours easy returns if you change your mind</p>
                  </div>
                  <div className="detail_content__commit">
                    <span>
                      <BsCalendarCheck />
                    </span>
                    <p>Order before noon for same day dispatch</p>
                  </div>
                </div>
              </div>
            </div>
       
      
      } 
            <div className="detail_tab wrapper_web">
              <div className="detail_tab__btns">
                <div
                  className={`detail_tab_btn ${activeTab ? "active" : ""}`}
                  onClick={() => handleActiveTab()}
                >
                  <span>Description</span>
                </div>
                <div
                  className={`detail_tab_btn ${activeTab ? "" : "active"} `}
                  onClick={() => handleActiveTab()}
                >
                  <span>Reviews(2)</span>
                </div>
              </div>
              {activeTab ? (
                <div className="detail_tab__content">
                  <p>
                    Although the legendary Double Burger really needs no introduction,
                    please allow us… Tucked in between three soft buns are two
                    all-beef patties, cheddar cheese, ketchup, onion, pickles and
                    iceberg lettuce. Hesburger’s own paprika and cucumber mayonnaise
                    add the crowning touch. Oh baby!
                  </p>
      
                  <div className="detail_tab__content-table">
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title first">
                          best foods
                        </div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients first">
                        Ingredients
                      </div>
                    </div>
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title">24</div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients">egg</div>
                    </div>
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title">24</div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients">egg</div>
                    </div>
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title">24</div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients">egg</div>
                    </div>
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title">24</div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients">egg</div>
                    </div>
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title">24</div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients">egg</div>
                    </div>
                    <div className="detail_tab__content-col">
                      <div className="detail_tab__content-col-wrapper">
                        <div className="detail_tab__content-col-title">24</div>
                        <div className="detail_tab__content-col-des">28cm size</div>
                      </div>
                      <div className="detail_tab__content-ingredients">egg</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="detail-tab-comment__comment">
                  <div className="detail-tab-comment__container">
                    <div className="detail-tab-comment__customer">
                      <div className="user_img">
                        <img src={user_icon} />
                      </div>
                      <div className="detail-tab-comment__wrapper">
                        <div className="detail-tab-comment__row">
                          <h4 className="detail-tab-comment__name">
                            Nguyen hoang anh
                          </h4>
                          <span className="time">10h:40</span>
                        </div>
                        <div className="detail-tab-comment__stars">
                          <span>
                            {" "}
                            <AiTwotoneStar />
                          </span>
                          <span>
                            {" "}
                            <AiTwotoneStar />
                          </span>
                          <span>
                            {" "}
                            <AiTwotoneStar />
                          </span>
                          <span>
                            {" "}
                            <AiTwotoneStar />
                          </span>
                          <span>
                            {" "}
                            <AiTwotoneStar />
                          </span>
                        </div>
                        <p className="detail-tab-comment__content">
                          Từ 15h ngày 21/3, giá xăng E5 RON 92 trong nước giảm 655
                          đồng/lít, xăng RON 95 giảm 632 đồng/lít. Đây là lần giảm đầu
                          tiên của mặt hàng này sau gần 4 tháng tăng liên tục.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="detail_tab_form">
                    <div className="user_img">
                      <img className="img_user" src={user_icon} />
                    </div>
                    <form className="detail-tab-user__form">
                      <div className="detail-tab-user__row">
                        <div className="detail-tab-user">
                          <div className="detail-tab-rate">
                          {
                              Array.from( {length: star}, (val, idx) =>{
                                return (
                                  <span >
                                  {" "}
                                  <AiTwotoneStar className={`${idx+1} active_star`} onMouseEnter={(e) => handleRateStar(e)}  />
                                </span>
                                )
                            } )
                            
                          }
                          {
                              Array.from( {length: 5-star}, (val, idx) =>{
                                return (
                                  <span >
                                  {" "}
                                  <AiTwotoneStar className={idx+star+1} onMouseEnter={(e) => handleRateStar(e)}/>
                                </span>
                                )
                            } )
                            
                          }
                         
                            <span className="detail-tab-user__msg">
                              (Please choose an one)
                            </span>
                          </div>
                          <textarea
                            className="detail-tab-user__textarea"
                            placeholder="Type your comment here..."
                          ></textarea>
                        </div>
      
                        <button className="btn btn_order">Post comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>


      <div className="detail_list">
        <div className="primary-yellow-text">{url}</div>
        <div className="primary-heading-text">Related Products</div>
        <div className="detail-products__wrapper wrapper_web row">
          {itemList.map((val) => {
            return (
              <CardProduct
                key={val.id}
                item={val}
                dislayItems={"col-3"}
                notify={notify}
                notifyFavotites={notifyFavotites}
               
              />
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
