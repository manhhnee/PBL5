import classNames from 'classnames/bind';

import styles from './BookDetail.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BookDetail() {
  return (
    <div className={cx('main-detail')}>
      <div className={cx('left-content')}>
        <div className={cx('thumbnail')}>
          <Image
            className={cx('small-img')}
            src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2023/02/my-dieu-ngoi-bay-hay-696x571.jpg?fit=700%2C20000&quality=95&ssl=1"
            alt="img1"
          ></Image>
        </div>
        <div className={cx('thumbnail')}>
          <Image
            className={cx('small-img')}
            src="https://afamilycdn.com/150157425591193600/2023/3/6/d-1678083500951102773938-1678087074156-16780870743291018826034.jpeg"
            alt="img2"
          ></Image>
        </div>
        <div className={cx('thumbnail')}>
          <Image
            className={cx('small-img')}
            src="https://dienchau2.edu.vn/wp-content/uploads/2023/03/Meme-My-Dieu-bay-hay-hai-huoc.fna&oh=00_AfDImdqtt7DBEkFehcuqyeDvh6QUGaYyJ3GVCCnnGnNwMA&oe=6403CBA8.jpeg  "
            alt="img3"
          ></Image>
        </div>
      </div>
      <div className={cx('center-content')}>
        <Image
          className={cx('large-img')}
          src="https://cafefcdn.com/203337114487263232/2023/3/6/photo-13-1678089866114549939516.jpeg"
          alt="large-img4"
        ></Image>
        <Button outline className={cx('btn')}>
          <FontAwesomeIcon className={cx('icon')} icon={faCartShopping}></FontAwesomeIcon>
          Thêm vào giỏ hàng
        </Button>
      </div>
      <div className={cx('right-content')}></div>
    </div>
  );
}

export default BookDetail;
