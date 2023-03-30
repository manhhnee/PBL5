import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './BookItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function BookItem({ items }) {
  return (
    <div className={cx('book-items')}>
      <div className={cx('container')}>
        {items.map((item) => {
          return (
            <Link className={cx('item')}>
              <Image src={item.img} alt={item.alt} className={cx('img')} />
              <div className={cx('title')}>{item.title}</div>
              <div className={cx('author')}>{item.author}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookItem;
