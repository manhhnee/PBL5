import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SlideShow.module.scss';
import { SlideData } from './SlideData';

const cx = classNames.bind(styles);

function SlideShow({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);

  const resetTimeout = () => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
  };
  const length = children.length;

  React.useEffect(() => {
    resetTimeout();
    ref.current = setTimeout(
      () => setCurrentSlide((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1)),
      3000,
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide, length]);

  if (!Array.isArray(children) || children.length <= 0) {
    return null;
  }

  return (
    <section className={cx('slider')}>
      <div className={cx('slideShowSlider')}>
        {SlideData.map((slide, index) => {
          return (
            <div className={index === currentSlide ? cx('slide', 'active') : cx('slide')} key={index}>
              {index === currentSlide && <img src={slide.image} alt="slider" className={cx('image')} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

SlideShow.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default SlideShow;
