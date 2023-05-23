import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './BookItemCart.module.scss';

const cx = classNames.bind(styles);

function BookItemCart({ data }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content-left')}>
        <Image className={cx('img')} src={data.image}></Image>
      </div>
      <div className={cx('content-center')}>
        <span className={cx('book-name')}>{data.Name}</span>
        <span className={cx('book-category')}>Thể loại: {data.Category_Name}</span>
        <span className={cx('book-price')}>
          {data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}
        </span>
        <span className={cx('book-quantity')}>x{data.quantity}</span>
      </div>
      <div className={cx('content-right')}>
        <div className={cx('options')}>
          <Button primary className={cx('btn')}>
            Thanh toán
          </Button>
          <Button outline className={cx('btn')}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}

BookItemCart.protoTypes = {
  data: PropTypes.node.isRequired,
};

export default BookItemCart;
