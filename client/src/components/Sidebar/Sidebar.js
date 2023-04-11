import classNames from 'classnames/bind';
import { faBagShopping, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import config from '~/config';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Button
        to={config.routes.home}
        leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}
        className={cx('btn-home')}
      >
        Home
      </Button>
      <div className={cx('line')}></div>
      <div className={cx('container-left')}>
        <div className={cx('provider')}>
          <div className={cx('header')}>PROVIDERS</div>
          <div className={cx('content')}>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Kho
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Vận chuyển
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Cung cấp
            </Button>
          </div>
        </div>
        <div className={cx('line')}></div>
        <div className={cx('order')}>
          <div className={cx('header')}>orders</div>
          <div className={cx('content')}>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Kho
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Vận chuyển
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Cung cấp
            </Button>
          </div>
        </div>
        <div className={cx('line')}></div>
        <div className={cx('account')}>
          <div className={cx('header')}>account</div>
          <div className={cx('content')}>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Kho
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Vận chuyển
            </Button>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>}>
              Cung cấp
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
