import {
  SetOpenBar,
  SET_CART,
  SET_COUNT,
  SET_INCREASE,
  SET_ISSIGNEDIN,
  SET_OPENBAR,
  SET_SHOWDIALOG,
  SET_TOTALPRODUCT,
  SET_TOTAL_PRICE,
  SET_URL,
  SET_USER,
  SET_FIRSTADD,
  SET_WISHLIST,
  SET_FIRSTADDWiSH,
  SET_OPENWISHLIST
} from "./Actions";

//innite state
const initState = {
  //card
  totalProduct: 0,
  totalPrice: 0,
  cart: [],
  wishList: [],
  firstAddWish : true,
  user: null,
  isSignedIn: false,
  showDialog: false,
  //url param call API
  url: "best-foods",
  openBar: false,
  openWishList: false,
  //lan dau them vao gio hang
  firstAdd : true
};

//depatch
const Reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        totalProduct: action.payload.reduce((sum, val) => {
          return sum + val.quatity;
        }, 0),
        totalPrice: action.payload.reduce((sum, val) => {
          return +val.price * val.quatity + sum;
        }, 0),
        cart: action.payload
      };
    case SET_ISSIGNEDIN:
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case SET_SHOWDIALOG:
      return {
        ...state,
        showDialog: action.payload,
      };
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_OPENBAR:
      return {
        ...state,
        openBar: action.payload,
      };
      case SET_FIRSTADD:
        return {
          ...state,
          firstAdd: action.payload,
        };
        case SET_FIRSTADDWiSH:
          return {
            ...state,
            firstAddWish: action.payload,
          };
        case SET_WISHLIST:
          return {
            ...state,
            wishList: action.payload,
          };
          case SET_OPENWISHLIST:
            return {
              ...state,
              openWishList: action.payload,
            };
  }
};

export { initState };
export default Reducer;
