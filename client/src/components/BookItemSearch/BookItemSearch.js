import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BookItemSearch.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BookItemSearch({ data, to, onClick }) {
  return (
    <Link className={cx('wrapper')} to={to} onClick={onClick}>
      <img className={cx('avatar')} src={data.Image} alt="Book" />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.Name}</span>
        </h4>
        <span className={cx('author')}>{data.Author}</span>
      </div>
    </Link>
  );
}

BookItemSearch.protoTypes = {
  data: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BookItemSearch;
