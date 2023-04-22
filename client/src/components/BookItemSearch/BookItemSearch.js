import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BookItemSearch.module.scss';

const cx = classNames.bind(styles);

function BookItemSearch({ data }) {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('avatar')} src={data.Image} alt="Book" />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.Name}</span>
        </h4>
        <span className={cx('author')}>{data.Author}</span>
      </div>
    </div>
  );
}

export default BookItemSearch;
