import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClipboard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '~/config';
import images from '~/assets/images';
import Search from '~/layouts/components/Search';
import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const goLogin = useCallback((flag) => {
    navigate(config.routes.login, { state: { flag } });
  }, []);
  const currentUser = false;
  const user_items = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Thông tin cá nhân',
      to: '/login',
    },
    {
      icon: <FontAwesomeIcon icon={faClipboard} />,
      title: 'Đơn hàng yêu thích',
      to: '/profile',
    },
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Đăng xuất',
      to: '/',
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img src={images.logo1} alt="Fahasa" />
        </Link>

        {/* Search de cho nay */}
        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <HeadlessTippy delay={[0, 50]}>
                <div className={cx('action-box')}>
                  <Link className={cx('action-btn')}>
                    <FontAwesomeIcon icon={faBell} />
                  </Link>
                  <span className={cx('action-note')}>Thông báo</span>
                </div>
              </HeadlessTippy>
              <div className={cx('action-box')}>
                <Link to="/cart" className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </Link>
                <span className={cx('action-note')}>Giỏ hàng</span>
              </div>
            </>
          ) : (
            <>
              <Button onClick={() => goLogin(false)} primary>
                Đăng nhập
              </Button>
              <Button onClick={() => goLogin(true)} outline>
                Đăng kí
              </Button>
            </>
          )}
          <Menu items={user_items}>
            {currentUser ? (
              <div className={cx('action-box')}>
                <Link to="/account" className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <span className={cx('action-note')}>MIT</span>
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
