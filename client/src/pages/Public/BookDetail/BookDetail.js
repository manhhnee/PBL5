import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AutoComplete from '~/components/AutoComplete';
import Image from '~/components/Image/Image';
import Popup from '~/components/Popup';
import Button from '~/components/Button/Button';
import Rate from '~/components/Rate';
import Star from '~/components/Star';
import styles from './BookDetail.module.scss';
import Paypal from '~/components/Paypal';

const cx = classNames.bind(styles);

function BookDetail() {
  const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Mặc định là tiền mặt khi nhận hàng
  const [count, setCount] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [totalRating, setTotalRating] = useState(5);
  const [book, setBook] = useState({});
  const [imageList, setImageList] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [ratings, setRatings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const [errorMessages, setErrorMessages] = useState({
    address: '',
  });
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!autocompleteInputValue.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ đặt hàng!';
      isValid = false;
    }

    setErrorMessages(errors);

    return isValid;
  };

  function getJwtFromCookie() {
    //lấy token được lưu trong cookie ra
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }

  useEffect(() => {
    const fetchAPIBooks = async () => {
      const response = await axios.get(`http://localhost:5000/api/book/detail/${id}`);
      const booksData = await response.data;
      setBook(booksData.book);
      setTotalRating(booksData.book.stars);
      setImageList(booksData.images);
      setMainImage(booksData.images[0].Image);
      setRatings(booksData.ratings);
    };

    fetchAPIBooks();
  }, [id]);

  const handleAddToCart = async (id_BookSupplier, quantity) => {
    if (!getJwtFromCookie()) {
      toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng');
    } else {
      await axios
        .post(
          'http://localhost:5000/api/cart/add',
          {
            id_BookSupplier: id_BookSupplier,
            quantity: quantity,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getJwtFromCookie()}`,
            },
          },
        )
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          alert('Something went wrong', error);
        });
    }
  };

  const handleCreateOneOrder = async (id_BookSupplier, quantity, Price, Amount, address) => {
    console.log(id_BookSupplier, quantity, Price, Amount, address);
    if (!getJwtFromCookie()) {
      toast.warning('Vui lòng đăng nhập để mua hàng');
    } else {
      if (!validateForm()) {
        return;
      } else {
        await axios
          .post(
            'http://localhost:5000/api/order/addOneItem',
            {
              payment: 1,
              id_BookSupplier: id_BookSupplier,
              quantity: quantity,
              Price: Price,
              Amount: Amount,
              address: address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJwtFromCookie()}`,
              },
            },
          )
          .then((res) => {
            toast.success(res.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }
  };

  function handleIncrement() {
    if (count >= book.Amount) {
      setCount(book.Amount);
    } else {
      setCount(count + 1);
    }
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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={cx('main-detail')}>
        <div className={cx('left-content')}>
          {imageList.slice(0, 5).map((image, index) => {
            return (
              <div className={cx('thumbnail')} key={index}>
                <Image className={cx('small-img')} src={image.Image} alt="img1"></Image>{' '}
              </div>
            );
          })}
        </div>
        <div className={cx('center-content')}>
          <Image className={cx('large-img')} alt="img4" src={mainImage}></Image>
          <Button onClick={() => handleAddToCart(book.id_BookSupplier, count)} outline className={cx('btn')}>
            <FontAwesomeIcon className={cx('icon')} icon={faCartShopping}></FontAwesomeIcon>
            Thêm vào giỏ hàng
          </Button>
        </div>
        <div className={cx('right-content')}>
          <span className={cx('bookname')}>{book.Name}</span>
          <div className={cx('star')}>
            <Star rating={totalRating} setRating={setTotalRating}></Star>
          </div>
          <span className={cx('price')}>
            {book.Price === undefined
              ? 0
              : book.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}
          </span>
          <span className={cx('supplier')}>Nhà cung cấp: {book.Supplier ? book.Supplier : ' '}</span>
          <span className={cx('publisher')}>Nhà xuất bản: {book.Publisher}</span>
          <span className={cx('author')}>Tác giả: {book.Author}</span>
          <span className={cx('quantity')}>Số lượng: {book.Amount ? book.Amount : 'Hết hàng'}</span>
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
            <Button onClick={() => openModal()} primary className={cx('btn')}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={String('500px')} height={'500px'}>
        <animated.div style={modalAnimation}>
          <h2>Xác nhận thanh toán</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Nhập địa chỉ</div>
            <AutoComplete setParentInputValue={setAutocompleteInputValue} />
            {errorMessages.address && <div className={cx('error-message')}>{errorMessages.address}</div>}
          </div>
          <div className={cx('options')}>
            <div className={cx('payment-methods')}>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                />
                Thanh toán bằng tiền mặt khi nhận hàng
              </label>
              <label>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={handlePaymentMethodChange}
                />
                Thanh toán bằng PayPal
              </label>
            </div>
            {paymentMethod === 'cash' ? (
              <Button
                onClick={() =>
                  handleCreateOneOrder(book.id_BookSupplier, count, book.Price, book.Amount, autocompleteInputValue)
                }
                outline
              >
                Xác nhận
              </Button>
            ) : (
              <Paypal
                idBookSupplier={book.id_BookSupplier}
                quantity={count}
                price={((book.Price / 24000) * count).toFixed(2)}
                amount={book.Amount}
                address={autocompleteInputValue}
              />
            )}
          </div>
        </animated.div>
      </Popup>
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
              {ratings.map((rating, index) => {
                return <Rate data={rating} key={index} />;
              })}
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
