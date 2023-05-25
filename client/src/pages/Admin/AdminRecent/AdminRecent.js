import classNames from 'classnames/bind';

import Order from '~/components/Order';
import Menu from '~/pages/Admin/Menu';
import styles from './AdminRecent.module.scss';

const cx = classNames.bind(styles);

function AdminRecent() {
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng gần đây</span>
      </div>
      <div className={cx('order-list')}>
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  );
}

export default AdminRecent;
