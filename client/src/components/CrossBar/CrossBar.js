import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './CrossBar.module.scss';
import CategoryItem from '~/components/CategoryItem';

const cx = classNames.bind(styles);

function CrossBar({ items = [], icon, title }) {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={cx('next-arrow', className)} style={{ ...style }} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={cx('prev-arrow', className)} style={{ ...style }} onClick={onClick} />;
  }

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
      <div className={cx('content')}>
        <Slider {...settings}>
          {items.map((item) => {
            return (
              <div>
                <div className={cx('content')}>
                  <CategoryItem data={item}></CategoryItem>
                </div>
              </div>
            );
          })}
        </Slider>
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
