import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { faHouse, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title={'Home'} icon={faHouse} activeIcon={faHouseChimney}></MenuItem>
      </Menu>
    </aside>
  );
}

export default Sidebar;
