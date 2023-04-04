import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './CrossBar.module.scss';
import CategoryItem from '~/components/CategoryItem';

const cx = classNames.bind(styles);

function CrossBar({ items = [], icon, title }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')} tabIndex="-1">
        <div className={cx('title-field')}>
          <FontAwesomeIcon className={cx('icon-title')} icon={icon}></FontAwesomeIcon>
          {title}
        </div>
        <div className={cx('content')}>
          <span className={cx('icon')}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </span>
          {items.map((item) => {
            return <CategoryItem key={item.id} data={item}></CategoryItem>;
          })}
          <span className={cx('icon')}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </div>
  );
}

CrossBar.propTypes = {
  items: PropTypes.array.isRequired,
  icon: PropTypes.object,
  title: PropTypes.string,
};

export default CrossBar;
