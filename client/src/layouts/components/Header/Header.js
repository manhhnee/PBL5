import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import config from '~/config';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClipboard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCartArrowDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Search from '~/layouts/components/Search';
import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';
import { useCallback } from 'react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Thông tin cá nhân',
    to: '/profile',
  },
];

function Header() {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(config.routes.login)
  })
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
          <img src={images.logo} alt="Fahasa" />
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
              <Button onClick={goLogin} primary>Đăng nhập</Button>
              <Button outline>Đăng kí</Button>
            </>
          )}
          <Menu items={currentUser ? user_items : MENU_ITEMS}>
            {currentUser ? (
              <div className={cx('action-box')}>
                <Link to="/account" className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <span className={cx('action-note')}>MMIT</span>
              </div>
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
