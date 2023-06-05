import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './BookItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function BookItem({ items }) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }
  return (
    <div className={cx('book-items')}>
      <div className={cx('container')}>
        {items.map((item) => {
          return (
            <Link key={item.id} onClick={scrollToTop} to={`/bookdetail?id=${item.id}`} className={cx('item')}>
              <Image src={item.Image} className={cx('img')} />
              <div className={cx('title')}>{item.Name}</div>
              <div className={cx('author')}>{item.Author}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

BookItem.protoTypes = {
  items: PropTypes.array.isRequired,
};

export default BookItem;
