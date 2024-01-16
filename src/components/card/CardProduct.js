import { AiOutlineShoppingCart, AiTwotoneStar } from 'react-icons/ai';

import { BsHeart } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';

import './CardProductStyle.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import Contex from '../../store/Context';
import cartApi from '../../api/cartApi';
import {
  SetCart,
  SetDialogShow,
  SetFirstAdd,
  SetFirstAddWish,
  SetWishList,
} from '../../store/Actions';
import { formatCash, toastInfo, toastSuccess } from '../../utils';
import {
  addToCart,
  getCartByProductId,
  updateProductInCart,
} from '../../firebase/queries/cart';
import LoadingPage from '../../pages/LoadingPage';
import {
  addToWishlist,
  getWishlistByProductId,
  updateProductInWishlist,
} from '../../firebase/queries/wishlist';
import { MESSAGE_ADDED_TO_CARD, MESSAGE_ADDED_TO_WISHLIST, MESSAGE_WISHLIST_ERROR } from '../../constants';

const CardProduct = ({ dislayItems, item, notify }) => {
  const navigate = useNavigate();
  const { state, depatch } = useContext(Contex);
  const { url, isSignedIn, user } = state;
  const [loading, setLoading] = useState(false);

  const hanldClickItem = (id) => {
    navigate(`/${url}/${id}`);
  };

  const handleAddToCard = useCallback(async () => {
    if (!isSignedIn) depatch(SetDialogShow(true));
    try {
      setLoading(true);
      const products = await getCartByProductId(item.id);
      if (products.length === 0) {
        const cartParam = {
          productId: item.id,
          userId: user.uid,
          quality: 1,
        };
        await addToCart(cartParam);
      } else {
        await updateProductInCart(products[0].id, {
          quality: products[0].quality + 1,
        });
      }
      toastSuccess(MESSAGE_ADDED_TO_CARD)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, item]);

  const handleAddToWishList = useCallback(async () => {
    if (!isSignedIn) depatch(SetDialogShow(true));
    try {
      setLoading(true);
      const products = await getWishlistByProductId(item.id);
      if (products.length === 0) {
        const cartParam = {
          productId: item.id,
          userId: user.uid,
        };
        await addToWishlist(cartParam);
        toastSuccess(MESSAGE_ADDED_TO_WISHLIST);
      } else {
        toastInfo(MESSAGE_WISHLIST_ERROR);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, item]);

  return (
    <div
      key={item.id}
      className={`shop-product ${dislayItems} col-md-4 col-xs-6`}
    >
      {loading && <LoadingPage />}
      <div style={dislayItems === 'col-12' ? {display: "flex"} : {}} className='product-block'>
        <div
          className='shop-product__img'
          onClick={() => hanldClickItem(item.id)}
        >
          <img
            src={item.images.length > 0 ? item.images[0] : ''}
            alt='image erro'
          />
          <div className='shop-product__rate'>
            <span>
              <AiTwotoneStar />
            </span>
            <span className='rate-number'>{item.rate}</span>
          </div>
        </div>
        <div className='shop-product__content'>
          <div
            className='shop-product__name'
            onClick={() => hanldClickItem(item.id)}
          >
            {item.name}
          </div>
          <p className='shop-product__decription'>{item.desc}</p>
          <div className='shop-product__row'>
            <div className='row_location'>
              <span className='location-icon'>
                <IoLocationSharp />
              </span>
              <span className='location-name'>{item.country}</span>
            </div>
            <div className='row_price'>
              <span>{formatCash(item.price)}</span>
            </div>
          </div>
        </div>
        <div className='shop-product__btns'>
          <div
            className='shop-product__btn'
            onClick={() => handleAddToWishList()}
          >
            <BsHeart />
          </div>
          <div className='shop-product__btn' onClick={() => handleAddToCard()}>
            <AiOutlineShoppingCart />
          </div>
        </div>
        <div className='shop-product__label'></div>
      </div>
    </div>
  );
};

export default CardProduct;
