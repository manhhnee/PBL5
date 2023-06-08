import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './MessengerPopup.scss';
import Chatbot from './Chatbot';

const cx = classNames.bind(styles);

const MessengerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const minimizePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={cx(`messenger-popup`, `${isOpen ? 'hide' : ''}`)} onClick={togglePopup}>
        {/* Nội dung của toggle */}
      </div>
      <div className={cx('popup-content', `${isOpen ? 'show-popup' : ''}`)}>
        <div className={cx('toggle-button')} onClick={minimizePopup}>
          -
        </div>
        <div className={cx('chatbot-container')}>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default MessengerPopup;
