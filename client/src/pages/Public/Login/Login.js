import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import images from '~/assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName('');
    setPassword('');
    console.log('username:', userName);
    console.log('password:', password);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <img src={images.log} className={cx('bg-img')} alt="background" />
        <div className={cx('form-container')}>
          <form onSubmit={handleSubmit} action="#" className={cx('sign-in-form')}>
            <h2 className={cx('title')}>Sign In</h2>
            <div className={cx('input-field')}>
              <FontAwesomeIcon icon={faUser} className={cx('icon')} />
              <input
                value={userName}
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className={cx('input-field')}>
              <FontAwesomeIcon icon={faLock} className={cx('icon')} />
              <input
                value={password}
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className={cx('btn-submit')} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
