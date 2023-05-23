import classNames from 'classnames/bind';

import Menu from '~/pages/Admin/Menu';
import Order from '~/components/Order';
import styles from './AdminSuccess.module.scss';

const cx = classNames.bind(styles);

function AdminSuccess() {
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng giao thành công</span>
      </div>
      <div className={cx('order-list')}>
        <Order />
        <Order />
      </div>
    </div>
  );
}

export default AdminSuccess;
