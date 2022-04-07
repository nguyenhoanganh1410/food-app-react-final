//actions
export const SET_CART = "set_cart";
export const SET_WISHLIST = "set_wishlist";
// export const SET_TOTALPRODUCT = 'set_totalproduct'

// export const SET_TOTAL_PRICE = 'set_total_price'
export const SET_INCREASE = "set_increase";
export const SET_ISSIGNEDIN = "set_isSignedIn";
export const SET_USER = "set_User";
export const SET_SHOWDIALOG = "set_Dialog";
export const SET_URL = "set_URL";
export const SET_OPENBAR = "set_OpenBar";
export const SET_OPENWISHLIST = "set_OpenWishList";
export const SET_FIRSTADD = "set_FirstAdd";
export const SET_FIRSTADDWiSH = "set_FirstAddWish";

export const SetCart = (payload) => {
  return {
    type: SET_CART,
    payload,
  };
};

export const SetFirstAddWish = (payload) => {
  return {
    type: SET_FIRSTADDWiSH,
    payload,
  };
};

export const SetWishList = (payload) => {
  return {
    type: SET_WISHLIST,
    payload,
  };
};

export const SetFirstAdd = (payload) => {
  return {
    type: SET_FIRSTADD,
    payload,
  };
};

// export const SetTotalProduct = payload =>{
//     return {
//         type: SET_TOTALPRODUCT,
//         payload
//     }
// }

// export const SetTotalPrice = payload =>{
//     return {
//         type: SET_TOTAL_PRICE,
//         payload
//     }
// }

export const SetIsSignedIn = (payload) => {
  return {
    type: SET_ISSIGNEDIN,
    payload,
  };
};

export const SetUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};

export const SetDialogShow = (payload) => {
  return {
    type: SET_SHOWDIALOG,
    payload,
  };
};

export const SetURL = (payload) => {
  return {
    type: SET_URL,
    payload,
  };
};

export const SetOpenBar = (payload) => {
  return {
    type: SET_OPENBAR,
    payload,
  };
};
export const SetOpenWishList = (payload) => {
  return {
    type: SET_OPENWISHLIST,
    payload,
  };
};
