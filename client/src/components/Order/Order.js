import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Image from '~/components/Image';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
  return (
    <div className={cx('order')}>
      <Image
        className={cx('order-image')}
        src="https://dienchau2.edu.vn/wp-content/uploads/2023/03/Meme-My-Dieu-bay-hay-hai-huoc.fna&oh=00_AfDImdqtt7DBEkFehcuqyeDvh6QUGaYyJ3GVCCnnGnNwMA&oe=6403CBA8.jpeg"
        alt="avatar"
      ></Image>
      <FontAwesomeIcon className={cx('icon')} icon={faTruckFast} bounce />

      <div className={cx('name-order')}>Hồ Thanh Hưng</div>

      <div className={cx('day-order')}>Mon, Dec 26</div>
      <div className={cx('time-order')}>9.00AM</div>
      <div className={cx('price-order')}>200.000 đ</div>
    </div>
  );
}

export default Order;
