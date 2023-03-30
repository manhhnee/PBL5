import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function InputForm({ placeholder, leftIcon, type, value, setValue, name, className }) {
  let classes = cx('wrapper', { [className]: className });
  return (
    <div className={classes}>
      <div className={cx('icon')}>
        <FontAwesomeIcon icon={leftIcon}></FontAwesomeIcon>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
      />
    </div>
  );
}

export default InputForm;
