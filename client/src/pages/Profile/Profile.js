import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';

import Sidebar from '~/components/Sidebar';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import styles from './Profile.module.scss';
import config from '~/config';
import Image from '~/components/Image';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Profile() {
  const { id } = useParams();
  const [activeButton, setActiveButton] = useState('btn1');
  const [payload, setPayload] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });

  const handleClick = (buttonName) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Sidebar>
        <Button
          to={`/customer/profile/${id}`}
          leftIcon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 'btn1' ? 'active' : ''}`)}
          onClick={() => handleClick('btn1')}
        >
          Trang cá nhân
        </Button>
        <Button
          to={`/customer/orderList/${id}`}
          leftIcon={<FontAwesomeIcon icon={faClock}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 'btn2' ? 'active' : ''}`)}
          onClick={() => handleClick('btn2')}
        >
          Lịch sử đơn hàng
        </Button>
        <Button
          to={config.routes.profile}
          leftIcon={<FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 'btn3' ? 'active' : ''}`)}
          onClick={() => handleClick('btn3')}
        >
          Phản hồi
        </Button>
      </Sidebar>
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
              <Button blue className={cx('save-btn')}>
                Lưu thay đổi
              </Button>
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Họ và tên</div>
            <div className={cx('input-field')}>
              <InputForm
                placeholder="Enter first name..."
                type="text"
                value={payload.firstName}
                setValue={setPayload}
                name={'firstName'}
                className={cx('input')}
              />
              <InputForm
                placeholder="Enter last name..."
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
                placeholder="Enter Address..."
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
                placeholder="Enter PhoneNumber..."
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
              <Image
                src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg"
                className={cx('image')}
              ></Image>
              <Button white className={cx('upload-btn')}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <span>Nhấn để thêm ảnh hoặc kéo thả vào đây</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
