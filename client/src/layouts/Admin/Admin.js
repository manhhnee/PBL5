import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHouseChimney, faPerson, faRightFromBracket, faTruck } from '@fortawesome/free-solid-svg-icons';

import Sidebar from '~/components/Sidebar/Sidebar';
import Button from '~/components/Button/Button';
import config from '~/config';
import styles from './Admin.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Admin({ children }) {
  const [infor, setInfor] = useState({});
  const [activeButton, setActiveButton] = useState(() => {
    const storageActive = localStorage.getItem('active');
    return storageActive ? parseInt(storageActive) : 1;
  });
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
    localStorage.setItem('active', buttonId);
  };

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

  function Logout() {
    document.cookie = 'token=; path=/';
    window.location.replace(config.routes.login);
    localStorage.setItem('Role', null);
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile/admin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtFromCookie()}`, // trả token về server để xử lí
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          setInfor(response.user);
        } else {
          alert(response.message);
          window.location.replace(config.routes.login);
        }
      });
  }, []);
  const currentDate = new Date();

  return (
    <div className={cx('wrapper')}>
      <Sidebar>
        <Button
          to={config.routes.adminRecent}
          leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faHouseChimney}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 1 ? 'active' : ''}`)}
          onClick={() => handleClick(1)}
        >
          Trang chủ
        </Button>
        <Button
          to={config.routes.manageStaff}
          leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faPerson}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 2 ? 'active' : ''}`)}
          onClick={() => handleClick(2)}
        >
          Nhân viên
        </Button>
        <Button
          to={config.routes.adminRecent}
          leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faTruck}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 3 ? 'active' : ''}`)}
          onClick={() => handleClick(3)}
        >
          Kho hàng
        </Button>
        <Button
          to={config.routes.adminRecent}
          leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faChartLine}></FontAwesomeIcon>}
          className={cx('btn', `${activeButton === 4 ? 'active' : ''}`)}
          onClick={() => handleClick(4)}
        >
          Doanh thu
        </Button>

        <Button
          onClick={Logout}
          leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Đăng xuất
        </Button>
      </Sidebar>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <span className={cx('date')}>
            Ngày {currentDate.getDate()} Tháng {currentDate.getMonth() + 1} Năm {currentDate.getFullYear()}, Thứ{' '}
            {currentDate.getDay() + 1}
          </span>
          <span className={cx('name')}>Xin chào, {infor.FirstName + ' ' + infor.LastName}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

Admin.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default Admin;
