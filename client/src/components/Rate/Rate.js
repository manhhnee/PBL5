import classNames from 'classnames/bind';

import styles from './Rate.module.scss';
import Image from '~/components/Image';
import Star from '~/components/Star';

const cx = classNames.bind(styles);

function Rate({ data = [] }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('rate')}>
        <div className={cx('ava')}>
          <Image src={data.Avatar} className={cx('img')}></Image>
        </div>
        <div className={cx('comment-field')}>
          <span className={cx('name')}>{data.FirstName + ' ' + data.LastName}</span>
          <div className={cx('star')}>
            <Star rating={data.star} />
          </div>
          <span className={cx('comment')}>{data.comment}</span>
        </div>
      </div>
    </div>
  );
}

export default Rate;
