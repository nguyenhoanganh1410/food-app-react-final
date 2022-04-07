import "./CategoryStyle.scss";
import { useState, useEffect, useContext } from "react";
import { fillter_food, filterPriceDropList } from "../../data/data";
import productApi from "../../api/productApi";
import panigationApi from "../../api/panigationApi";
import PanigationButton from "../../components/panigation/Panigation";
import { useFeatch } from "../panigation/useFeatch";
import Contex from "../../store/Context";
import { SetURL } from "../../store/Actions";

import {
  AiTwotoneStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import {
  Link,
  useParams,
  Outlet,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { BiGridHorizontal, BiSearch } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import {
  BsThreeDots,
  BsHeart,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
} from "react-icons/bs";

import CardProduct from "../card/CardProduct";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import { SetDialogShow } from "../../store/Actions";
import BannerPaths from "./BannerPaths";

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

  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(true);
  //state active for filter by food name
  const [active_filterFood, setActiveFilterFood] = useState(-1);
  //hien thi 1 san pham tren 1 row
  const [oneGrid, setOneGrid] = useState(false);

  //dislay 4 items or 1 items
  const [dislayItems, setDislayItems] = useState("col-3");

  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, isSignedIn, user } = state;

  const [activeDropList, setActiveDropList] = useState(false);

  useEffect(() => {
    const searchPage = searchParams.get("_page") || "";
    const filterPrice_lte = searchParams.get("price_lte") || "";
    const filterPrice_gte = searchParams.get("price_gte") || "";
    if (searchPage.length != 0) {
      setFilter({
        ...filter,
        _page: searchPage,
        // price_gte:filterPrice_gte,
        // price_lte: filterPrice_lte
      });
    } else {
      setFilter({
        ...filter,
        _page: 1,
        // price_gte:filterPrice_gte,
        // price_lte: filterPrice_lte,
      });
    }

    if (user) {
      //update name user in header
      const header_userName = document.querySelector(".account_name");
      header_userName.innerHTML = user.displayName;
      document.querySelector(".img_account").src = user.photoURL;
    }
  }, []);

  useEffect(() => {
    if (params.typeFoodID !== url) {
      depatch(SetURL(params.typeFoodID));
    }

    const fetchProductList = async () => {
      try {
        const response = await productApi.getAll(url, filter);

        const responsePani = await panigationApi.getAll();

        if (url === "breads") {
          setPaginationNumber(responsePani.breads);
        } else if (url === "drinks") {
          setPaginationNumber(responsePani.drinks);
        } else if (url === "pizzas") {
          setPaginationNumber(responsePani.pizzas);
        } else if (url === "burgers") {
          setPaginationNumber(responsePani.burgers);
        } else if (url === "sandwiches") {
          setPaginationNumber(responsePani.sandwiches);
        } else if (url === "best-foods") {
          setPaginationNumber(60);
        }

        setItemList(response);
        setLoading(false);
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
  }, [url, filter]);

  
  


  const handleActiveFilterFood = (idx) => {
    setActiveFilterFood(idx);
    setFilter({
      _limit: 20,
      _page: 1,
    });
    // //click choise burders
    if (idx === 0) {
      depatch(SetURL("burgers"));
    } else if (idx === 1) {
      depatch(SetURL("breads"));
    } else if (idx === 2) {
      depatch(SetURL("sandwiches"));
    } else if (idx === 3) {
      depatch(SetURL("drinks"));
    } else if (idx === 4) {
      depatch(SetURL("pizzas"));
    }
  };

  const handleShowDropList = () => {
    setActiveDropList(!activeDropList);
  };

  const handleGridOne = () => {
    setDislayItems("col-12");
    setOneGrid(true);
  };
  const handleGridFour = () => {
    setDislayItems("col-3");
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

  console.log(filter);
  const handleSearchProduct = (e) => {
    // navigate("/category/our-foods");
    // depatch(SetURL("our-foods"));
    // setFilter({
    //   ...filter,
    //   name_like: textSearch,
    // });
    //set url params
    //set url params
    //setSearchParams(filter);
    //set url params
    // setSearchParams({
    //   ...filter,
    //   _page: 5,
    // });
  };

  const handleFilterPrice = (e) => {
    const text = e.target.value;
    if (text === "under50") {
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
    } else if (text === "about50_100") {
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
    } else if (text === "above100") {
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

  const notifyUpdate = () => {
    toast.info("This feature is updating...", {
      theme: "colored",
    });
  };



  //filter by drop list
  const handleFilterDropList = (val, idx) => {
    const textFilter = document.querySelector(".text-filter");
    textFilter.innerHTML = val.text;
    //close drop list
    setActiveDropList(false);
    if (idx === 0) {
      //low to hight
      setSearchParams({
        _sort: "price",
        _order: "asc",
        _limit: 20,
        _page: 1,
      });
      setFilter({
        _sort: "price",
        _order: "asc",
        _limit: 20,
        _page: 1,
      });
    } else if (idx === 1) {
      //hight to low
      setSearchParams({
        _sort: "price",
        _order: "desc",
        _limit: 20,
        _page: 1,
      });
      setFilter({
        _sort: "price",
        _order: "desc",
        _limit: 20,
        _page: 1,
      });
    } else if (idx === 2) {
      //rate: low to hight
      setSearchParams({
        _sort: "rate",
        _order: "asc",
        _limit: 20,
        _page: 1,
      });
      setFilter({
        _sort: "rate",
        _order: "asc",
        _limit: 20,
        _page: 1,
      });
    } else if (idx === 3) {
      //rate: hight to low
      setSearchParams({
        _sort: "rate",
        _order: "desc",
        _limit: 20,
        _page: 1,
      });
      setFilter({
        _sort: "rate",
        _order: "desc",
        _limit: 20,
        _page: 1,
      });
    }
  };
  return (
    <section className="shop">
      <BannerPaths />
      <div className="wrapper_web">
        <div className="shop_container">
          <div className="shop-filter">
            <div className="filter-block">
              <h2>Popular</h2>
              <ul className="filter-food">
                {fillter_food.map((val, index) => {
                  return (
                    <Link to={`/category/${val.text}`}>
                      <li
                        key={val.id}
                        onClick={() => handleActiveFilterFood(index)}
                        className={
                          index === active_filterFood ? "active" : null
                        }
                      >
                        <img src={val.img}></img>
                        {val.text}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div className="filter-block">
              <h2>price</h2>
              <div className="filter-price">
                <div className="price-block">
                  <label>
                    <input
                      type="radio"
                      name="radio-button"
                      value="under50"
                      onChange={(e) => handleFilterPrice(e)}
                    />
                    <span>under $50</span>
                  </label>
                </div>
                <div className="price-block">
                  <label>
                    <input
                      type="radio"
                      name="radio-button"
                      value="about50_100"
                      onChange={(e) => handleFilterPrice(e)}
                    />
                    <span>$50 to $100</span>
                  </label>
                </div>
                <div className="price-block">
                  <label>
                    <input
                      type="radio"
                      name="radio-button"
                      value="above100"
                      onChange={(e) => handleFilterPrice(e)}
                    />
                    <span>above $100</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-block">
              <h2>rate</h2>
              <ul className="filter-rate">
                <li className="rate-one" onClick={notifyUpdate}>
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
                  <span className="rate-up"> & up </span>
                </li>
                <li className="rate-second" onClick={notifyUpdate}>
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
                  <span className="rate-up"> & up </span>
                </li>
                <li className="rate-third" onClick={notifyUpdate}>
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
                  <span className="rate-up"> & up </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="shop-content">
            <div className="shop-handle">
              <form
                className="shop-handle__search"
                onSubmit={(e) => handleSearchProduct(e)}
              >
                <input
                  placeholder="Search your product"
                  onChange={(e) => {
                    setTextSearch(e.target.value);
                  }}
                />

                <Link
                  to={"/category/our-foods"}
                  className="shop-handle__search-btn"
                  type="button"
                  onClick={(e) => handleSearchProduct(e)}
                >
                  <BiSearch />
                </Link>
              </form>
              <div className="shop-handle__drop">
                <div
                  className="dop-current"
                  onClick={() => handleShowDropList()}
                >
                  <span className="text-filter">Featured</span>
                  <span className="icon">
                    <MdOutlineKeyboardArrowDown />
                  </span>
                </div>
                <ul
                  className={`drop-list ${activeDropList ? "active_drop" : ""}`}
                >
                  {filterPriceDropList.map((val, idx) => {
                    return (
                      <li
                        key={val.id}
                        className="drop_item"
                        onClick={() => handleFilterDropList(val, idx)}
                      >
                        {val.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="shop-handle__display">
                <span
                  className={oneGrid ? "active" : ""}
                  onClick={() => handleGridOne()}
                >
                  <BsGrid1X2Fill />
                </span>
                <span
                  className={!oneGrid ? "active" : ""}
                  onClick={() => handleGridFour()}
                >
                  <BsFillGrid3X3GapFill />
                </span>
              </div>
            </div>
            {loading ? (
              <h2 className="loading">Loading...</h2>
            ) : (
              <div className="shop-products row">
                {itemList.length === 0 ? (
                  <h2 className="no_product">No products</h2>
                ) : (
                  itemList.map((val) => {
                    return (
                      <CardProduct
                        key={val.id}
                        item={val}
                        dislayItems={dislayItems}
                        notify={notify}
                        notifyFavotites={notifyFavotites}
                     
                      />
                    );
                  })
                )}
              </div>
            )}
            <PanigationButton
              items={Math.ceil(paginationNumber / filter._limit)}
              pageNum={filter._page}
              handlerChangePage={handlerChangePage}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Category;
