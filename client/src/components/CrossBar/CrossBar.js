import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import queryString from 'query-string';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CategoryItem from '~/components/CategoryItem';
import config from '~/config';
import styles from './CrossBar.module.scss';

const cx = classNames.bind(styles);

function CrossBar({ items = [], icon, title }) {
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={cx('next-arrow', className)} style={{ ...style }} onClick={onClick} />;
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={cx('prev-arrow', className)} style={{ ...style }} onClick={onClick} />;
  };

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title-field')}>
        <FontAwesomeIcon className={cx('icon-title')} icon={icon}></FontAwesomeIcon>
        <span>{title}</span>
      </div>
      <Link className={cx('content')}>
        <Slider {...settings}>
          {items.map((item, index) => {
            const query = queryString.stringify({ id: item.id });
            const url = `${config.routes.allbook}?${query}`;
            return (
              <div key={index}>
                <div className={cx('content')}>
                  <CategoryItem to={url} data={item}></CategoryItem>
                </div>
              </div>
            );
          })}
        </Slider>
      </Link>
    </div>
  );
}

CrossBar.propTypes = {
  items: PropTypes.array.isRequired,
  icon: PropTypes.object,
  title: PropTypes.string,
};

export default CrossBar;
