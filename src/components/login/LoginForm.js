import "./LoginStyle.scss";
import loginImg from "./login.svg";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLock, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  // We will display Google and Facebook as auth providers.
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // callbacks: {
  //   // Avoid redirects after sign-in.
  //   signInSuccessWithAuthResult: () => false,
  // },
};

const LoginForm = () => {
  const notifyUpdate = () => {
    toast.info("This feature is updating...",{
        theme: "colored"
      })
  };
  return (
    <section className="login">
      <div className="wrapper_web">
        <div className="login_content">
          <div className="login_left">
            <img src={loginImg} />
          </div>
          <div className="login_right">
            <form>
              <h3>join with us</h3>
              <p>
                Do not have an account?{" "}
                <span className="create_account" onClick={notifyUpdate}>
                  Create an account
                </span>
              </p>
              <div className="input_form">
                <label>Email address</label>
                <div className="login-form-field">
                  <span>
                    <HiOutlineMail />
                  </span>
                  <input type="text" placeholder="Your email" />
                </div>
              </div>

              <div className="input_form">
                <label>Password</label>
                <div className="login-form-field">
                  <span>
                    {" "}
                    <AiFillLock />
                  </span>
                  <input type="text" placeholder="Your password" />
                </div>
              </div>

              <div className="save_password">
                <input type="checkbox" />
                <span>Save your password</span>
              </div>
              <div className="submit_btn">
                <button className="btn btn_order">log in</button>
              </div>
              <div className="line">or</div>
              <div className="btn_group">
                {/* <button className='btn'><span><FcGoogle /></span>log in with google</button> */}
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
                {/* <button className='btn'><span><AiFillFacebook /></span>log in with facebook</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default LoginForm;
