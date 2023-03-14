import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <aside className={cx('sidebar')}>
          <div className={cx('sidebar-logo')}>
            <img className={cx('logo')} src={images.logo} alt="logo"></img>
          </div>
          <div className={cx('address')}>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</div>
          <div className={cx('address')}>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</div>
          <div className={cx('address')}>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</div>
          <div className={cx('address')} style={{ marginTop: '12px' }}>
            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại
            văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
          </div>
          <div className={cx('icons')}>
            <Link className={cx('icon')}>
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link className={cx('icon')}>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link className={cx('icon')}>
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link className={cx('icon')}>
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link className={cx('icon')}>
              <FontAwesomeIcon icon={faPinterest} />
            </Link>
          </div>
        </aside>
        <div className={cx('content')}>
          <div className={cx('static')}>
            <div className={cx('title')}>
              <h3>DỊCH VỤ</h3>
            </div>
            <div className={cx('contents')}>
              <Link className={cx('content-item')}>Điều khoản sử dụng</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật thông tin cá nhân</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật thanh toán</Link>
              <Link className={cx('content-item')}>Giới thiệu Fahasa</Link>
              <Link className={cx('content-item')}>Hệ thống trung tâm - nhà sách</Link>
            </div>
          </div>
          <div className={cx('static')}>
            <div className={cx('title')}>
              <h3>DỊCH VỤ</h3>
            </div>
            <div className={cx('contents')}>
              <Link className={cx('content-item')}>Điều khoản sử dụng</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật thông tin cá nhân</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật thanh toán</Link>
              <Link className={cx('content-item')}>Giới thiệu Fahasa</Link>
              <Link className={cx('content-item')}>Hệ thống trung tâm - nhà sách</Link>
            </div>
          </div>
          <div className={cx('static')}>
            <div className={cx('title')}>
              <h3>DỊCH VỤ</h3>
            </div>
            <div className={cx('contents')}>
              <Link className={cx('content-item')}>Điều khoản sử dụng</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật thông tin cá nhân</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật thanh toán</Link>
              <Link className={cx('content-item')}>Giới thiệu Fahasa</Link>
              <Link className={cx('content-item')}>Hệ thống trung tâm - nhà sách</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
