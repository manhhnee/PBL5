import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './StaffRecent.module.scss';
import Image from '~/components/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Staff() {
  return (
    <div className={cx('content')}>
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng gần đây</span>
        <Link className={cx('all-order')}>Xem toàn bộ đơn hàng</Link>
      </div>
      <div className={cx('order-list')}>
        <div className={cx('order')}>
          <Image
            className={cx('order-image')}
            src="https://dienchau2.edu.vn/wp-content/uploads/2023/03/Meme-My-Dieu-bay-hay-hai-huoc.fna&oh=00_AfDImdqtt7DBEkFehcuqyeDvh6QUGaYyJ3GVCCnnGnNwMA&oe=6403CBA8.jpeg"
            alt="avatar"
          ></Image>
          <FontAwesomeIcon className={cx('icon')} icon={faSpinner} spin />
          <div className={cx('name-order')}>Hồ Thanh Hưng</div>
          <div className={cx('day-order')}>Mon, Dec 26</div>
          <div className={cx('time-order')}>9.00AM</div>
          <div className={cx('price-order')}>200.000 đ</div>
        </div>
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
        <div className={cx('order')}>
          <Image
            className={cx('order-image')}
            src="https://dienchau2.edu.vn/wp-content/uploads/2023/03/Meme-My-Dieu-bay-hay-hai-huoc.fna&oh=00_AfDImdqtt7DBEkFehcuqyeDvh6QUGaYyJ3GVCCnnGnNwMA&oe=6403CBA8.jpeg"
            alt="avatar"
          ></Image>
          <FontAwesomeIcon className={cx('icon')} icon={faCheckCircle} />

          <div className={cx('name-order')}>Hồ Thanh Hưng</div>
          <div className={cx('day-order')}>Mon, Dec 26</div>
          <div className={cx('time-order')}>9.00AM</div>
          <div className={cx('price-order')}>200.000 đ</div>
        </div>
        <div className={cx('order')}>
          <Image
            className={cx('order-image')}
            src="https://dienchau2.edu.vn/wp-content/uploads/2023/03/Meme-My-Dieu-bay-hay-hai-huoc.fna&oh=00_AfDImdqtt7DBEkFehcuqyeDvh6QUGaYyJ3GVCCnnGnNwMA&oe=6403CBA8.jpeg"
            alt="avatar"
          ></Image>
          <div className={cx('name-order')}>Hồ Thanh Hưng</div>
          <div className={cx('day-order')}>Mon, Dec 26</div>
          <div className={cx('time-order')}>9.00AM</div>
          <div className={cx('price-order')}>200.000 đ</div>
        </div>
        <div className={cx('order')}>
          <Image
            className={cx('order-image')}
            src="https://dienchau2.edu.vn/wp-content/uploads/2023/03/Meme-My-Dieu-bay-hay-hai-huoc.fna&oh=00_AfDImdqtt7DBEkFehcuqyeDvh6QUGaYyJ3GVCCnnGnNwMA&oe=6403CBA8.jpeg"
            alt="avatar"
          ></Image>
          <div className={cx('name-order')}>Hồ Thanh Hưng</div>
          <div className={cx('day-order')}>Mon, Dec 26</div>
          <div className={cx('time-order')}>9.00AM</div>
          <div className={cx('price-order')}>200.000 đ</div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
