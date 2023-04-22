import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faFirstOrder } from '@fortawesome/free-brands-svg-icons';

import Sidebar from '~/components/Sidebar/Sidebar';
import Button from '~/components/Button/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function Profile() {
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

        <Button leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>} className={cx('btn')}>
          Đăng xuất
        </Button>
      </Sidebar>
      <div className={cx('container')}>
        <div className={cx('header')}>Trang cá nhân</div>
      </div>
    </div>
  );
}

export default Profile;
