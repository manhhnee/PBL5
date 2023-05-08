import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList, faHouseChimney, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faFirstOrder } from '@fortawesome/free-brands-svg-icons';

import styles from './Admin.module.scss';
import Sidebar from '~/components/Sidebar/Sidebar';
import Button from '~/components/Button/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function Admin({ children }) {
  function Logout() {
    document.cookie = 'token=; path=/';
    window.location.replace(config.routes.login);
    localStorage.setItem('Role', null);
  }

  const currentDate = new Date();

  return (
    <div className={cx('wrapper')}>
      <Sidebar>
        <Button
          to={config.routes.staffRecent}
          leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Home
        </Button>
        <Button
          to={config.routes.staffRecent}
          leftIcon={<FontAwesomeIcon icon={faFirstOrder}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Đặt hàng
        </Button>
        <Button
          to={config.routes.staffRecent}
          leftIcon={<FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Vận chuyển
        </Button>
        <Button
          to={config.routes.staffRecent}
          leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
          className={cx('btn')}
        >
          Đơn hàng
        </Button>

        <Button
          onClick={Logout}
          leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
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
          <div className={cx('states')}>
            <Button
              className={cx('btn-state1')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
              to={config.routes.adminDelivering}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Đơn hàng đang chờ</span>
            </Button>
            <Button
              className={cx('btn-state2')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
              to={config.routes.adminDelivering}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Đang vận chuyển</span>
            </Button>
            <Button
              className={cx('btn-state3')}
              leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
              to={config.routes.adminDelivering}
            >
              <span className={cx('number')}>4</span>
              <span className={cx('state')}>Giao thành công</span>
            </Button>
          </div>
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
