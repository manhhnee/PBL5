import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import io from 'socket.io-client';

import styles from './Chatbot.scss';

const cx = classNames.bind(styles);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('getId', (data) => {});

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setShowSuggestions(true);
    });

    socketRef.current.emit('message', { text: 'Bắt đầu' });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        sender: 'user',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');

      socketRef.current.emit('message', newMessage);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  return (
    <div className={cx('chatbot')}>
      <div className={cx('chat-wrapper')}>
        <div className={cx('chat-messages')}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={cx('message', ` ${message.sender === 'user' ? 'user-message' : 'chatbot-message'}`)}
            >
              {message.text}
            </div>
          ))}
          {showSuggestions &&
            messages.length > 0 &&
            messages[messages.length - 1].suggestions &&
            messages[messages.length - 1].suggestions.length > 0 && (
              <div className={cx('suggestions')}>
                {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className={cx('message', ' suggestion-button')}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
        </div>
        <div className={cx('chat-input')}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
