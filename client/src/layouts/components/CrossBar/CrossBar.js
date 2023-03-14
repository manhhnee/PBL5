import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './CrossBar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CrossBar() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <FontAwesomeIcon icon={faFilter} className={cx('icon')} />
        <header className={cx('title')}>Danh mục sản phẩm</header>
      </div>
      <div className={cx('book-line')}></div>
      <div className={cx('container')}>
        <Link className={cx('book')}>
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/Luyen_Thi.jpg"
            alt="book-category"
            className={cx('book-img')}
          ></img>
          <div className={cx('book-title')}>Sách luyện thi</div>
        </Link>
        <Link className={cx('book')}>
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/Luyen_Thi.jpg"
            alt="book-category"
            className={cx('book-img')}
          ></img>
          <div className={cx('book-title')}>Sách luyện thi</div>
        </Link>
        <Link className={cx('book')}>
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/Luyen_Thi.jpg"
            alt="book-category"
            className={cx('book-img')}
          ></img>
          <div className={cx('book-title')}>
            Tâm linh <br /> luân hồi
          </div>
        </Link>
        <Link className={cx('book')}>
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/Luyen_Thi.jpg"
            alt="book-category"
            className={cx('book-img')}
          ></img>
          <div className={cx('book-title')}>Sách luyện thi</div>
        </Link>
      </div>
    </div>
  );
}

export default CrossBar;
