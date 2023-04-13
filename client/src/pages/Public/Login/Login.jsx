import { faLock, faPhone, faUser, faLocationDot, faSignature } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './Login.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';

const cx = classNames.bind(styles);

function Login() {
  const location = useLocation();

  const [isSignupMode, setIsSignupMode] = useState(location.state?.flag);
  const [payload, setPayload] = useState({ fullname: '', phone: '', address: '', username: '', password: '' });


  const handleSignIn =
    useEffect(() => {
      const login = async () => {
        var username = document.querySelector('input[name="username"]');
        var password = document.querySelector('input[name="password"]');
        let usernameInput = username.value.trim();
        let passwordInput = password.value.trim();
        try {
          await axios.post('http://localhost:5000/login', {}, {
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Username: usernameInput,
              Password: passwordInput
            })
          }, (data) => {
            console.log(data)
            if (data.success === false) {
              alert("Đăng nhập không thành công")
            }
            else {
              alert("Đăng nhập thành công")
              // setCookie('token',data.token,1)
              document.cookie = `token=${data.token}`;
            }})
        } catch (error) {
          console.log(error);
        }
      }
      login()
    })
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', `${isSignupMode ? 'sign-up-mode' : ''}`)}>
        <div className={cx('form-container')}>
          <div className={cx('signin-signup')}>
            <div className={cx('sign-in-form')}>
              <h2 className={cx('title')}>Trang đăng nhập</h2>
              <InputForm
                placeholder="Username"
                leftIcon={faUser}
                type="text"
                name={'username'}
              />
              <InputForm
                placeholder="Password"
                leftIcon={faLock}
                type="password"
                name={'password'}
              />
              <Button signin_signup className={cx('btn')} onClick={handleSignIn}>
                Đăng nhập
              </Button>
            </div>
            <div className={cx('sign-up-form')}>
              <h2 className={cx('title')}>Trang đăng kí</h2>
              <InputForm
                placeholder="Fullname"
                leftIcon={faSignature}
                type="text"
                name={'fullname'}
              />
              <InputForm
                placeholder="Phone"
                leftIcon={faPhone}
                type="text"
                name={'phone'}
              />
              <InputForm
                placeholder="Address"
                leftIcon={faLocationDot}
                type="text"
                name={'address'}
              />
              <InputForm
                placeholder="Username"
                leftIcon={faUser}
                type="text"
                name={'username'}
              />
              <InputForm
                placeholder="Password"
                leftIcon={faLock}
                type="text"
                name={'password'}
              />
              <Button signin_signup className={cx('btn')}>
                Đăng kí
              </Button>
            </div>
          </div>
        </div>
        <div className={cx('panels-container')}>
          <div className={cx('panel', 'left-panel')}>
            <div className={cx('content')}>
              <h3>PBL5: Đồ án công nghệ phần mềm</h3>
              <p>Thành viên nhóm: Nguyễn Đức Mạnh, Trần Anh Hào, Hồ Thanh Hưng</p>
              <button className={cx('btn', 'transparent')}>
                Đăng kí
              </button>
            </div>
            <img className={cx('image')} src={images.log} alt="logo-log"></img>
          </div>
          <div className={cx('panel', 'right-panel')}>
            <div className={cx('content')}>
              <h3>PBL5: Đồ án công nghệ phần mềm</h3>
              <p>Thành viên nhóm: Nguyễn Đức Mạnh, Trần Anh Hào, Hồ Thanh Hưng</p>
              <button className={cx('btn', 'transparent')} onClick={handleSignIn}>
                Đăng nhập
              </button>
            </div>
            <img className={cx('image')} src={images.register} alt="logo-log"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
