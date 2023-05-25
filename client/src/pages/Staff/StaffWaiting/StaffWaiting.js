import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Menu from '~/pages/Staff/Menu';
import Order from '~/components/Order';
import styles from './StaffWaiting.module.scss';

const cx = classNames.bind(styles);

function StaffWaiting() {
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng đang chờ</span>
        <Link className={cx('all-order')}>Xem toàn bộ đơn hàng</Link>
      </div>
      <div className={cx('order-list')}>
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  );
}

export default StaffWaiting;
