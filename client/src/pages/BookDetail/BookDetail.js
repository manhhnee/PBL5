import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './BookDetail.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import Rate from '~/components/Rate';
import Star from '~/components/Star';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookDetail() {
  const [count, setCount] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [totalRating, setTotalRating] = useState(5);
  const [book, setBook] = useState({});
  const [imageList, setImageList] = useState([]);
  const [mainImage, setMainImage] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchAPIBooks = async () => {
      const response = await axios.get(`http://localhost:5000/api/book/detail/${id}`);
      const booksData = await response.data;
      setBook(booksData);
      // Loop through booksData and fetch images for each book
    };
    const fetchAPIImages = async () => {
      const response = await axios.get(`http://localhost:5000/api/image/${id}`);
      const imagesData = await response.data;
      setImageList(imagesData);
      setMainImage(imagesData[0].Image);
    };

    const fetchAPIStar = async () => {
      const response = await axios.get(`http://localhost:5000/api/rating/totalstar/${id}`);
      const starData = await response.data;
      setTotalRating(starData.stars);
    };

    fetchAPIBooks();
    fetchAPIImages();
    fetchAPIStar();
  }, []);

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
          {imageList.map((image, index) => {
            return (
              <div className={cx('thumbnail')}>
                <Image key={index} className={cx('small-img')} src={image.Image} alt="img1"></Image>{' '}
              </div>
            );
          })}
        </div>
        <div className={cx('center-content')}>
          <Image className={cx('large-img')} alt="img4" src={mainImage}></Image>
          <Button outline className={cx('btn')}>
            <FontAwesomeIcon className={cx('icon')} icon={faCartShopping}></FontAwesomeIcon>
            Thêm vào giỏ hàng
          </Button>
        </div>
        <div className={cx('right-content')}>
          <span className={cx('bookname')}>{book.Name}</span>
          <div className={cx('star')}>
            <Star rating={totalRating} setRating={setTotalRating}></Star>
          </div>
          <span className={cx('price')}>{book.Price} đ</span>
          <span className={cx('supplier')}>Nhà cung cấp: Nhà xuất bản Kim Đồng</span>
          <span className={cx('publisher')}>Nhà xuất bản: {book.Publisher}</span>
          <span className={cx('author')}>Tác giả: {book.Author}</span>
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
            <div className={cx('description')}>{book.Description}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookDetail;
