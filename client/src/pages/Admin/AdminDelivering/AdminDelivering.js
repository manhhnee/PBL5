import classNames from 'classnames/bind';

import Order from '~/components/Order';
import Menu from '~/pages/Admin/Menu';
import styles from './AdminDelivering.module.scss';

const cx = classNames.bind(styles);

function AdminDelivering() {
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng đang giao</span>
      </div>
      <div className={cx('order-list')}>
        <Order />
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  );
}

export default AdminDelivering;
