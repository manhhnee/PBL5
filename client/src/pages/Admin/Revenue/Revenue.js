import classNames from 'classnames/bind';

import styles from './Revenue.module.scss';

const cx = classNames.bind(styles);

function Revenue() {
  return <div className={cx('wrapper')}></div>;
}

export default Revenue;
