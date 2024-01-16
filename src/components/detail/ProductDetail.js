import React, { useCallback } from 'react';
import './ProductDetailStyle.scss';
import '../../components/card/CardProductStyle.scss';
import bs1 from '../../imgage/bestsell01.png';
import user_icon from '../../imgage/userIcon.jpg';
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai';
import { BsHeart, BsCalendarCheck, BsCartPlus } from 'react-icons/bs';
import { GoPlusSmall } from 'react-icons/go';
import { HiOutlineMinusSm } from 'react-icons/hi';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import Contex from '../../store/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardProduct from '../card/CardProduct';
import productApi from '../../api/productApi';
import item1 from '../../imgage/item1.jpg';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';

import {
  Link,
  useParams,
  Outlet,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { SetCart, SetDialogShow, SetFirstAdd } from '../../store/Actions';
import cartApi from '../../api/cartApi';
import { getProductById, getProducts } from '../../firebase/queries/products';
import {
  formatCash,
  handleGoToTop,
  toastError,
  toastInfo,
  toastSuccess,
} from '../../utils';
import {
  addToCart,
  getCartByProductId,
  updateProductInCart,
} from '../../firebase/queries/cart';
import {
  MESSAGE_ADDED_TO_CARD,
  MESSAGE_ADDED_TO_WISHLIST,
  MESSAGE_UNKNOWN,
  MESSAGE_WISHLIST_ERROR,
} from '../../constants';
import LoadingPage from '../../pages/LoadingPage';
import {
  addToWishlist,
  getWishlistByProductId,
} from '../../firebase/queries/wishlist';
import { addComment } from '../../firebase/queries/comments';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import moment from 'moment';

const ProductDetail = () => {
  const params = useParams();
  const foodType = params?.FoodID;

  const [activeTab, setACtiveTab] = useState(true);
  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, isSignedIn, user, cart, firstAdd } = state;

  const [itemList, setItemList] = useState([]);

  //so san pham hien tai dang xem
  const [number, setNumber] = useState(1);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [yourComment, setYourComment] = useState('');
  const [star, setStar] = useState(5);
  const [comments, setComment] = useState([]);

  const handleActiveTab = () => {
    setACtiveTab(!activeTab);
  };

  useEffect(() => {
    if (user) {
      const header_userName = document.querySelector('.account_name');
      header_userName.innerHTML = user.displayName;
      try {
        document.querySelector('.img_account').src = user.photoURL;
        document.querySelector('.img_user').src = user.photoURL;
      } catch (error) {
        console.log('imgage err');
      }
    }
  }, []);

  const getProduct = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProductById(params.FoodID);
      setProduct(data);
      const relativeProducts = await getProducts(data.category);
      setItemList(relativeProducts.slice(0, 4));
      handleGoToTop();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [foodType]);

  useEffect(() => {
    foodType && getProduct();
  }, [foodType]);

  //toast notify
  const notify = () => {
    //nếu đã đăng nhập tài khoản thì active cart
    if (isSignedIn) {
      toast.success('The product has been added to your cart', {
        theme: 'colored',
      });
    } else {
      //thông báo phải login mới thực hiện được chức năng( dialogshow)
      depatch(SetDialogShow(true));
    }
  };

  const notifyFavotites = () => {
    //nếu đã đăng nhập tài khoản thì active cart
    if (isSignedIn) {
      toast.error('The product has been added to your favorites', {
        theme: 'colored',
        icon: ({ theme, type }) => <BsHeart />,
      });
    } else {
      depatch(SetDialogShow(true));
    }
  };

  const handlePluss = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
  };

  const handleMinuss = () => {
    if (number > 1) {
      const newNumber = number - 1;
      setNumber(newNumber);
    }
  };

  //xu ly di chuot vao star (active so star tuong ung)
  const handleRateStar = (e) => {
    //lay ra class tuong ung
    console.log(e.target.classList);
    const value = +e.target.classList.value.slice(0, 1);
    console.log(value);
    setStar(value);
  };

  const handleAddToCart = useCallback(async () => {
    if (!isSignedIn) depatch(SetDialogShow(true));
    try {
      setLoadingPage(true);
      const products = await getCartByProductId(foodType);
      if (products.length === 0) {
        const cartParam = {
          productId: foodType,
          userId: user.uid,
          quality: number,
        };
        await addToCart(cartParam);
      } else {
        await updateProductInCart(products[0].id, {
          quality: products[0].quality + number,
        });
      }
      toastSuccess(MESSAGE_ADDED_TO_CARD);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  }, [product, isSignedIn, foodType, number]);

  const handleAddToWishList = useCallback(async () => {
    if (!isSignedIn) depatch(SetDialogShow(true));
    try {
      setLoadingPage(true);
      const products = await getWishlistByProductId(foodType);
      if (products.length === 0) {
        const cartParam = {
          productId: foodType,
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
      setLoadingPage(false);
    }
  }, [product, isSignedIn, foodType]);

  const handleChangeComment = useCallback((e) => {
    const comment = e.target.value;
    setYourComment(comment);
  }, []);

  const handlePostComment = useCallback(async () => {
    //TODO:
    try {
      const dataParams = {
        userId: user.uid,
        userName: user.displayName,
        comment: yourComment,
        productId: foodType,
        rate: star,
      };
      await addComment(dataParams);
      resetData();
      console.log('Added comment');
    } catch (error) {
      console.error(error);
      toastError(MESSAGE_UNKNOWN);
    }
  }, [yourComment, star]);

  const resetData = useCallback(() => {
    setYourComment('');
    setStar(5);
  }, []);

  const getCommentsByProductId = useCallback(() => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('productId', '==', foodType),
        orderBy('createdAt', 'desc')
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComment(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, [foodType]);

  useEffect(() => {
    //TODO: GET PRODUCTS
    foodType && getCommentsByProductId();
  }, [foodType]);

  return (
    <div className='detail_product'>
      {loadingPage && <LoadingPage />}
      {loading ? (
        <h2 className='loading'>Loading...</h2>
      ) : (
        <>
          {product ? (
            <>
              <div className='detail_content wrapper_web row'>
                <div className='content_img col-6 col-sm-12'>
                  <InnerImageZoom
                    src={product?.images?.length > 0 ? product?.images[0] : ''}
                    zoomSrc={
                      product?.images?.length > 0 ? product.images[0] : ''
                    }
                    zoomType='hover'
                    zoomPreload={true}
                  />
                </div>
                <div className='content_text col-6 col-sm-12'>
                  <h2 className='detail_content__title'>{product?.name} </h2>
                  {/* <div className='detail_content__rate'>
                <div className='rate_star'>
                  {Array.from({ length: product[0].rate }, (val, idx) => {
                    return (
                      <span>
                        {' '}
                        <AiTwotoneStar />
                      </span>
                    );
                  })}
                  {Array.from({ length: 5 - product[0].rate }, (val, idx) => {
                    return (
                      <span>
                        {' '}
                        <AiOutlineStar />
                      </span>
                    );
                  })}
                </div>
                <div className='rate_comment'>
                  <span>0</span> Customer Reviews
                </div>
              </div> */}
                  <div className='detail_content__price'>
                    <span>{formatCash(product?.price)}</span>
                  </div>
                  <div className='detail_content__tags'>
                    <div className='detail_content__tag'>
                      <div className='detail_content__tag-label'>Danh mục:</div>
                      <div className='detail_content__tag-detail'>{url}</div>
                    </div>
                    {/* <div className='detail_content__tag'>
                  <div className='detail_content__tag-label'>Country:</div>
                  <div className='detail_content__tag-detail'>
                    {product[0].country}
                  </div>
                </div> */}
                  </div>
                  <div className='detail_content__desc'>
                    The Original Butcher's Feast® for 4
                  </div>
                  {/* <div className='detail_content__form'>
                <div className='price-block'>
                  <label>
                    <input
                      type='radio'
                      name='radio-button'
                      value='15'
                      checked={number === 2 ? true : false}
                    />
                    <span>Mua 2 nhận giảm giá 15%</span>
                  </label>
                </div>
                <div className='price-block'>
                  <label>
                    <input
                      type='radio'
                      name='radio-button'
                      value='20'
                      checked={number === 3 || number === 4 ? true : false}
                    />
                    <span>Buy 3 get 25 percent off</span>
                  </label>
                </div>
                <div className='price-block'>
                  <label>
                    <input
                      type='radio'
                      name='radio-button'
                      value='50'
                      checked={number >= 5 ? true : false}
                    />
                    <span>Buy 5 get 50 percent off</span>
                  </label>
                </div>
              </div> */}
                  <div className='detail_content__btns'>
                    <div className='detail_content__btns-handle'>
                      <span
                        className='handle_add btn_cicle'
                        onClick={() => handleMinuss()}
                      >
                        <HiOutlineMinusSm />
                      </span>
                      <span className='handle_qnt'>{number}</span>
                      <span
                        className='handle_minus btn_cicle'
                        onClick={() => handlePluss()}
                      >
                        <GoPlusSmall />
                      </span>
                    </div>
                    <div className='detail_content__add'>
                      <button
                        className='btn btn_order'
                        onClick={() => handleAddToCart()}
                      >
                        <span>
                          <BsCartPlus />
                        </span>
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                    <div
                      className='btn_cicle'
                      onClick={() => handleAddToWishList()}
                    >
                      <BsHeart />
                    </div>
                  </div>
                  <div className='detail_content__commits'>
                    <div className='detail_content__commit'>
                      <span>
                        {' '}
                        <MdOutlineLocalShipping />
                      </span>
                      <p>Free global shipping on all orders</p>
                    </div>
                    <div className='detail_content__commit'>
                      <span>
                        <BsCalendarCheck />
                      </span>
                      <p>2 hours easy returns if you change your mind</p>
                    </div>
                    <div className='detail_content__commit'>
                      <span>
                        <BsCalendarCheck />
                      </span>
                      <p>Order before noon for same day dispatch</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='detail_tab wrapper_web'>
                <div className='detail_tab__btns'>
                  <div
                    className={`detail_tab_btn ${activeTab ? 'active' : ''}`}
                    onClick={() => handleActiveTab()}
                  >
                    <span>Miêu tả</span>
                  </div>
                  <div
                    className={`detail_tab_btn ${activeTab ? '' : 'active'} `}
                    onClick={() => handleActiveTab()}
                  >
                    <span>Bình luận({comments.length})</span>
                  </div>
                </div>
                {activeTab ? (
                  <div className='detail_tab__content'>
                    <p>{product?.desc}</p>

                    <div className='detail_tab__content-table'>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title first'>
                            best foods
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients first'>
                          Thành phần
                        </div>
                      </div>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title'>
                            24
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients'>
                          Trứng
                        </div>
                      </div>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title'>
                            24
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients'>
                          Trứng
                        </div>
                      </div>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title'>
                            24
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients'>
                          Trứng
                        </div>
                      </div>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title'>
                            24
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients'>
                          Trứng
                        </div>
                      </div>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title'>
                            24
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients'>
                          Trứng
                        </div>
                      </div>
                      <div className='detail_tab__content-col'>
                        <div className='detail_tab__content-col-wrapper'>
                          <div className='detail_tab__content-col-title'>
                            24
                          </div>
                          <div className='detail_tab__content-col-des'>
                            28cm size
                          </div>
                        </div>
                        <div className='detail_tab__content-ingredients'>
                          Trứng
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='detail-tab-comment__comment'>
                    <div className='detail-tab-comment__container'>
                      {comments.map((comment) => {
                        return (
                          <div className='detail-tab-comment__customer'>
                            <div className='user_img'>
                              <img src={user_icon} />
                            </div>
                            <div className='detail-tab-comment__wrapper'>
                              <div className='detail-tab-comment__row'>
                                <h4 className='detail-tab-comment__name'>
                                  {comment.userName}
                                </h4>
                                <span className='time'>{moment(comment.createdAt?.toDate()).format('L')} {'-'}</span>
                                <span className='time'>{moment(comment.createdAt?.toDate()).format('LTS')}</span>
                              </div>
                              <div className='detail-tab-comment__stars'>
                                {Array.from({ length: comment.rate }, () => 0 ).map((item) => {
                                  return (
                                    <span>
                                      {' '}
                                      <AiTwotoneStar />
                                    </span>
                                  );
                                })}
                              </div>
                              <p className='detail-tab-comment__content'>
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className='detail_tab_form'>
                      <div className='user_img'>
                        <img className='img_user' src={user_icon} />
                      </div>
                      <form className='detail-tab-user__form'>
                        <div className='detail-tab-user__row'>
                          <div className='detail-tab-user'>
                            <div className='detail-tab-rate'>
                              {Array.from({ length: star }, (val, idx) => {
                                return (
                                  <span>
                                    {' '}
                                    <AiTwotoneStar
                                      className={`${idx + 1} active_star`}
                                      onMouseEnter={(e) => handleRateStar(e)}
                                    />
                                  </span>
                                );
                              })}
                              {Array.from({ length: 5 - star }, (val, idx) => {
                                return (
                                  <span>
                                    {' '}
                                    <AiTwotoneStar
                                      className={idx + star + 1}
                                      onMouseEnter={(e) => handleRateStar(e)}
                                    />
                                  </span>
                                );
                              })}

                              <span className='detail-tab-user__msg'>
                                (Hãy chọn)
                              </span>
                            </div>
                            <textarea
                              className='detail-tab-user__textarea'
                              placeholder='Nhập bình luận của bạn...'
                              onChange={handleChangeComment}
                              value={yourComment}
                            ></textarea>
                          </div>

                          <button
                            type='button'
                            onClick={handlePostComment}
                            disabled={yourComment.length === 0}
                            className='btn btn_order'
                          >
                            Bình luận
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='no-product'>Không tim thấy sản phẩm!</div>
          )}
        </>
      )}

      <div className='detail_list'>
        <div className='primary-yellow-text'>{url}</div>
        <div className='primary-heading-text'>Các sản phẩm khác</div>
        <div className='detail-products__wrapper wrapper_web row'>
          {itemList.map((val) => {
            return (
              <CardProduct
                key={val.id}
                item={val}
                dislayItems={'col-3'}
                notify={notify}
                notifyFavotites={notifyFavotites}
              />
            );
          })}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ProductDetail;
