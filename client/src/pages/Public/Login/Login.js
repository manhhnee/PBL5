import { faLock, faPhone, faUser, faSignature } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';

import images from '~/assets/images';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import config from '~/config';
import styles from './Login.module.scss';
import AutoComplete from '~/components/AutoComplete/AutoComplete';

const cx = classNames.bind(styles);

function Login() {
  const location = useLocation();

  const [isSignupMode, setIsSignupMode] = useState(location.state?.flag);
  const [payload, setPayload] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
  });

  const [autocompleteInputValue, setAutocompleteInputValue] = useState('');

  const handleSignupClick = () => setIsSignupMode(true);
  const handleSigninClick = () => setIsSignupMode(false);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!payload.username.trim()) {
      errors.username = 'Vui lòng nhập tên người dùng';
      isValid = false;
    }

    if (!payload.password.trim()) {
      errors.password = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }

    if (isSignupMode) {
      if (!payload.firstName.trim()) {
        errors.firstName = 'Vui lòng nhập họ';
        isValid = false;
      }

      if (!payload.lastName.trim()) {
        errors.lastName = 'Vui lòng nhập tên';
        isValid = false;
      }

      if (!payload.phoneNumber.trim()) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại';
        isValid = false;
      }

      if (!autocompleteInputValue.trim()) {
        errors.address = 'Vui lòng nhập địa chỉ';
        isValid = false;
      }
    }

    setErrorMessages(errors);

    return isValid;
  };

  const handleLoginSubmit = async () => {
    if (!validateForm()) {
      return;
    } else {
      const response = await fetch('http://localhost:5000/api/account/login', {
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
        toast.success('Đăng nhập thành công');
        localStorage.setItem('Role', data.role);
        document.cookie = `token=${data.token}`;
        if (data.role === 'ADMIN') {
          window.location.replace(config.routes.adminRecent);
        } else if (data.role === 'STAFF') {
          window.location.replace(config.routes.staffRecent);
        } else {
          window.location.replace(config.routes.home);
        }
      } else {
        toast.error('Sai tài khoản hoặc mật khẩu!');
      }
    }
  };
  const HandleSubmitSignUp = async () => {
    if (!validateForm()) {
      return;
    } else {
      const response = await fetch('http://localhost:5000/api/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: payload.username.trim(),
          Password: payload.password.trim(),
          FirstName: payload.firstName.trim(),
          LastName: payload.lastName.trim(),
          PhoneNumber: payload.phoneNumber.trim(),
          Address: autocompleteInputValue.trim(),
          id_Role: 3,
        }),
      });
      const data = await response.json();
      if (data.success === true) {
        toast.success('Đăng kí thành công!');
        setTimeout(() => {
          setIsSignupMode(false);
        }, 2000);
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className={cx('wrapper')}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              {errorMessages.username && <div className={cx('error-message')}>{errorMessages.username}</div>}
              <InputForm
                placeholder="Password"
                leftIcon={faLock}
                type="password"
                value={payload.password}
                setValue={setPayload}
                name={'password'}
              />
              {errorMessages.password && <div className={cx('error-message')}>{errorMessages.password}</div>}

              <Button signin_signup className={cx('btn')} onClick={handleLoginSubmit}>
                Đăng nhập
              </Button>
            </div>
            <div className={cx('sign-up-form')}>
              <h2 className={cx('title')}>Trang đăng kí</h2>
              <InputForm
                placeholder="FirstName"
                leftIcon={faSignature}
                type="text"
                value={payload.firstName}
                setValue={setPayload}
                name={'firstName'}
              />
              {errorMessages.firstName && <div className={cx('error-message')}>{errorMessages.firstName}</div>}
              <InputForm
                placeholder="LastName"
                leftIcon={faSignature}
                type="text"
                value={payload.lastName}
                setValue={setPayload}
                name={'lastName'}
              />
              {errorMessages.lastName && <div className={cx('error-message')}>{errorMessages.lastName}</div>}
              <InputForm
                placeholder="Phone Number"
                leftIcon={faPhone}
                type="text"
                value={payload.phoneNumber}
                setValue={setPayload}
                name={'phoneNumber'}
              />
              {errorMessages.phoneNumber && <div className={cx('error-message')}>{errorMessages.phoneNumber}</div>}
              <AutoComplete setParentInputValue={setAutocompleteInputValue} />
              {errorMessages.address && <div className={cx('error-message')}>{errorMessages.address}</div>}
              <InputForm
                placeholder="Username"
                leftIcon={faUser}
                type="text"
                value={payload.username}
                setValue={setPayload}
                name={'username'}
              />
              {errorMessages.username && <div className={cx('error-message')}>{errorMessages.username}</div>}
              <InputForm
                placeholder="Password"
                leftIcon={faLock}
                type="text"
                value={payload.password}
                setValue={setPayload}
                name={'password'}
              />
              {errorMessages.password && <div className={cx('error-message')}>{errorMessages.password}</div>}
              <Button signin_signup className={cx('btn')} onClick={HandleSubmitSignUp}>
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
