import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileScreenButton, faPlus, faSignature } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

import Image from '~/components/Image';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import Popup from '~/components/Popup';
import styles from './ManageStaff.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function ManageStaff() {
  const [listStaff, setListStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState();
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'translateY(0)' : 'translateY(-100%)',
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

  const openModal = (staffID, firstName, lastName, address, phone) => {
    setSelectedStaffId(staffID);
    setIsModalOpen(true);
    setPayload((prevState) => ({
      ...prevState,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phone,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('btn')}>
        <Button blue leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}>
          Thêm nhân viên
        </Button>
      </div>
      <div className={cx('staff-list')}>
        {listStaff.map((staff) => {
          return (
            <div
              className={cx('staff')}
              onClick={() =>
                openModal(selectedStaffId, staff.FirstName, staff.LastName, staff.Address, staff.PhoneNumber)
              }
            >
              <Image src={staff.Avatar} alt="staff" className={cx('image')} />
              <span className={cx('name')}>{staff.FirstName + ' ' + staff.LastName}</span>
            </div>
          );
        })}
      </div>
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={String('600px')} height={'520px'}>
        <animated.div style={modalAnimation}>
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
            <Button primary>Xóa nhân viên</Button>
            <Button outline>Thay đổi thông tin nhân viên</Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageStaff;
