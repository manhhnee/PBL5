import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

import styles from './CategoryItem.module.scss';

const cx = classNames.bind(styles);

function CategoryItem({ data, className, to }) {
  const classes = cx('wrapper', { [className]: className });
  return (
    <Link to={to} className={classes}>
      <Image src={data.Image} alt="default" className={cx('image')} />
      <span className={cx('title')}>{data.Name}</span>
    </Link>
  );
}

export default CategoryItem;
