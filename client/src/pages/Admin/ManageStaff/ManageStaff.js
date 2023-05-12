import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMobileScreenButton, faPlus, faSignature } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import Image from '~/components/Image';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import styles from './ManageStaff.module.scss';

const cx = classNames.bind(styles);

function ManageStaff() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    avatar: '',
  });
  useEffect(() => {
    Modal.setAppElement('#root'); // Specify the root element of your React app
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
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
        <div className={cx('staff')} onClick={openModal}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg"
            alt="staff"
            className={cx('image')}
          />
          <span className={cx('name')}>Nguyễn Văn A</span>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            width: '600px',
            height: '600px',
            margin: 'auto',
            border: 'none',
            borderRadius: '5px',
          },
        }}
      >
        <h2>Thông tin nhân viên</h2>
        <div className={cx('input-field')}>
          <div className={cx('header')}>Họ và tên</div>
          <div className={cx('fullname')}>
            <InputForm
              placeholder="Nguyen Duc"
              type="text"
              value={payload.firstName}
              setValue={setPayload}
              name={'firstName'}
              className={cx('input')}
              leftIcon={faSignature}
            />
            <InputForm
              placeholder="Manh"
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
      </Modal>
    </div>
  );
}

export default ManageStaff;