import "./WishListStyle.scss";
import { FaVoteYea } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import item1 from "../../imgage/item1.jpg";

import Contex from "../../store/Context";
import { useContext, useEffect } from "react";
import cartApi from "../../api/cartApi";
import { SetFirstAddWish, SetOpenBar, SetOpenWishList, SetWishList } from "../../store/Actions";
const WishList = () => {
  const { state, depatch } = useContext(Contex);
  //detructering...
  const {
    totalProduct,
    totalPrice,
    cart,
    user,
    isSignedIn,
    openBar,
    firstAdd,
    firstAddWish,
    wishList,
    openWishList,
  } = state;

  useEffect(() => {
    //fetch product in wishlist
    const fetchWishList = async () => {
      try {
        const response = await cartApi.getById("wishlist", { id: user.email });

        console.log(response.length);

        if (response.length !== 0) {
          //lan dau them vao gio hang

          depatch(SetWishList(response[0].items));
          depatch(SetFirstAddWish(false));
        }
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchWishList();
  }, [user]);

  const handleDeleteItem = (item) => {
    //xoa san pham khoi wishlist
    const newWishList = wishList.filter((val) => {
      return val.id !== item.id;
    });
    //cap nhat lai cart( da xoa item)
    depatch(SetWishList(newWishList));

    //cap nhat tai server
    const deleteWishList = async () => {
      try {
        const response = await cartApi.updateProductInCart(
          "wishlist",
          user.email,
          newWishList
        );
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    deleteWishList();
  };

  const handleCloseWishList = () =>{
    depatch(SetOpenWishList(false))
  }
  return (
    <section className={`wishlist ${openWishList ? "active_wishList" : ""}`}>
      <div className="wishlist_top">
        <div className="wishlist_shop">
          <span>
            <FaVoteYea />
          </span>
          <span>your wishlist</span>
        </div>
        <span className="out_btn"
              onClick={() => handleCloseWishList()}
        >
          <HiLogout />
        </span>
      </div>
      <div className="wishlist_items">
        {wishList.map((val) => {
          return (
            <div className="wishlist_item">
              <div className="wishlist_img">
                <img src={val.img} />
              </div>
              <div className="wishlist_content">
                <span className="content_name">{val.name}</span>
                <p className="content_desc">{val.desc}</p>
                <span className="content_price">{`$${val.price.toFixed(
                  2
                )}`}</span>
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
