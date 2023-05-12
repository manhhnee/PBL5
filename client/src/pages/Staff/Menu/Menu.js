import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
import config from '~/config';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Menu() {
  return (
    <div className={cx('states')}>
      <Button
        className={cx('btn-state1')}
        leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />}
        to={config.routes.adminWaiting}
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
        to={config.routes.adminSuccess}
      >
        <span className={cx('number')}>4</span>
        <span className={cx('state')}>Giao thành công</span>
      </Button>
    </div>
  );
}

export default Menu;
