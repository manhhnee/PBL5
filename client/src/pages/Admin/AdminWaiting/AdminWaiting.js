import classNames from 'classnames/bind';

import Menu from '~/pages/Admin/Menu';
import Order from '~/components/Order';
import styles from './AdminWaiting.module.scss';

const cx = classNames.bind(styles);

function AdminWaiting() {
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng đang chờ</span>
      </div>
      <div className={cx('order-list')}>
        <Order />
        <Order />
      </div>
    </div>
  );
}

export default AdminWaiting;
