import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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
      const response = await fetch('http://localhost:5000/api/user/profile/customer', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`, // trả token về server để xử lí
        },
      });
      const data = await response.json();
      if (data.success) {
        setInfor(data.user);
        setImage(data.user.Avatar);
      } else {
        setInfor({});
        setImage('');
      }
    };
    fetchAPIProfile();
  }, []);

  const handleUpdate = async () => {
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
      alert(data.message);
      setInfor({ ...infor, payload });
    } else {
      alert(data.message);
    }
    window.location.reload();
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
              <InputForm
                placeholder={infor.FirstName}
                type="text"
                value={payload.firstName}
                setValue={setPayload}
                name={'firstName'}
                className={cx('input')}
              />
              <InputForm
                placeholder={infor.LastName}
                type="text"
                value={payload.lastName}
                setValue={setPayload}
                name={'lastName'}
                className={cx('input')}
              />
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Địa chỉ</div>
            <div className={cx('input-field')}>
              <InputForm
                placeholder={infor.Address}
                type="text"
                value={payload.address}
                setValue={setPayload}
                name={'address'}
                className={cx('input')}
              />
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Số điện thoại</div>
            <div className={cx('input-field')}>
              <InputForm
                placeholder={infor.PhoneNumber}
                type="text"
                value={payload.phoneNumber}
                setValue={setPayload}
                name={'phoneNumber'}
                className={cx('input')}
              />
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Tài khoản</div>
            <div className={cx('input-field')}>
              <InputForm
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
          </div>
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
