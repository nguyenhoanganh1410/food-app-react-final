import './CategoryStyle.scss';
import { useState, useEffect, useContext, useCallback } from 'react';
import { filler_food, filterPriceDropList } from '../../data/data';
import PanigationButton from '../../components/panigation/Panigation';
import Contex from '../../store/Context';
import { SetURL } from '../../store/Actions';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsFillGrid3X3GapFill, BsGrid1X2Fill } from 'react-icons/bs';
import CardProduct from '../card/CardProduct';
import 'react-toastify/dist/ReactToastify.css';
import BannerPaths from './BannerPaths';
import { handleGoToTop } from '../../utils';
import { getProducts } from '../../firebase/queries/products';

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationNumber, setPaginationNumber] = useState(0);
  const [itemList, setItemList] = useState([]);

  const [filter, setFilter] = useState({
    _limit: 20,
    _page: 1,
  });

  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(true);

  //hien thi 1 san pham tren 1 row
  const [oneGrid, setOneGrid] = useState(false);

  //dislay 4 items or 1 items
  const [dislayItems, setDislayItems] = useState('col-3');

  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, isSignedIn, user } = state;

  const [activeDropList, setActiveDropList] = useState(false);
  const typeFoodID = params?.typeFoodID;
  const priceSort = params?.price;

  // useEffect(() => {
  //   const searchPage = searchParams.get('_page') || '';
  //   const filterPrice_lte = searchParams.get('price_lte') || '';
  //   const filterPrice_gte = searchParams.get('price_gte') || '';
  //   if (searchPage.length != 0) {
  //     setFilter({
  //       ...filter,
  //       _page: searchPage,
  //       // price_gte:filterPrice_gte,
  //       // price_lte: filterPrice_lte
  //     });
  //   } else {
  //     setFilter({
  //       ...filter,
  //       _page: 1,
  //       // price_gte:filterPrice_gte,
  //       // price_lte: filterPrice_lte,
  //     });
  //   }

  //   if (user) {
  //     //update name user in header
  //     const header_userName = document.querySelector('.account_name');
  //     header_userName.innerHTML = user.displayName;
  //     document.querySelector('.img_account').src = user.photoURL;
  //   }
  // }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const typeFoodParam = params?.typeFoodID;
      const priceParam = searchParams.get('price');
      console.log(priceParam);
      const products = await getProducts(typeFoodParam, priceParam);
      setPaginationNumber(products.length);
      setItemList(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (params.typeFoodID !== url) {
      depatch(SetURL(params.typeFoodID));
    }
    fetchProducts();
   // handleGoToTop();
  }, [url, filter, params]);

  const handleActiveFilterFood = (idx) => {
    setFilter({
      _limit: 20,
      _page: 1,
    });
    if (idx === 0) {
      depatch(SetURL('burgers'));
    } else if (idx === 1) {
      depatch(SetURL('sandwiches'));
    } else if (idx === 2) {
      depatch(SetURL('drinks'));
    } else if (idx === 3) {
      depatch(SetURL('pizzas'));
    }
  };

  const handleShowDropList = () => {
    setActiveDropList(!activeDropList);
  };

  const handleGridOne = () => {
    setDislayItems('col-12');
    setOneGrid(true);
  };
  const handleGridFour = () => {
    setDislayItems('col-3');
    setOneGrid(false);
  };

  const handlerChangePage = (dataPage) => {
    const newPage = dataPage + 1;
    setFilter({
      ...filter,
      _page: newPage,
    });

    //set url params
    setSearchParams({
      ...filter,
      _page: newPage,
    });
  };

  const handleSearchProduct = (e) => {};

  const handleFilterPrice = (e) => {
    const text = e.target.value;
    if (text === 'under50') {
      //set url params
      setSearchParams({
        _limit: 20,
        _page: 1,
        price_lte: 50,
      });
      setFilter({
        _limit: 20,
        _page: 1,
        price_lte: 50,
      });
    } else if (text === 'about50_100') {
      setSearchParams({
        _limit: 20,
        _page: 1,
        price_gte: 50,
        price_lte: 100,
      });
      setFilter({
        _limit: 20,
        _page: 1,
        price_gte: 50,
        price_lte: 100,
      });
    } else if (text === 'above100') {
      setSearchParams({
        _limit: 20,
        _page: 1,
        price_gte: 100,
      });
      setFilter({
        _limit: 20,
        _page: 1,
        price_gte: 100,
      });
    }
  };

  const handleFilterDropList = (val, idx) => {
    const textFilter = document.querySelector('.text-filter');
    textFilter.innerHTML = val.text;
    setActiveDropList(false);
    setSearchParams({price: val.value});
  };

  return (
    <section className='shop'>
      <BannerPaths />
      <div className='wrapper_web'>
        <div className='shop_container'>
          <div className='shop-filter'>
            <div className='filter-block'>
              <h2>Phổ biến</h2>
              <ul className='filter-food'>
                {filler_food.map((val, index) => {
                  return (
                    <Link to={`/category/${val.url}`}>
                      <li
                        key={val.id}
                        onClick={() => handleActiveFilterFood(index)}
                        className={val.url === typeFoodID ? 'active' : null}
                      >
                        <img src={val.img}></img>
                        {val.text}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            {/* <div className='filter-block'>
              <h2>price</h2>
              <div className='filter-price'>
                <div className='price-block'>
                  <label>
                    <input
                      type='radio'
                      name='radio-button'
                      value='under50'
                      onChange={(e) => handleFilterPrice(e)}
                    />
                    <span>under $50</span>
                  </label>
                </div>
                <div className='price-block'>
                  <label>
                    <input
                      type='radio'
                      name='radio-button'
                      value='about50_100'
                      onChange={(e) => handleFilterPrice(e)}
                    />
                    <span>$50 to $100</span>
                  </label>
                </div>
                <div className='price-block'>
                  <label>
                    <input
                      type='radio'
                      name='radio-button'
                      value='above100'
                      onChange={(e) => handleFilterPrice(e)}
                    />
                    <span>above $100</span>
                  </label>
                </div>
              </div>
            </div> */}
            {/* <div className='filter-block'>
              <h2>rate</h2>
              <ul className='filter-rate'>
                <li className='rate-one' onClick={notifyUpdate}>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span className='rate-up'> & up </span>
                </li>
                <li className='rate-second' onClick={notifyUpdate}>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiOutlineStar />
                  </span>
                  <span className='rate-up'> & up </span>
                </li>
                <li className='rate-third' onClick={notifyUpdate}>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiTwotoneStar />
                  </span>
                  <span>
                    <AiOutlineStar />
                  </span>
                  <span>
                    <AiOutlineStar />
                  </span>
                  <span className='rate-up'> & up </span>
                </li>
              </ul>
            </div> */}
          </div>
          <div className='shop-content'>
            <div className='shop-handle'>
              <form
                className='shop-handle__search'
                onSubmit={(e) => handleSearchProduct(e)}
              >
                <input
                  placeholder='Nhập để tìm kiếm'
                  onChange={(e) => {
                    setTextSearch(e.target.value);
                  }}
                />

                <Link
                  to={'/category/our-foods'}
                  className='shop-handle__search-btn'
                  type='button'
                  onClick={(e) => handleSearchProduct(e)}
                >
                  <BiSearch />
                </Link>
              </form>
              <div className='shop-handle__drop'>
                <div
                  className='dop-current'
                  onClick={() => handleShowDropList()}
                >
                  <span className='text-filter'>Chức năng</span>
                  <span className='icon'>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                </div>
                <ul
                  className={`drop-list ${activeDropList ? 'active_drop' : ''}`}
                >
                  {filterPriceDropList.map((val, idx) => {
                    return (
                      <li
                        key={val.id}
                        className='drop_item'
                        onClick={() => handleFilterDropList(val, idx)}
                      >
                        {val.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='shop-handle__display'>
                <span
                  className={oneGrid ? 'active' : ''}
                  onClick={() => handleGridOne()}
                >
                  <BsGrid1X2Fill />
                </span>
                <span
                  className={!oneGrid ? 'active' : ''}
                  onClick={() => handleGridFour()}
                >
                  <BsFillGrid3X3GapFill />
                </span>
              </div>
            </div>
            {loading ? (
              <h2 className='loading'>Loading...</h2>
            ) : (
              <div className='shop-products row'>
                {itemList.length === 0 ? (
                  <h2 className='no_product'>No products</h2>
                ) : (
                  itemList.map((val) => {
                    return (
                      <CardProduct
                        key={val.id}
                        item={val}
                        dislayItems={dislayItems}
                      />
                    );
                  })
                )}
              </div>
            )}
            {/* <PanigationButton
              items={Math.ceil(paginationNumber / filter._limit)}
              pageNum={filter._page}
              handlerChangePage={handlerChangePage}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
