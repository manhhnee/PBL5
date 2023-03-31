import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import styles from './HeaderAndFooter.module.scss';

const cx = classNames.bind(styles);

function HeaderAndFooter({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>{children}</div>
      <Footer />
    </div>
  );
}

HeaderAndFooter.protoTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderAndFooter;
