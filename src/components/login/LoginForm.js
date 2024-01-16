import './LoginStyle.scss';
import loginImg from './login.svg';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const LoginForm = () => {
  const notifyUpdate = () => {
    toast.info('This feature is updating...', {
      theme: 'colored',
    });
  };
  return (
    <section className='login'>
      <div className='wrapper_web'>
        <div className='login_content'>
          <div className='login_left'>
            <img src={loginImg} />
          </div>
          <div className='login_right'>
            <form>
              <h3>Đăng Nhập</h3>
              <p>
                Bạn chưa có Tài Khoản?{' '}
                <span className='create_account' onClick={notifyUpdate}>
                  Tạo Tào Khoản
                </span>
              </p>
              <div className='input_form'>
                <label>Email</label>
                <div className='login-form-field'>
                  <span>
                    <HiOutlineMail />
                  </span>
                  <input type='text' placeholder='Email' />
                </div>
              </div>

              <div className='input_form'>
                <label>Mật khẩu</label>
                <div className='login-form-field'>
                  <span>
                    {' '}
                    <AiFillLock />
                  </span>
                  <input type='text' placeholder='Mật khẩu' />
                </div>
              </div>

              <div className='save_password'>
                <input type='checkbox' />
                <span>Lưu Thông Tin Đăng Nhập</span>
              </div>
              <div className='submit_btn'>
                <button className='btn btn_order'>Đăng Nhập</button>
              </div>
              <div className='line'>or</div>
              <div className='btn_group'>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </section>
  );
};

export default LoginForm;
