import classNames from 'classnames/bind';

import styles from './BookItem.module.scss';

const cx = classNames.bind(styles);

function BookItem() {
  return (
    <div className={cx('book-items')}>
      <div className={cx('item-inner')}>
        <div className={cx('item')}>
          <div className={cx('item-img')}>
            <img
              src="https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg"
              alt="book-img"
              className={cx('img')}
            />
          </div>
          <div className={cx('item-title')}>BlueLock - Tập 2 - Tặng Kèm Postcard Nhựa</div>
        </div>
        <div className={cx('item-label')}>
          <p className={cx('item-price')}>35.000đ</p>
          <div className={cx('item-episode')}>Tập 2</div>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
