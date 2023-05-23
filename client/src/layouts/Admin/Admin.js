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
          leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Trang chủ
        </Button>
        <Button
          to={config.routes.manageStaff}
          leftIcon={<FontAwesomeIcon icon={faPerson}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Nhân viên
        </Button>
        <Button
          to={config.routes.adminRecent}
          leftIcon={<FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Kho hàng
        </Button>
        <Button
          to={config.routes.adminRecent}
          leftIcon={<FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Doanh thu
        </Button>

        <Button
          onClick={Logout}
          leftIcon={<FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>}
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
