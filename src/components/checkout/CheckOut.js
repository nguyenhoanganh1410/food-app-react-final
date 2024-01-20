import './CheckOutStyle.scss';
import { FaUsers } from 'react-icons/fa';
import { MdConfirmationNumber, MdKeyboardArrowLeft } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import user_icon from '../../imgage/userIcon.jpg';
import iteam from '../../imgage/item1.jpg'; // gives image path
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Contex from '../../store/Context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { SetCart, SetUser } from '../../store/Actions';
import { useParams, useNavigate } from 'react-router-dom';
import { formatCash, handleGoToTop, toastError } from '../../utils';
import { auth } from '../../firebase';
import { addOrder } from '../../firebase/queries/orders';
import { MESSAGE_UNKNOWN } from '../../constants';
import LoadingPage from '../../pages/LoadingPage';
import { deleteProductInCart } from '../../firebase/queries/cart';

export const orderStatus = {
  newOrder: 'new-order',
  shipping: 'shipping',
  completed: 'completed',
  pending: 'pending'
};

var validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var validPhone = /^\d{10}$/;

const CheckOut = () => {
  const { state, depatch } = useContext(Contex);
  const { user, cart } = state;
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const header_userName = document.querySelector('.account_name');
      header_userName.innerHTML = user.displayName;
      document.querySelector('.info-name').innerHTML = user.displayName;
      try {
        document.querySelector('.img_account').src = user.photoURL;
        document.querySelector('.img_account_checkout').src = user.photoURL;
      } catch (error) {
        console.log('imgage err');
      }
    }
    handleGoToTop();
  }, [user]);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        depatch(SetUser(null));
        depatch(SetCart([]));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleReturnToShop = () => {
    navigate('/category/burgers');
  };

  const getTotalMoney = useMemo(() => {
    const total = cart.reduce((accumulator, item) => {
      return item.productPrice * item.quality + accumulator;
    }, 0);
    return total;
  }, [cart]);

  const handleCheckout = useCallback(async () => {
    if (
      phone.length == 0 ||
      email.length === 0 ||
      address.length == 0 ||
      fullName.length == 0
    ) {
      toastError('Hãy nhập đủ thông tin giao hàng!');
      return;
    }

    if (!email.match(validRegex)) {
      toastError('Email không hợp lệ!');
      return;
    }

    if (!phone.match(validPhone)) {
      toastError('Số  điện thoại phải 10 chữ số và chỉ chứa ký tự số!');
      return;
    }
    const dataParams = {
      phone,
      email,
      address,
      fullName,
      owner: user.uid,
      total: getTotalMoney,
      status: orderStatus.newOrder,
      payment: false,
      products: cart,
    };

    try {
      setLoading(true);
      await addOrder(dataParams);

      const carts = cart.map(item => item.id);
      const cartsPromise = carts.map(item => deleteProductInCart(item));
      await Promise.all(cartsPromise);
      console.log('deleted cart!');
      resetData();
      navigate('/my-orders')
    } catch (error) {
      toastError(MESSAGE_UNKNOWN);
    } finally {
      setLoading(false);
    }
    //TODO: handle tạo order
  }, [phone, email, address, fullName, getTotalMoney, user, cart]);
  const resetData = () => {
    setEmail('');
    setAddress('');
    setPhone('');
    setFullName('');
    depatch(SetCart([]));
  }
  return (
    <div className='checkout'>
      { loading && <LoadingPage />}
      <div className='checkout_content wrapper_web row'>
        <div className='content_left col-6 col-sm-12'>
          <div className='checkout-progress'>
            <div className='checkout-progress__node active'>
              <div className='checkout-progress__icon'>
                <FaUsers />
              </div>
              <span className='checkout-progress__description'>Đăng nhập</span>
            </div>
            <div className='checkout-progress__line active_line'></div>
            <div className='checkout-progress__node active'>
              <div className='checkout-progress__icon'>
                <MdConfirmationNumber />
              </div>
              <span className='checkout-progress__description'>Xác nhận</span>
            </div>
            <div className='checkout-progress__line'></div>

            <div className='checkout-progress__node'>
              <div className='checkout-progress__icon'>
                <AiOutlineLike />
              </div>
              <span className='checkout-progress__description'>
                Thành công!
              </span>
            </div>
          </div>
          <div className='checkout-user'>
            <h2>Thông tin liên lạc</h2>
            <div className='checkout-user-info'>
              <img className='img_account_checkout' src={user_icon} />
              <div className='info-content'>
                <span className='info-name'>{user?.displayName}</span>
                <div className='info-logout' onClick={() => logout()}>
                  Đăng Xuất
                </div>
              </div>
            </div>
            {/* <div className="price-block">
              <label>
                <input type="checkbox" name="radio-button" value="" />
                <span>Keep me up to date on news and offers</span>
              </label>
            </div> */}
          </div>
          <div className='checkout-form'>
            <h2 className='form-title'>Địa chỉ nhận hàng</h2>
            <div className='form-input'>
              <div className='input-row'>
                <div className='input-field'>
                  <input
                    placeholder='Họ và tên'
                    value={fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  ></input>
                  <span className='errName'></span>
                </div>
                <div className='input-field'>
                  <input
                    type='email'
                    placeholder='Nhập email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <span className='errPhone'></span>
                </div>
              </div>
              <div className='input-row'>
                <div className='input-field' style={{ margin: 0 }}>
                  <input
                    placeholder='Địa chỉ'
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                  <span className='errAddress'></span>
                </div>
              </div>
              <div className='input-row'>
                {/* <div className="input-field">
                  <input placeholder="First name"></input>
                  <span className="errName"></span>
                </div> */}
                <div className='input-field'>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Số điện thoại'
                  ></input>
                  <span className='errPhone'></span>
                </div>
              </div>
            </div>
            <div className='form-btns'>
              <div className='return-to-shop'>
                <div className='arrow'>
                  <MdKeyboardArrowLeft />
                </div>
                <span onClick={() => handleReturnToShop()}>Quay lại</span>
              </div>
              <button onClick={handleCheckout} className='btn btn_order'>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        <div className='content_right col-6 col-sm-12'>
          <ul className='content_product'>
            {cart.map((val) => {
              return (
                <li>
                  <div className='li_product'>
                    <div className='product_img'>
                      <img
                        src={
                          val?.productImages?.length > 0
                            ? val.productImages[0]
                            : ''
                        }
                      />
                    </div>
                    <div className='product_content'>
                      <span className='product_name'>{val.productName}</span>
                      <div>
                        <span className='product_address'>
                          Giá: {formatCash(val.productPrice)}{' '}
                        </span>
                        <span className='product_address'> - </span>
                        <span className='product_address'>
                          Số lượng: x{val.quality}{' '}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='product_price'>{`$${formatCash(
                    val.productPrice * val.quality
                  )}`}</div>
                </li>
              );
            })}
          </ul>
          <div className='checkout-discount'>
            <input type='text' placeholder='Mã Khuyến Mãi' />
            <button className='btn btn_order btn_custom'>Áp dụng</button>
          </div>
          <div className='checkout-detail'>
            <div className='checkout-detail_row'>
              <span className='detail_label'>Khuyến mãi</span>
              <span className='detail_price'>0đ</span>
            </div>
            <div className='checkout-detail_row'>
              <span className='detail_label'>Phí vận chuyển</span>
              <span className='detail_price'>Miễn phí</span>
            </div>
            {/* <div className="checkout-detail_row">
              <span className="detail_label">Taxes (estimated)</span>
              <span className="detail_price">0 đ</span>
            </div> */}
          </div>
          <div className='checkout-total'>
            <span className='total_label'>Tổng tiền</span>
            <span className='total_price'>{formatCash(getTotalMoney)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
