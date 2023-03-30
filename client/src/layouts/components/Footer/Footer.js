import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <aside className={cx('sidebar')}>
          <div className={cx('sidebar-logo')}>
            <img className={cx('logo')} src={images.logo} alt="logo"></img>
          </div>
          <h3 className={cx('social')}>Mạng xã hội</h3>
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
              <h3>TÌM HIỂU THÊM</h3>
            </div>
            <div className={cx('contents')}>
              <Link className={cx('content-item')}>Giới thiệu 2H&M</Link>
              <Link className={cx('content-item')}>Chính sách bảo mật</Link>
              <Link className={cx('content-item')}>Điều khoản sử dụng</Link>
            </div>
          </div>
          <div className={cx('static')}>
            <div className={cx('title')}>
              <h3>HỖ TRỢ</h3>
            </div>
            <div className={cx('contents')}>
              <Link className={cx('content-item')}>Chính sách đổi trả</Link>
              <Link className={cx('content-item')}>Chính sách bảo hành</Link>
              <Link className={cx('content-item')}>Chính sách vận chuyển</Link>
              <Link className={cx('content-item')}>Phương thức thanh toán và xuất HĐ</Link>
            </div>
          </div>
          <div className={cx('static')}>
            <div className={cx('title')}>
              <h3>Liên hệ</h3>
            </div>
            <div className={cx('contents')}>
              <Link className={cx('content-item')}>
                <FontAwesomeIcon icon={faPhone} className={cx('icon')}></FontAwesomeIcon>123-456-7890
              </Link>
              <Link className={cx('content-item')}>
                <FontAwesomeIcon icon={faEnvelope} className={cx('icon')}></FontAwesomeIcon>abc@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
