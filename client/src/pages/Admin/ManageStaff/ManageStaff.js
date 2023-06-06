import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileScreenButton, faPlus, faSignature } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';

import Image from '~/components/Image';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import Popup from '~/components/Popup';
import styles from './ManageStaff.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function ManageStaff() {
  const [listStaff, setListStaff] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState();
  const modalAnimation1 = useSpring({
    opacity: isModalOpen1 ? 1 : 0,
    transform: isModalOpen1 ? 'translateY(0)' : 'translateY(-100%)',
  });
  const modalAnimation2 = useSpring({
    opacity: isModalOpen2 ? 1 : 0,
    transform: isModalOpen2 ? 'translateY(0)' : 'translateY(-100%)',
  });
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
    //lấy token được lưu trong cookie ra
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

  const handleAddStaff = async (username, password, fisrtname, lastname, phone, address) => {
    await axios
      .post(
        'http://localhost:5000/api/user/addStaff',
        {
          Username: username,
          Password: password,
          FirstName: fisrtname,
          LastName: lastname,
          PhoneNumber: phone,
          Address: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const handleUpdateStaff = async (id, fisrtname, lastname, phone, address) => {
    await axios
      .put(
        `http://localhost:5000/api/user/updateStaff/${id}`,
        {
          FirstName: fisrtname,
          LastName: lastname,
          PhoneNumber: phone,
          Address: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const handleDeleteStaff = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/user/deleteStaff/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      })

      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  useEffect(() => {
    const getApiStaffs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/staffList', {
          headers: {
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        });
        setListStaff(response.data.staff);
      } catch (e) {
        console.log(e);
      }
    };

    getApiStaffs();
  }, []);

  const openModal1 = (staffID, firstName, lastName, address, phone) => {
    setSelectedStaffId(staffID);
    setIsModalOpen1(true);
    setPayload((prevState) => ({
      ...prevState,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phone,
    }));
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
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
      <div className={cx('btn')}>
        <Button
          onClick={() => {
            openModal2();
          }}
          blue
          leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
        >
          Thêm nhân viên
        </Button>
      </div>
      <div className={cx('staff-list')}>
        {listStaff &&
          listStaff.map((staff) => {
            return (
              <div
                className={cx('staff')}
                onClick={() =>
                  openModal1(staff.id_Account, staff.FirstName, staff.LastName, staff.Address, staff.PhoneNumber)
                }
                key={staff.id}
              >
                <Image src={staff.Avatar} alt="staff" className={cx('image')} />
                <span className={cx('name')}>{staff.FirstName + ' ' + staff.LastName}</span>
              </div>
            );
          })}
      </div>
      <Popup isOpen={isModalOpen1} onRequestClose={() => closeModal1()} width={String('600px')} height={'520px'}>
        <animated.div style={modalAnimation1}>
          <h2>Thông tin nhân viên</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Họ và tên</div>
            <div className={cx('fullname')}>
              <InputForm
                placeholder=""
                type="text"
                value={payload.firstName}
                setValue={setPayload}
                name={'firstName'}
                className={cx('input')}
                leftIcon={faSignature}
              />
              <InputForm
                placeholder=""
                type="text"
                value={payload.lastName}
                setValue={setPayload}
                name={'lastName'}
                className={cx('input')}
                leftIcon={faSignature}
              />
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Địa chỉ</div>
            <InputForm
              placeholder="Da Nang"
              type="text"
              value={payload.address}
              setValue={setPayload}
              name={'address'}
              className={cx('input')}
              leftIcon={faLocationDot}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Số điện thoại</div>
            <InputForm
              placeholder="0905111123"
              type="text"
              value={payload.phoneNumber}
              setValue={setPayload}
              name={'phoneNumber'}
              className={cx('input')}
              leftIcon={faMobileScreenButton}
            />
          </div>
          <div className={cx('options')}>
            <Button onClick={() => handleDeleteStaff(selectedStaffId)} primary>
              Xóa nhân viên
            </Button>
            <Button
              onClick={() =>
                handleUpdateStaff(
                  selectedStaffId,
                  payload.firstName,
                  payload.lastName,
                  payload.phoneNumber,
                  payload.address,
                )
              }
              outline
            >
              Thay đổi thông tin nhân viên
            </Button>
          </div>
        </animated.div>
      </Popup>
      <Popup isOpen={isModalOpen2} onRequestClose={() => closeModal2()} width={String('600px')} height={'520px'}>
        <animated.div style={modalAnimation2}>
          <h2>Thêm nhân viên</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Tên đăng nhập</div>
            <div className={cx('fullname')}>
              <InputForm
                placeholder=""
                type="text"
                value={payload.username}
                setValue={setPayload}
                name={'username'}
                className={cx('input')}
                leftIcon={faSignature}
              />
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Mật khẩu</div>
            <div className={cx('fullname')}>
              <InputForm
                placeholder=""
                type="text"
                value={payload.password}
                setValue={setPayload}
                name={'password'}
                className={cx('input')}
                leftIcon={faSignature}
              />
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Họ và tên</div>
            <div className={cx('fullname')}>
              <InputForm
                placeholder=""
                type="text"
                value={payload.firstName}
                setValue={setPayload}
                name={'firstName'}
                className={cx('input')}
                leftIcon={faSignature}
              />
              <InputForm
                placeholder=""
                type="text"
                value={payload.lastName}
                setValue={setPayload}
                name={'lastName'}
                className={cx('input')}
                leftIcon={faSignature}
              />
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Địa chỉ</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.address}
              setValue={setPayload}
              name={'address'}
              className={cx('input')}
              leftIcon={faLocationDot}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Số điện thoại</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.phoneNumber}
              setValue={setPayload}
              name={'phoneNumber'}
              className={cx('input')}
              leftIcon={faMobileScreenButton}
            />
          </div>
          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleAddStaff(
                  payload.username,
                  payload.password,
                  payload.firstName,
                  payload.lastName,
                  payload.phoneNumber,
                  payload.address,
                )
              }
              outline
            >
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageStaff;
