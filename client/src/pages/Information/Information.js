import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';

import InputForm from '~/components/InputForm';
import styles from './Information.module.scss';
import Button from '~/components/Button';
import Profile from '~/layouts/Profile';

const cx = classNames.bind(styles);

function Information() {
  const [infor, setInfor] = useState({});
  const [avatar, setAvatar] = useState({});
  const [image, setImage] = useState('');

  const [payload, setPayload] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    avatar: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
  });
  const validateForm = () => {
    let isValid = true;
    const errors = {};

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

    if (!payload.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ';
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  };

  function getJwtFromCookie() {
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }

  useEffect(() => {
    const fetchAPIProfile = async () => {
      const response = await axios.get('http://localhost:5000/api/user/profile/customer', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      if (response.data.success === true) {
        setInfor(response.data.user);
        setImage(response.data.user.Avatar);
      } else {
        setInfor({});
        setImage('');
      }
      const user = response.data.user;

      setPayload((prevPayload) => ({
        ...prevPayload,
        firstName: user.FirstName,
        lastName: user.LastName,
        phoneNumber: user.PhoneNumber,
        address: user.Address,
        username: user.Username,
      }));
    };
    fetchAPIProfile();
  }, []);

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    } else {
      const formData = new FormData();
      formData.append('FirstName', payload.firstName);
      formData.append('LastName', payload.lastName);
      formData.append('PhoneNumber', payload.phoneNumber);
      formData.append('Address', payload.address);
      formData.append('Avatar', avatar);
      const response = await fetch('http://localhost:5000/api/user/edit', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`, // trả token về server để xử lí
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success === true) {
        toast.success(data.message);
        setInfor({ ...infor, payload });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(data.message);
      }
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
    setAvatar(e.target.files[0]);
  };

  return (
    <Profile>
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
      <div className={cx('container')}>
        <div className={cx('main-header')}>Trang cá nhân</div>
        <div className={cx('information-field')}>
          <div className={cx('information')}>
            <div className={cx('header')}>Thông tin cá nhân</div>
            <div className={cx('description-field')}>
              <div className={cx('description')}>Cập nhật ảnh và thông tin của bạn tại đây</div>
              <Button white className={cx('cancel-btn')}>
                Hủy
              </Button>
              <Button blue className={cx('save-btn')} onClick={handleUpdate}>
                Lưu thay đổi
              </Button>
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Họ và tên</div>
            <div className={cx('input-field')}>
              <div className={cx('input-wrapper')}>
                <InputForm
                  placeholder=""
                  type="text"
                  value={payload.firstName}
                  setValue={setPayload}
                  name={'firstName'}
                  className={cx('input')}
                />
                {errorMessages.firstName && <div className={cx('error-message')}>{errorMessages.firstName}</div>}
              </div>
              <div className={cx('input-wrapper')}>
                <InputForm
                  placeholder=""
                  type="text"
                  value={payload.lastName}
                  setValue={setPayload}
                  name={'lastName'}
                  className={cx('input')}
                />
                {errorMessages.lastName && <div className={cx('error-message')}>{errorMessages.lastName}</div>}
              </div>
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Địa chỉ</div>
            <div className={cx('input-field')}>
              <div className={cx('input-wrapper')}>
                <InputForm
                  placeholder=""
                  type="text"
                  value={payload.address}
                  setValue={setPayload}
                  name={'address'}
                  className={cx('input')}
                />
                {errorMessages.address && <div className={cx('error-message')}>{errorMessages.address}</div>}
              </div>
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Số điện thoại</div>
            <div className={cx('input-field')}>
              <div className={cx('input-wrapper')}>
                <InputForm
                  placeholder=""
                  type="text"
                  value={payload.phoneNumber}
                  setValue={setPayload}
                  name={'phoneNumber'}
                  className={cx('input')}
                />
                {errorMessages.phoneNumber && <div className={cx('error-message')}>{errorMessages.phoneNumber}</div>}
              </div>
            </div>
          </div>
          {/* <div className={cx('text-field')}>
            <div className={cx('header')}>Tài khoản</div>
            <div className={cx('input-field')}>
              <InputForm
                readOnly
                placeholder="Enter Username..."
                type="text"
                value={payload.username}
                setValue={setPayload}
                name={'username'}
                className={cx('input')}
              />
              <InputForm
                placeholder="Enter Password..."
                type="password"
                value={payload.password}
                setValue={setPayload}
                name={'password'}
                className={cx('input')}
              />
            </div>
          </div> */}
          <div className={cx('text-field')}>
            <div className={cx('header')}>Ảnh của bạn</div>
            <div className={cx('input-field')}>
              {avatar && <img src={image} className={cx('image')} alt="Avatar" />}
              <label htmlFor="file-upload" className={cx('upload-btn')}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <input id="file-upload" type="file" onChange={handleImgChange}></input>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  );
}

export default Information;
