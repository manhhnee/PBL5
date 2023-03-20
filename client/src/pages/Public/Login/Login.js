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
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleSignupClick = () => setIsSignupMode(true);
  const handleSigninClick = () => setIsSignupMode(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName('');
    setPassword('');
    console.log('username:', userName);
    console.log('password:', password);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container', `${isSignupMode ? 'sign-up-mode' : ''}`)}>
        <div className={cx('form-container')}>
          <div className={cx('signin-signup')}>
            <form action={handleSubmit} className={cx('sign-in-form')}>
              <h2 className={cx('title')}>Sign in</h2>
              <div className={cx('input-field')}>
                <div className={cx('icon')}>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <input type="text" placeholder="Username" />
              </div>
              <div className={cx('input-field')}>
                <div className={cx('icon')}>
                  <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </div>

                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className={cx('btn')} />
            </form>
            <form action="#" className={cx('sign-up-form')}>
              <h2 className={cx('title')}>Sign up</h2>
              <div className={cx('input-field')}>
                <div className={cx('icon')}>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <input type="text" placeholder="Username" />
              </div>
              <div className={cx('input-field')}>
                <div className={cx('icon')}>
                  <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </div>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className={cx('btn')} />
            </form>
          </div>
        </div>
        <div className={cx('panels-container')}>
          <div className={cx('panel', 'left-panel')}>
            <div className={cx('content')}>
              <h3>PBL5: Đồ án công nghệ phần mềm</h3>
              <p>Thành viên nhóm: Nguyễn Đức Mạnh, Trần Anh Hào, Hồ Thanh Hưng</p>
              <button className={cx('btn', 'transparent')} onClick={handleSignupClick}>
                Đăng kí
              </button>
            </div>
            <img className={cx('image')} src={images.log} alt="logo-log"></img>
          </div>
          <div className={cx('panel', 'right-panel')}>
            <div className={cx('content')}>
              <h3>1 điều về nhóm</h3>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
              <button className={cx('btn', 'transparent')} onClick={handleSigninClick}>
                Đăng nhập
              </button>
            </div>
            <img className={cx('image')} src={images.register} alt="logo-log"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
