import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon }) {
  return (
    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
      <span className={cx('icon')}>
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      </span>
      <span className={cx('active-icon')}>
        <FontAwesomeIcon icon={activeIcon}></FontAwesomeIcon>
      </span>
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
