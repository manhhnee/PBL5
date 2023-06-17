import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faSpinner, faTruckFast, faX } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';
import Star from '~/components/Star';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './BookItemHistory.module.scss';
import config from '~/config';
import Popup from '~/components/Popup/Popup';
import InputForm from '~/components/InputForm/InputForm';

const cx = classNames.bind(styles);

function BookItemHistory() {
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const [historyDetails, setHistoryDetails] = useState({});
  const [idStatus, setIdStatus] = useState();
  const [idBook, setIdBook] = useState();
  const [idOrderItem, setIdOrderItem] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState({
    comment: '',
  });
  const [rating, setRating] = useState(5);

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    const getApiHistoryDetail = async () => {
      const response = await axios.get(`https://pbl5-server-shpk.onrender.com/api/order/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setHistoryDetails(response.data);
      setIdStatus(response.data.orderInfor.id_Status);
    };
    getApiHistoryDetail();
  }, [id]);

  const handleRating = async (idBook, star, comment, idOrderItem) => {
    await axios
      .post(
        'https://pbl5-server-shpk.onrender.com/api/rating/add',
        {
          id_Book: idBook,
          star: star,
          commemt: comment,
          idOrderItem: idOrderItem,
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
  };

  let iconComponent;
  let statusComponent;
  if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 1) {
    iconComponent = <FontAwesomeIcon icon={faSpinner} className={cx('icon')} spinPulse />;
    statusComponent = <span className={cx('status-name')}>Đơn hàng đang được chuẩn bị</span>;
  } else if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 2) {
    iconComponent = <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} bounce />;
    statusComponent = <span className={cx('status-name')}>Đơn hàng đang được giao</span>;
  } else if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 3) {
    iconComponent = <FontAwesomeIcon icon={faCheckCircle} className={cx('icon')} beat />;
    statusComponent = <span className={cx('status-name')}>Đơn hàng đã được giao thành công</span>;
  } else if (historyDetails.orderInfor && historyDetails.orderInfor.id_Status === 4) {
    iconComponent = <FontAwesomeIcon icon={faX} className={cx('icon1')} beatFade />;
    statusComponent = <span className={cx('status-name1')}>Đơn hàng đã được hủy</span>;
  }

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(number);
  }

  return (
    <div className={cx('wrapper')}>
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
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={'700px'} height={'400px'}>
        <animated.div style={modalAnimation}>
          <h2>Đánh giá</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Số sao</div>
            <div className={cx('star')}>
              <Star rating={rating} setRating={setRating} isUpdate={true}></Star>
            </div>
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Nhập đánh giá</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.comment}
              setValue={setPayload}
              name={'comment'}
              className={cx('input')}
              leftIcon={faBook}
            />
          </div>

          <div className={cx('options1')}>
            <Button onClick={() => handleRating(idBook, rating, payload.comment, idOrderItem)} primary>
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
      <div className={cx('container')}>
        {historyDetails.orderDetail &&
          historyDetails.orderDetail.map((order) => {
            return (
              <div className={cx('content')} key={order.id}>
                <div className={cx('content-left')}>
                  <Image className={cx('img')} src={order.Image}></Image>
                </div>
                <div className={cx('content-center')}>
                  <span className={cx('book-name')}>{order.Name}</span>
                  <span className={cx('book-category')}>Tác giả: {order.Author}</span>
                  <span className={cx('book-price')}>{order.Fixed_Price && formatCurrency(order.Fixed_Price)}</span>
                  <span className={cx('book-quantity')}>x{order.quantity}</span>
                </div>
                <div className={cx('content-right')}>
                  <div className={cx('status')}>
                    {iconComponent}
                    {statusComponent}
                  </div>
                  <div className={cx('options')}>
                    {idStatus === 3 && order.isRated === 0 ? (
                      <Button
                        onClick={() => {
                          openModal();
                          setIdBook(order.idBook);
                          setIdOrderItem(order.id);
                        }}
                        blue
                        className={cx('btn')}
                      >
                        Đánh giá
                      </Button>
                    ) : null}
                    <Button to={`${config.routes.bookdetail}?id=${order.idBook}`} white className={cx('btn')}>
                      Mua lại
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BookItemHistory;
