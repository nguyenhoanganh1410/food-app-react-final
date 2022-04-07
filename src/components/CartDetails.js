import emty from "../imgage/emty.svg";
import "./CartDetailsStyle.scss";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useContext, useState } from "react";
import Contex from "../store/Context";
import { AiOutlineMinus } from "react-icons/ai";
import { HiOutlinePlusSm } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";
import iteam from "../imgage/item1.jpg"; // gives image path
import { useParams, useNavigate } from "react-router-dom";
import cartApi from "../api/cartApi";
import { SetCart } from "../store/Actions";
const CartDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const { state, depatch } = useContext(Contex);
  //detructering...
  const { totalProduct, totalPrice, cart, user } = state;
  const handleToggleDetails = () => {
    const dropUp = document.querySelector(".cart_handle__details");
    if (showDetails) {
      dropUp.classList.remove("active");
      setShowDetails(false);
    } else {
      dropUp.classList.add("active");
      setShowDetails(true);
    }
  };

  const handleHideCart = () => {
    const cartDetail = document.querySelector(".cartDetails");
    const cartOverlay = document.querySelector(".cart_overlay");
    cartOverlay.classList.remove("active_cartOverlay");
    cartDetail.classList.remove("active_cartDetails");
  };

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  const handleBuyMore = () => {
    navigate("/category/best-foods");
  };

  //xu ly giam so luong san pham
  const handleMinus = (item) => {
    if (item.quatity > 1) {
      //set number the item in cart
      let newCart = cart.map((val) => {
        if (item.id === val.id) {
          val.quatity = item.quatity - 1;
        }
        return val;
      });
      //set lai cart
      depatch(SetCart(newCart));

      updateQuatityProduct(newCart);
    }
  };
  //xu ly tang so luong san pham
  const handlePluss = (item) => {
    //set number the item in cart
    let newCart = cart.map((val) => {
      if (item.id === val.id) {
        val.quatity = item.quatity + 1;
      }
      return val;
    });
    //set lai cart
    depatch(SetCart(newCart));

    updateQuatityProduct(newCart);
  };

  //update product in cart
  const updateQuatityProduct = async (newCart) => {
    try {
      const response = await cartApi.updateProductInCart(
        "cart",
        user.email,
        newCart
      );
    } catch (error) {
      console.log("Failed to fetch product list: ", error);
    }
  };

  const handleDeleteItem = (item) => {
    //xoa san pham khoi cart
    const newCart = cart.filter((val) => {
      return val.id !== item.id;
    });
    //cap nhat lai cart( da xoa item)
    depatch(SetCart(newCart));

    //cap nhat tai server
    const deleteCart = async () => {
      try {
        const response = await cartApi.updateProductInCart(
          "cart",
          user.email,
          newCart
        );
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    deleteCart();
  };

  return (
    <section className="cart_detail">
      <div className="cart_overlay"></div>
      <div className="cartDetails">
        <div className="cart_heading">
          <h2>shopping cart</h2>
          <div className="cart_cancel" onClick={() => handleHideCart()}></div>
        </div>
        {totalProduct === 0 ? (
          <div className="cart_content">
            <img src={emty} />
            <h2>your cart is empty</h2>
          </div>
        ) : (
          <div className="cart_items">
            {cart.map((val, idx) => {
              return (
                <div className="cart_item" key={`${val.id}${cart.id}`}>
                  <div className="item_img">
                    <img src={val.img} />
                  </div>
                  <div className="item_content">
                    <div className="item_text">
                      <h3>{val.name}</h3>
                      <span className="item_price">{`$${val.price}`}</span>
                      <div className="cart_option">
                        <span
                          className="item_option"
                          onClick={() => handleMinus(val)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="item_count">{val.quatity}</span>
                        <span
                          className="item_option"
                          onClick={() => handlePluss(val)}
                        >
                          <HiOutlinePlusSm />
                        </span>
                      </div>
                    </div>
                    <span
                      className="item_delete"
                      onClick={() => handleDeleteItem(val)}
                    >
                      <RiDeleteBin7Line />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* <div className="cart_content">
                    <img  src={emty}/>
                    <h2>your cart is empty</h2>
                </div> */}
        {/* <div className='cart_items'>
                    <div className='cart_item'>
                        <div className='item_img'><img src={iteam}/></div>
                        <div className='item_content'>
                           <div className='item_text'>
                                 <h3>Momofuku</h3>
                                <span className='item_price'>$89</span>
                                <div className='cart_option'>
                                    <span className='item_option'><AiOutlineMinus /></span>
                                    <span className='item_count'>5</span>
                                    <span className='item_option'><HiOutlinePlusSm /></span>
                                </div>
                           </div>
                            <span className='item_delete'><RiDeleteBin7Line /></span>
                        </div>
                  
                  
                    </div>

                </div> */}

        <div className="cart_handle">
          <div
            className="cart_handle__dropup"
            onClick={() => handleToggleDetails()}
          ></div>
          <div className="cart_handle__details">
            <h4>Order info</h4>
            <div className="details_text">
              <p>Discount</p>
              <span>$0.00</span>
            </div>
            <div className="details_text">
              <p>Shipping Cost</p>
              <span>Free</span>
            </div>
            <div className="details_text">
              <p>Voucher</p>
              <span>None</span>
            </div>
          </div>
          <div className="cart_handle__total">
            <span className="cart_handle__txt">total</span>
            <span className="cart_handle__price">{`$${totalPrice.toFixed(
              2
            )}`}</span>
          </div>
          <div className="cart_handle__btns">
            <button className="btn btn_order" onClick={() => handleCheckOut()}>
              <span>
                <HiOutlineShoppingCart />
              </span>
              checkout
            </button>
            <button className="btn btn_order" onClick={() => handleBuyMore()}>
              <span>
                <HiOutlineShoppingCart />
              </span>
              buy more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartDetails;
