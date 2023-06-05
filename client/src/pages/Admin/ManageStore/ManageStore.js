import classNames from 'classnames/bind';

import styles from './ManageStore.module.scss';

const cx = classNames.bind(styles);

function ManageStore() {
  return <div className={cx('wrapper')}></div>;
}

export default ManageStore;
