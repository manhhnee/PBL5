import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

import styles from './CategoryItem.module.scss';

const cx = classNames.bind(styles);

function CategoryItem({ data, className }) {
  const classes = cx('wrapper', { [className]: className });
  return (
    <Link className={classes}>
      <Image src={data.img} alt={data.alt} className={cx('image')} />
      <span className={cx('title')}>{data.title}</span>
    </Link>
  );
}

export default CategoryItem;
