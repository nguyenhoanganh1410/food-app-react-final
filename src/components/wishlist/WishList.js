import './WishListStyle.scss';
import { FaVoteYea } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiLogout } from 'react-icons/hi';
import Contex from '../../store/Context';
import { useCallback, useContext, useEffect } from 'react';
import {
  SetOpenWishList,
  SetWishList,
} from '../../store/Actions';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { getProducts } from '../../firebase/queries/products';
import { formatCash, toastError, toastSuccess } from '../../utils';
import { deleteProductInWishlist } from '../../firebase/queries/wishlist';

const WishList = () => {
  const { state, depatch } = useContext(Contex);
  const {
    user,
    wishList,
    openWishList,
  } = state;

  const getWishList = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'wishlist'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const products = await getProducts();
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const coveredData = data.map((item) => {
          const findValue = products.find(
            (value) => value.id === item.productId
          );
          if (findValue) {
            return {
              ...item,
              productName: findValue.name,
              productPrice: +findValue.price,
              productDesc: findValue.desc,
              productImages: findValue.images,
            };
          }
          return null;
        });
        depatch(SetWishList(coveredData));
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    user && getWishList();
  }, [user]);

  const handleDeleteItem = useCallback(async (wishListParams) => {
    try {
      await deleteProductInWishlist(wishListParams.id);
      toastSuccess('Xoá thành công!');
    } catch (error) {
      console.error(error);
      toastError('Xoá thất bại!');
    }
  }, []);

  const handleCloseWishList = () => {
    depatch(SetOpenWishList(false));
  };

  return (
    <section className={`wishlist ${openWishList ? 'active_wishList' : ''}`}>
      <div className='wishlist_top'>
        <div className='wishlist_shop'>
          <span>
            <FaVoteYea />
          </span>
          <span>Danh mục yêu thích</span>
        </div>
        <span className='out_btn' onClick={() => handleCloseWishList()}>
          <HiLogout />
        </span>
      </div>
      <div className='wishlist_items'>
        {wishList.map((val) => {
          return (
            <div key={`${val.id} ${val.productName}`} className='wishlist_item'>
              <div className='wishlist_img'>
                <img
                  src={val?.productImages?.length ? val.productImages[0] : ''}
                />
              </div>
              <div className='wishlist_content'>
                <span className='content_name'>{val.productName}</span>
                <p className='content_desc'>{val.productDesc}</p>
                <span className='content_price'>
                  {formatCash(val?.productPrice?.toString())}
                </span>
              </div>
              <span onClick={() => handleDeleteItem(val)}>
                <AiOutlineDelete />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WishList;
