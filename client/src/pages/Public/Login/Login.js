import { faLock, faPhone, faUser, faLocationDot, faSignature } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Login.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import config from '~/config';

const cx = classNames.bind(styles);

function Login() {
  const location = useLocation();

  const [isSignupMode, setIsSignupMode] = useState(location.state?.flag);
  const [payload, setPayload] = useState({ username: '', password: '' });

  const handleSignupClick = () => setIsSignupMode(true);
  const handleSigninClick = () => setIsSignupMode(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: payload.username.trim(),
        Password: payload.password.trim(),
      }),
    });
    const data = await response.json();
    if (data.success === true) {
      document.cookie = `token=${data.token}`;
      window.location.replace(config.routes.home);
    } else {
      console.log('error');
    }
  };
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
                value={payload.username}
                setValue={setPayload}
                name={'username'}
              />
              <InputForm
                placeholder="Password"
                leftIcon={faLock}
                type="password"
                value={payload.password}
                setValue={setPayload}
                name={'password'}
              />
              <Button signin_signup className={cx('btn')} onClick={handleLoginSubmit}>
                Đăng nhập
              </Button>
            </div>
            <div className={cx('sign-up-form')}>
              <h2 className={cx('title')}>Trang đăng kí</h2>
              <InputForm
                placeholder="Fullname"
                leftIcon={faSignature}
                type="text"
                value={payload.fullname}
                setValue={setPayload}
                name={'fullname'}
              />
              <InputForm
                placeholder="Phone"
                leftIcon={faPhone}
                type="text"
                value={payload.phone}
                setValue={setPayload}
                name={'phone'}
              />
              <InputForm
                placeholder="Address"
                leftIcon={faLocationDot}
                type="text"
                value={payload.address}
                setValue={setPayload}
                name={'address'}
              />
              <InputForm
                placeholder="Username"
                leftIcon={faUser}
                type="text"
                value={payload.username}
                setValue={setPayload}
                name={'username'}
              />
              <InputForm
                placeholder="Password"
                leftIcon={faLock}
                type="text"
                value={payload.password}
                setValue={setPayload}
                name={'password'}
              />
              <Button signin_signup className={cx('btn')} onClick={handleLoginSubmit}>
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
              <button className={cx('btn', 'transparent')} onClick={handleSignupClick}>
                Đăng kí
              </button>
            </div>
            <img className={cx('image')} src={images.log} alt="logo-log"></img>
          </div>
          <div className={cx('panel', 'right-panel')}>
            <div className={cx('content')}>
              <h3>PBL5: Đồ án công nghệ phần mềm</h3>
              <p>Thành viên nhóm: Nguyễn Đức Mạnh, Trần Anh Hào, Hồ Thanh Hưng</p>
              <button className={cx('btn', 'transparent')} onClick={handleSigninClick}>
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
