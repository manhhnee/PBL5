import classNames from 'classnames/bind';

import styles from './Rate.module.scss';
import Image from '~/components/Image';
import Star from '~/components/Star';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Rate({ data = [] }) {
  const [rating, setRating] = useState(0);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('rate')}>
        <div className={cx('ava')}>
          <Image
            src="https://afamilycdn.com/150157425591193600/2023/3/6/d-1678083500951102773938-1678087074156-16780870743291018826034.jpeg"
            className={cx('img')}
          ></Image>
        </div>
        <div className={cx('comment-field')}>
          <span className={cx('name')}>Nguyễn Đức Mạnh</span>
          <div className={cx('star')}>
            <Star rating={rating} setRating={setRating} isUpdate={true} />
          </div>
          <span className={cx('comment')}>Truyện hay quá !</span>
        </div>
      </div>
    </div>
  );
}

export default Rate;
