import classNames from 'classnames/bind';

import styles from './Staff.module.scss';
import Sidebar from '~/components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function Staff() {
  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('container')}></div>
    </div>
  );
}

export default Staff;
