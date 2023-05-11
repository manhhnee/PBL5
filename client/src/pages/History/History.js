import classNames from 'classnames/bind';

import Profile from '~/layouts/Profile';
import styles from './History.module.scss';
import BookItemHistory from '~/components/BookItemHistory';

const cx = classNames.bind(styles);

function History() {
  return (
    <Profile>
      <div className={cx('container')}>
        <span className={cx('header')}>Lịch sử đơn hàng</span>
        <BookItemHistory />
        <BookItemHistory />
      </div>
    </Profile>
  );
}

export default History;
