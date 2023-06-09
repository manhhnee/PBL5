import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignature, faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useSpring, animated } from 'react-spring';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import Profile from '~/layouts/Profile';
import AutoComplete from '~/components/AutoComplete';
import Popup from '~/components/Popup';
import styles from './Information.module.scss';

const cx = classNames.bind(styles);

function Information() {
  const [infor, setInfor] = useState({});
  const [avatar, setAvatar] = useState({});
  const [image, setImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
  const [payload1, setPayload1] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    avatar: '',
  });

  const [payload2, setPayload2] = useState({
    password: '',
    newPassword: '',
    againPassword: '',
  });

  const [errorMessages1, setErrorMessages1] = useState({
    username: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
  });

  const [errorMessages2, setErrorMessages2] = useState({
    password: null,
    newPassword: null,
    againPassword: null,
  });

  const validateForm1 = () => {
    let isValid = true;
    const errors = {};

    if (!payload1.firstName.trim()) {
      errors.firstName = 'Vui lòng nhập họ';
      isValid = false;
    }

    if (!payload1.lastName.trim()) {
      errors.lastName = 'Vui lòng nhập tên';
      isValid = false;
    }

    if (!payload1.phoneNumber.trim()) {
      errors.phoneNumber = 'Vui lòng nhập số điện thoại';
      isValid = false;
    }

    if (!autocompleteInputValue.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ';
      isValid = false;
    }

    setErrorMessages1(errors);

    return isValid;
  };

  const validateForm2 = () => {
    let isValid = true;
    const errors = {};

    if (!payload2.password.trim()) {
      errors.password = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }

    if (!payload2.newPassword.trim()) {
      errors.newPassword = 'Vui lòng nhập mật khẩu mới';
      isValid = false;
    }

    if (!payload2.againPassword.trim()) {
      errors.againPassword = 'Vui lòng nhập lại mật khẩu mới';
      isValid = false;
    }

    setErrorMessages2(errors);

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

      setPayload1((prevPayload1) => ({
        ...prevPayload1,
        firstName: user.FirstName,
        lastName: user.LastName,
        phoneNumber: user.PhoneNumber,
        address: user.Address,
      }));
    };
    fetchAPIProfile();
  }, []);

  const handleUpdate = async () => {
    if (!validateForm1()) {
      return;
    } else {
      const formData = new FormData();
      formData.append('FirstName', payload1.firstName);
      formData.append('LastName', payload1.lastName);
      formData.append('PhoneNumber', payload1.phoneNumber);
      formData.append('Address', autocompleteInputValue);
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
        setInfor({ ...infor, payload1 });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(data.message);
      }
    }
  };

  const handleChangePassword = async (oldPass, newPass, againPass) => {
    if (!validateForm2()) {
      return;
    } else {
      await axios
        .put(
          'http://localhost:5000/api/account/changePass',
          {
            Password: oldPass,
            NewPassword: newPass,
            AgainPassword: againPass,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getJwtFromCookie()}`,
            },
          },
        )
        .then((res) => {
          toast(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((e) => {
          toast.error(e);
        });
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

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
    setPayload1({});
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

              <Button blue className={cx('save-btn')} onClick={handleUpdate}>
                Lưu thay đổi
              </Button>
              <Button primary className={cx('changePass-btn')} onClick={openModal}>
                Đổi mật khẩu
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
                  value={payload1.firstName}
                  setValue={setPayload1}
                  name={'firstName'}
                  className={cx('input')}
                  leftIcon={faSignature}
                />
                {errorMessages1.firstName && <div className={cx('error-message')}>{errorMessages1.firstName}</div>}
              </div>
              <div className={cx('input-wrapper')}>
                <InputForm
                  placeholder=""
                  type="text"
                  value={payload1.lastName}
                  setValue={setPayload1}
                  name={'lastName'}
                  className={cx('input')}
                  leftIcon={faSignature}
                />
                {errorMessages1.lastName && <div className={cx('error-message')}>{errorMessages1.lastName}</div>}
              </div>
            </div>
          </div>
          <div className={cx('text-field')}>
            <div className={cx('header')}>Địa chỉ</div>
            <div className={cx('input-field')}>
              <div className={cx('input-wrapper')}>
                <AutoComplete setParentInputValue={setAutocompleteInputValue} />
                {errorMessages1.address && <div className={cx('error-message')}>{errorMessages1.address}</div>}
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
                  value={payload1.phoneNumber}
                  setValue={setPayload1}
                  name={'phoneNumber'}
                  className={cx('input')}
                  leftIcon={faPhone}
                />
                {errorMessages1.phoneNumber && <div className={cx('error-message')}>{errorMessages1.phoneNumber}</div>}
              </div>
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
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={'700px'} height={'500px'}>
        <animated.div style={modalAnimation}>
          <h2>Đổi mật khẩu</h2>
          <div className={cx('header')}>Nhập mật khẩu cũ</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder=""
              type="text"
              value={payload2.password}
              setValue={setPayload2}
              name={'password'}
              className={cx('input')}
            />
            {errorMessages2.password && <div className={cx('error-message')}>{errorMessages2.password}</div>}
          </div>
          <div className={cx('header')}>Nhập mật khẩu mới</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder=""
              type="text"
              value={payload2.newPassword}
              setValue={setPayload2}
              name={'newPassword'}
              className={cx('input')}
            />
            {errorMessages2.newPassword && <div className={cx('error-message')}>{errorMessages2.newPassword}</div>}
          </div>
          <div className={cx('header')}>Nhập lại mật khẩu mới</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder=""
              type="text"
              value={payload2.againPassword}
              setValue={setPayload2}
              name={'againPassword'}
              className={cx('input')}
            />
            {errorMessages2.againPassword && <div className={cx('error-message')}>{errorMessages2.againPassword}</div>}
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() => {
                handleChangePassword(payload2.password, payload2.newPassword, payload2.againPassword);
              }}
              outline
            >
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </Profile>
  );
}

export default Information;
