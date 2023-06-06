import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

import styles from './Header.module.scss';
import config from '~/config';
import images from '~/assets/images';
import Search from '~/layouts/components/Search';
import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
  const [currentUser, setCurrenUser] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [infor, setInfor] = useState({});
  const [countCart, setCountCart] = useState(0);

  const navigate = useNavigate();
  const goLogin = useCallback(
    (flag) => {
      navigate(config.routes.login, { state: { flag } });
    },
    [navigate],
  );

  useEffect(() => {
    let prevScroll = window.pageYOffset;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (prevScroll >= currentScroll) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      prevScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    document.cookie = 'token=;';
    window.location.replace('/');
    localStorage.setItem('Role', null);
  }

  useEffect(() => {
    const getApiProfileCustomer = async () => {
      const response = await axios.get('http://localhost:5000/api/user/profile/customer', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      if (response.data.success === true) {
        setCurrenUser(true);
        setInfor(response.data.user);
      } else {
        setCurrenUser(false);
        setInfor({});
      }
    };

    const getApiCountCart = async () => {
      const response = await axios.get('http://localhost:5000/api/cart/items', {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setCountCart(response.data.cartItem.length);
    };
    getApiCountCart();
    getApiProfileCustomer();
  }, []);

  const user_items = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Thông tin cá nhân',
      to: `/customer/information`,
    },
    // {
    //   icon: <FontAwesomeIcon icon={faClipboard} />,
    //   title: 'Đơn hàng yêu thích',
    //   to: '/profile',
    // },
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Đăng xuất',
      onClick: Logout,
    },
  ];

  return (
    <header className={cx('wrapper', `${showHeader ? 'show' : ''}`)}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img src={images.logo3} alt="2H&MBookStore" />
        </Link>

        {/* Search de cho nay */}
        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <div className={cx('action-box')}>
                <Link to="/cart" className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className={cx('notice')}>{countCart}</span>
                </Link>
                <span className={cx('action-note')}>Giỏ hàng</span>
              </div>
            </>
          ) : (
            <>
              <Button onClick={() => goLogin(false)} primary>
                Đăng nhập
              </Button>
              <Button onClick={() => goLogin(true)} outline className={cx('btn')}>
                Đăng kí
              </Button>
            </>
          )}
          <Menu items={user_items}>
            {currentUser ? (
              <div className={cx('action-box')}>
                <Link className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <span className={cx('action-note')}>{infor.FirstName + ' ' + infor.LastName}</span>
              </div>
            ) : (
              <></>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
