import classNames from 'classnames/bind';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
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

  console.log(document.cookie);

  useEffect(() => {
    fetch('http://localhost:5000/user/staff', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtFromCookie()}`, // trả token về server để xử lí
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
        } else {
        }
      });
  }, []);

  return (
    <aside className={cx('wrapper')}>
      <Button
        to={config.routes.staffRecent}
        leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
        className={cx('btn-home')}
      >
        Home
      </Button>
      <div className={cx('line')}></div>
      <div className={cx('container-left')}>
        <div className={cx('provider')}>
          <div className={cx('header')}>PROVIDERS</div>
          <div className={cx('content')}>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Kho
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Vận chuyển
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Cung cấp
            </Button>
          </div>
        </div>
        <div className={cx('line')}></div>
        <div className={cx('order')}>
          <div className={cx('header')}>orders</div>
          <div className={cx('content')}>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Kho
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Vận chuyển
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Cung cấp
            </Button>
          </div>
        </div>
        <div className={cx('line')}></div>
        <div className={cx('account')}>
          <div className={cx('header')}>account</div>
          <div className={cx('content')}>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Kho
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Vận chuyển
            </Button>
            <Button
              onClick={Logout}
              className={cx('btn')}
              leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
