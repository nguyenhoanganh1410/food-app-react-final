import "./TabBarStyle.scss";
import user_icon from "../../imgage/userIcon.jpg";
import { nav } from "../../data/data";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
import Contex from "../../store/Context";
import { useContext, useEffect } from "react";
import { SetOpenBar, SetOpenWishList } from "../../store/Actions";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const TabBar = () => {
  const navigate = useNavigate();
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { openBar, user,isSignedIn } = state;
  
  useEffect(() => {
    //update name user in header
    if (user) {
      //update name user in header

      const header_userName = document.querySelector(".account_name-tabbar");
    
      header_userName.innerHTML = user.displayName;
   
      if (user.photoURL) {
      
        document.querySelector(".img_account-tabbar").src = user.photoURL;
      }
    }
   
    //scrool to top
  }, [openBar]);

  //login account
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        document.querySelector(".img_account-tabbar").src = user_icon;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogin = () =>{
    navigate('/login');
  }
  const handleCloseBar = () => {
    depatch(SetOpenBar(false));
  };

  const handleOpenWishList = () =>{
    handleCloseBar();
    depatch(SetOpenWishList(true));
  }
  return (
    <section class="tab-bar">
      <div className={`bar_content ${openBar ? "active_content" : ""}`}>
        <div className="content_top">
          <div className="content_top-account">
            <div className="account-img">
              <img className="img_account-tabbar" src={user_icon} />
            </div>
            {isSignedIn ? (
              <p className="account_name-tabbar">nguyen hoang minh</p>
            ) : null}
          </div>
          {isSignedIn ? (
            <div className="content_top-logout"
                onClick={() => logout()}
            >log out</div>
          ) : (
            <div className="content_top-logout"
                onClick={() => handleLogin()}
            >sign in</div>
          )}
        </div>
        <ul class="content_list">
          {nav.map((val) => {
            return (
              <li key={val.id}>
                <span>{val.icon}</span>
                <Link
                  className="nav_link"
                  onClick={()=>handleCloseBar()}
                  to={
                    val.text === "order online" ? "/category/best-foods" : "/"
                  }
                >
                  {val.text}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="content_favourite"
              onClick={()=>handleOpenWishList()}
        >
          <span>
            <FaVoteYea />
          </span>
          <span>your wishlist</span>
        </div>
      </div>
      <div
        className={`bar_overlay ${openBar ? "active" : ""}`}
        onClick={() => handleCloseBar()}
      ></div>
    </section>
  );
};

export default TabBar;
