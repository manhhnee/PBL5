import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';

import Sidebar from '~/components/Sidebar';
import Button from '~/components/Button';
import styles from './Profile.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Profile({ children }) {
  const { id } = useParams();
  let buttonName = 'btn1';
  const [activeButton, setActiveButton] = useState(buttonName);
  const handleClick = (buttonName) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
    }
  };
  useEffect(() => {}, [activeButton]);

  return (
    <div className={cx('wrapper')}>
      <Sidebar>
        <Button
          to={`/customer/information/${id}`}
          leftIcon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 'btn1' ? 'active' : ''}`)}
          onClick={() => handleClick('btn1')}
        >
          Trang cá nhân
        </Button>
        <Button
          to={`/customer/history/${id}`}
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
      {children}
    </div>
  );
}

export default Profile;
