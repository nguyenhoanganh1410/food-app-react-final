import emty from '../imgage/emty.svg';
import './CartDetailsStyle.scss';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useCallback, useContext, useMemo, useState } from 'react';
import Contex from '../store/Context';
import { AiOutlineMinus } from 'react-icons/ai';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  deleteProductInCart,
  updateProductInCart,
} from '../firebase/queries/cart';
import { formatCash, toastSuccess } from '../utils';
import { MESSAGE_UNKNOWN } from '../constants';

const CartDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { state, depatch } = useContext(Contex);
  const { totalProduct, totalPrice, cart, user } = state;

  const handleToggleDetails = () => {
    const dropUp = document.querySelector('.cart_handle__details');
    if (showDetails) {
      dropUp.classList.remove('active');
      setShowDetails(false);
    } else {
      dropUp.classList.add('active');
      setShowDetails(true);
    }
  };

  const handleHideCart = () => {
    const cartDetail = document.querySelector('.cartDetails');
    const cartOverlay = document.querySelector('.cart_overlay');
    cartOverlay.classList.remove('active_cartOverlay');
    cartDetail.classList.remove('active_cartDetails');
  };

  const handleCheckOut = () => {
    navigate('/checkout');
  };

  const handleBuyMore = () => {
    handleHideCart();
    navigate('/category/burgers');
  };

  const handleDecreaseQuality = useCallback(
    async (cartParams) => {
      if(cartParams?.quality === 1) return;
      try {
        const qualityParam = {
          quality: cartParams?.quality - 1,
        };
        await updateProductInCart(cartParams.id, qualityParam);
      } catch (error) {
        console.log(error);
        toastSuccess(MESSAGE_UNKNOWN);
      }
    },
    [cart]
  );

  const handleIncreaseQuality = useCallback(
    async (cartParams) => {
      try {
        const qualityParam = {
          quality: cartParams?.quality + 1,
        };
        await updateProductInCart(cartParams.id, qualityParam);
      } catch (error) {
        console.log(error);
        toastSuccess(MESSAGE_UNKNOWN);
      }
    },
    [cart]
  );

  const handleDeleteItem = useCallback(async (cartParams) => {
    try {
      await deleteProductInCart(cartParams.id);
      toastSuccess('Xoá thành công!');
    } catch (error) {
      console.error(error);
      toastSuccess('Xoá thất bại!');
    }
  }, []);

  const getTotalMoney = useMemo(() => {
    const total = cart.reduce((accumulator, item) => {
      return item.productPrice * item.quality + accumulator;
    }, 0);
    return total;
  }, [cart]);

  return (
    <section className='cart_detail'>
      <div className='cart_overlay'></div>
      <div className='cartDetails'>
        <div className='cart_heading'>
          <h2>Giỏ Hàng</h2>
          <div className='cart_cancel' onClick={() => handleHideCart()}></div>
        </div>
        {totalProduct === 0 ? (
          <div className='cart_content'>
            <img src={emty} />
            <h2>Không có sản phẩm nào!</h2>
          </div>
        ) : (
          <div className='cart_items'>
            {cart.map((val, idx) => {
              return (
                <div className='cart_item' key={`${val.id}${cart.id}`}>
                  <div className='item_img'>
                    <img
                      src={
                        val?.productImages?.length ? val.productImages[0] : ''
                      }
                    />
                  </div>
                  <div className='item_content'>
                    <div className='item_text'>
                      <h3>{val.productName}</h3>
                      <span className='item_price'>
                        {formatCash((val?.productPrice * val?.quality)?.toString())}
                      </span>
                      <div className='cart_option'>
                        <span
                          className='item_option'
                          onClick={() => handleDecreaseQuality(val)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='item_count'>{val.quality}</span>
                        <span
                          className='item_option'
                          onClick={() => handleIncreaseQuality(val)}
                        >
                          <HiOutlinePlusSm />
                        </span>
                      </div>
                    </div>
                    <span
                      className='item_delete'
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
        <div className='cart_handle'>
          <div
            className='cart_handle__dropup'
            onClick={() => handleToggleDetails()}
          ></div>
          <div className='cart_handle__details'>
            <h4>Order info</h4>
            <div className='details_text'>
              <p>Discount</p>
              <span>$0.00</span>
            </div>
            <div className='details_text'>
              <p>Shipping Cost</p>
              <span>Free</span>
            </div>
            <div className='details_text'>
              <p>Voucher</p>
              <span>None</span>
            </div>
          </div>
          <div className='cart_handle__total'>
            <span className='cart_handle__txt'>Tổng</span>
            <span className='cart_handle__price'>
              {formatCash(getTotalMoney?.toString())}
            </span>
          </div>
          <div className='cart_handle__btns'>
            <button className='btn btn_order' onClick={() => handleCheckOut()}>
              <span>
                <HiOutlineShoppingCart />
              </span>
              Thanh toán
            </button>
            <button className='btn btn_order' onClick={() => handleBuyMore()}>
              <span>
                <HiOutlineShoppingCart />
              </span>
              Mua Thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartDetails;
