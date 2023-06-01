import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import Image from '~/components/Image';
import Star from '~/components/Star';
import Button from '~/components/Button';
import styles from './BookItemHistory.module.scss';

const cx = classNames.bind(styles);

function BookItemHistory() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content-left')}>
        <Image
          className={cx('img')}
          src="https://cdn3.dhht.vn/wp-content/uploads/2023/01/30-giong-meo-noi-tieng-dep-nhat-cute-de-nuoi-va-gia-ban-bia.jpg"
        ></Image>
        <div className={cx('star')}>
          <Star />
        </div>
      </div>
      <div className={cx('content-center')}>
        <span className={cx('book-name')}>The God of Endings: A Novel</span>
        <span className={cx('book-category')}>Thể loại: Dunno</span>
        <span className={cx('book-price')}>200.000Đ</span>
        <span className={cx('book-quantity')}>x1</span>
      </div>
      <div className={cx('content-right')}>
        <div className={cx('status')}>
          <FontAwesomeIcon icon={faTruck} className={cx('icon')}></FontAwesomeIcon>
          <span className={cx('status-name')}>Đã giao thành công</span>
          <FontAwesomeIcon icon={faCircleQuestion} className={cx('icon')}></FontAwesomeIcon>
        </div>
        <div className={cx('options')}>
          <Button blue className={cx('btn')}>
            Đánh giá
          </Button>
          <Button white className={cx('btn')}>
            Mua lại
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookItemHistory;
