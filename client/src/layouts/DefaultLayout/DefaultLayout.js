import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import images from '~/assets/images';
import { useRef } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const ref = useRef(null);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (ref.current != null) {
      ref.current.style.right = 100 + position * 1.5 + 'px';
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('img-field')}>
        <img src={images.background} alt="Background" className={cx('background-img')} />
        <img ref={ref} src={images.logo2} alt="logo" className={cx('img-text')} />
      </div>
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
