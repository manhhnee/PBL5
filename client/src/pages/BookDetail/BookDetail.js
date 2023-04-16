import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './BookDetail.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import Rate from '~/components/Rate';
import Star from '~/components/Star';

const cx = classNames.bind(styles);

function BookDetail() {
  const [count, setCount] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [totalRating, setTotalRating] = useState(5);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  const handleClick1 = () => {
    setIsActive(false);
  };
  const handleClick2 = () => {
    setIsActive(true);
  };
  return (
    <>
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
        <div className={cx('right-content')}>
          <span className={cx('bookname')}>Dragon ball tập 1</span>
          <div className={cx('star')}>
            <Star rating={totalRating} setRating={setTotalRating}></Star>
          </div>
          <span className={cx('price')}>25.000 đ</span>
          <span className={cx('supplier')}>Nhà cung cấp: Nhà xuất bản Kim Đồng</span>
          <span className={cx('publisher')}>Nhà xuất bản: Kim Đồng</span>
          <span className={cx('author')}>Tác giả: 鳥山昭</span>
          <span className={cx('quantity')}>Số lượng: 10</span>
          <div className={cx('buy-field')}>
            <div className={cx('container-input')}>
              <button className={cx('decrement')} onClick={handleDecrement}>
                {' '}
                -{' '}
              </button>
              <input type="number" min="0" max="100" step="1" value={count} readOnly className={cx('my-input')} />
              <button className={cx('increment')} onClick={handleIncrement}>
                {' '}
                +{' '}
              </button>
            </div>
            <Button primary className={cx('btn')}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
      <div className={cx('extra-detail')}>
        <div className={cx('header-field', `${isActive ? 'active' : ''}`)}>
          <span className={cx('header-description')} onClick={handleClick1}>
            Mô tả
          </span>
          <span className={cx('header-rate')} onClick={handleClick2}>
            Đánh giá
          </span>
        </div>
        <div className={cx('content')}>
          {isActive ? (
            <>
              <Rate></Rate>
            </>
          ) : (
            <div className={cx('description')}>
              Dragon Ball (ドラゴンボール Doragon Bōru?) là bộ truyện tranh nhiều tập được viết và vẽ minh họa bởi
              Toriyama Akira. Loạt truyện tranh bắt đầu xuất bản hàng tuần trong tạp chí Weekly Shōnen Jump từ năm 1984
              đến 1995 với 519 chương và sau đó được xuất bản trong 42 tập truyện dày bởi nhà xuất bản Shueisha. Sau 20
              năm dừng sáng tác, từ năm 2015, tác giả Toriyama Akira đã tiếp tục sáng tác bộ truyện Dragon Ball Super,
              với nội dung tiếp nối bộ truyện gốc.<br></br>
              <br></br> Dragon Ball là bộ truyện nổi tiếng và phổ biến rộng rãi bậc nhất trên toàn thế giới, là một
              trong những bộ manga được tiêu thụ nhiều nhất mọi thời đại.<br></br>
              <br></br> Tương phản với tiểu thuyết Tây du ký của Trung Quốc, loạt truyện mô tả cuộc hành trình của Son
              Goku từ lúc bé đến trưởng thành, qua các lần tầm sư học võ và khám phá thế giới để truy tìm các viên ngọc
              rồng với điều ước từ rồng thiêng. Xuyên suốt hành trình của Son Goku, cậu đã gặp được nhiều bạn bè và
              chống lại những kẻ hung ác có âm mưu dùng điều ước từ rồng thiêng để làm bá chủ thế giới.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookDetail;
