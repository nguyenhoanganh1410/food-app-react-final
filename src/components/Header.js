import '../styles/HeaderStyle.scss';
import logo from '../imgage/logo.svg';
import user_icon from '../imgage/userIcon.jpg';
import './Header.scss';
import { MdAccountBox } from 'react-icons/md';
import { FaBars, FaVoteYea } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { nav } from '../data/data';
import { useCallback, useContext, useEffect } from 'react';
import Contex from '../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import {
  SetCart,
  SetDialogShow,
  SetOpenBar,
  SetOpenWishList,
  SetUser,
} from '../store/Actions';
import { auth, db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getProducts } from '../firebase/queries/products';

const Header = () => {
  const { state, depatch } = useContext(Contex);
  const {
    user,
    cart,
    isSignedIn,
  } = state;
  const navigate = useNavigate();

  const handleOpenCart = () => {
    if (isSignedIn) {
      const cartDetail = document.querySelector('.cartDetails');
      const cartOverlay = document.querySelector('.cart_overlay');
      cartOverlay.classList.add('active_cartOverlay');
      cartDetail.classList.add('active_cartDetails');
    } else {
      depatch(SetDialogShow(true));
    }
  };

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

  const handleOpenBar = () => {
    depatch(SetOpenBar(true));
  };

  const handleOpenWishList = () => {
    depatch(SetOpenWishList(true));
  };

  const handleGoToMyOrders = useCallback(() => {
    navigate('/my-orders')
  }, [navigate]);

  useEffect(() => {
    const handScroll = () => {
      const header = document.querySelector('.header');
      const btnSroll = document.querySelector('.btn-scroll');
      if (window.scrollY > 50) {
        header.classList.add('color_black');
      } else {
        header.classList.remove('color_black');
      }
      if (window.scrollY > 100) {
        btnSroll.classList.add('active-btnScrool');
      } else {
        btnSroll.classList.remove('active-btnScrool');
      }
    };
    window.addEventListener('scroll', handScroll);
    if (user) {
      const header_userName = document.querySelector('.account_name');
      header_userName.innerHTML = user.displayName;
      if (!user.photoURL) {
        document.querySelector('.img_account').src = user.photoURL;
      }
    }
    return () => {
      window.removeEventListener('scroll', handScroll);
    };
  }, [user]);

  const getCart = useCallback(async () => {
    try {
      const q = query(collection(db, 'cart'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      const products = await getProducts();
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const coveredData = data.map(item => {
          const findValue = products.find(value => value.id === item.productId);
          if(findValue) {
            return {
              ...item,
              productName: findValue.name,
              productPrice: +findValue.price,
              productImages: findValue.images
            }
          }
          return null;
        })
        depatch(SetCart(coveredData));
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    user && getCart();
  }, [user]);

  return (
    <header className='header'>
      <div className='container'>
        <div className='bar' onClick={() => handleOpenBar()}>
          <FaBars />
        </div>
        <div className='header_left'>
          <Link to='/'>
            {' '}
            <img src={logo} />
          </Link>
          <nav>
            <ul>
              {nav.map((val) => {
                return (
                  <li key={val.id}>
                    <span>{val.icon}</span>
                    <Link className='nav_link' to={val.link}>
                      {val.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className='header_right'>
          <div className='cart' onClick={() => handleOpenCart()}>
            <span>
              <HiOutlineShoppingCart />
            </span>
            <span className='cart_number'>{cart?.length || 0}</span>
          </div>
          <div className='account'>
            {
              <Link to={user ? '#' : '/login'} className='account'>
                <div className='account_icon'>
                  <img className='img_account' src={user_icon} />
                </div>
                <span className='account_name'>Đăng Nhập</span>
              </Link>
            }
            {isSignedIn ? (
              <div className='account_option'>
                <ul>
                  <li>
                    <span>
                      <MdAccountBox />
                    </span>
                    <a>Tài Khoản</a>
                  </li>
                  <li onClick={() => handleOpenWishList()}>
                    <span>
                      <FaVoteYea />
                    </span>
                    <a>Sản phẩm yêu thích</a>
                  </li>
                  <li onClick={() => handleGoToMyOrders()}>
                    <span>
                      <FaVoteYea />
                    </span>
                    <a>Đơn hàng</a>
                  </li>
                  <li onClick={() => logout()}>
                    <span>
                      <IoLogOutOutline />
                    </span>
                    <a>Đăng Xuất</a>
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
