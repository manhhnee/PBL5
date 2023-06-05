import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

const Toast = ({ title, message, type, duration }) => {
  useEffect(() => {
    const autoRemoveId = setTimeout(() => {
      document.getElementById('toast-container').removeChild(document.getElementById('toast'));
    }, duration + 1000);

    return () => clearTimeout(autoRemoveId);
  }, [duration]);

  const handleToastClose = () => {
    document.getElementById('toast-container').removeChild(document.getElementById('toast'));
  };

  const icons = {
    success: 'fa-solid fa-circle-check',
    warning: 'fa-solid fa-circle-exclamation',
    error: 'fa-solid fa-circle-exclamation',
  };
  const icon = icons[type];
  const delay = (duration / 1000).toFixed(2);

  return (
    <div
      className={cx('toast', `toast--${type}`)}
      style={{ animation: `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards` }}
      id="toast"
    >
      <div className={cx('toast__icon')}>
        <i className={icon}></i>
      </div>
      <div className={cx('toast__body')}>
        <h3 className={cx('toast__title')}>{title}</h3>
        <p className={cx('toast__msg')}>{message}</p>
      </div>
      <div className={cx('toast__close')} onClick={handleToastClose}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

Toast.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
  duration: PropTypes.number.isRequired,
};

export default Toast;
