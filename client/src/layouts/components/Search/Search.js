import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const inputRef = useRef();
  return (
    <div>
      <HeadlessTippy>
        <div className={cx('search')}>
          <input ref={inputRef} placeholder="Tìm kiếm sản phẩm mong muốn..." spellCheck={false} />
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
