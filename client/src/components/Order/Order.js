import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import Image from '~/components/Image';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order({ data, icon }) {
  if (!data) {
    return null;
  }
  const orderDate = data.OrderDate;
  const formattedDate = moment(orderDate).format('YYYY-MM-DD');
  const formattedTime = moment(orderDate, 'HH:mm').format('hh:mm A');
  return (
    <div className={cx('order')}>
      <Image className={cx('order-image')} src={data.Avatar} alt="avatar"></Image>
      <FontAwesomeIcon className={cx('icon')} icon={icon} bounce />

      <div className={cx('name-order')}>{data.FirstName + ' ' + data.LastName}</div>

      <div className={cx('day-order')}>{formattedDate}</div>
      <div className={cx('time-order')}>{formattedTime}</div>
      <div className={cx('price-order')}>{data.Price}</div>
    </div>
  );
}

export default Order;
