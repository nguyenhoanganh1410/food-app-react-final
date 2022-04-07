import { AiOutlineShoppingCart, AiTwotoneStar } from "react-icons/ai";

import { BsHeart } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

import "./CardProductStyle.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Contex from "../../store/Context";
import cartApi from "../../api/cartApi";
import { SetCart, SetDialogShow, SetFirstAdd, SetFirstAddWish, SetWishList } from "../../store/Actions";

const CardProduct = ({ dislayItems, item, notify, notifyFavotites }) => {
  const params = useParams();
  const navigate = useNavigate();

  //get url global value
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, firstAdd, isSignedIn, user, cart,firstAddWish,wishList } = state;

  //chuyen huong khi click vao tung san pham
  const hanldClickItem = (id) => {
    navigate(`/${url}/${id}`);
  };

  const handleAddCart = () => {
    //kiem tra dang nhap chua
    if(isSignedIn){
    //lan dau them sanpham vao gio hang
      if (firstAdd && isSignedIn) {
        //add product in cart
        const addIntoCart = async () => {
          try {
            const response = await cartApi.addProductIntoCart(
              "cart",
              user.email,
              item
            );
            notify();

            //khong con la lan dau nua
            depatch(SetFirstAdd(false));
          } catch (error) {
            console.log("Failed to fetch product list: ", error);
          }
        };
        addIntoCart();
      } else {
        const newCart = checkCart(cart, item);
        depatch(SetCart(newCart));

        const addIntoCart = async () => {
          try {
            const response = await cartApi.updateProductInCart(
              "cart",
              user.email,
              newCart
            );
            notify();
          } catch (error) {
            console.log("Failed to fetch product list: ", error);
          }
        };
        addIntoCart();
      }
    }
    else{
       //thông báo phải login mới thực hiện được chức năng( dialogshow)
       depatch(SetDialogShow(true));
    }
  };


  //xu ly add to wishList
  const handleAddWishList = () =>{
     //kiem tra dang nhap chua
     if(isSignedIn){
      if (firstAddWish) {
        //add product in cart
        const addIntoWishList = async () => {
          try {
            const response = await cartApi.addProductIntoWishList(
              "wishlist",
              user.email,
              item
            );
            //khong con la lan dau nua
            depatch(SetFirstAddWish(false));
          } catch (error) {
            console.log("Failed to fetch product list: ", error);
          }
        };
        addIntoWishList();
      } else {
        const newWishList = checkWishList(wishList,item);
      
        depatch(SetWishList(newWishList));

        const addIntoWishList = async () => {
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
       addIntoWishList();
      }
      notifyFavotites();
     } else{
       //thông báo phải login mới thực hiện được chức năng( dialogshow)
       depatch(SetDialogShow(true));
    }
  }

  //kiem tra sp da co trong cart chua
  const checkCart = (cartFood, food) => {
   
    let check = false;
    //kiem tra san pham muon them da co trong cart chua?
    const newCart = cartFood.map((val) => {
      if (val.id === food.id) {
        val.quatity = val.quatity + 1;
        check = true;
      }
      return val;
    });
    const CartNew = [...cartFood, { ...food, quatity: 1 }];
    if (check) {
      return newCart;
    }
    return CartNew;
  };

  //kiem tra item trong wishlist ton tai chua
  const checkWishList = (WishList,food) =>{
    //them san pham moi vao array
    const CartNew = [...WishList, food];
   
    //loc san pham khong trung nhau
    const arrayWishList = CartNew.filter( (val, idx) =>{
      return idx === CartNew.findIndex(v => val.id === v.id);
    })

    return arrayWishList;
  }


  
  return (
    <div
      key={item.id}
      className={`shop-product ${dislayItems} col-md-4 col-xs-6`}
    >
      <div
        className="shop-product__img"
        onClick={() => hanldClickItem(item.id)}
      >
        <img src={item.img} alt="image erro" />
        <div className="shop-product__rate">
          <span>
            <AiTwotoneStar />
          </span>
          <span className="rate-number">{item.rate}</span>
        </div>
      </div>
      <div className="shop-product__content">
        <div
          className="shop-product__name"
          onClick={() => hanldClickItem(item.id)}
        >
          {item.name}
        </div>
        <p className="shop-product__decription">{item.dsc}</p>
        <div className="shop-product__row">
          <div className="row_location">
            <span className="location-icon">
              <IoLocationSharp />
            </span>
            <span className="location-name">{item.country}</span>
          </div>
          <div className="row_price">
            <span>{`$${item.price}`}</span>
          </div>
        </div>
      </div>
      <div className="shop-product__btns">
        <div className="shop-product__btn" onClick={() => handleAddWishList()}>
          <BsHeart />
        </div>
        <div className="shop-product__btn" onClick={() => handleAddCart()}>
          <AiOutlineShoppingCart />
        </div>
      </div>
      <div className="shop-product__label"></div>
    </div>
  );
};

export default CardProduct;
