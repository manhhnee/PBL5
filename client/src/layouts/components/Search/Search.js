import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import BookItemSearch from '~/components/BookItemSearch';
import axios from 'axios';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const response = await axios.get(`https://pbl5-server-shpk.onrender.com/api/book?search=${searchValue}&limit=5`);
      const results = await response.data;
      setSearchResult(results.books);
      setLoading(false);
    };

    fetchApi();
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      window.location.href = `/allbook?search=${encodeURIComponent(searchValue)}`;
    }
  };

  const inputRef = useRef();

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Book</h4>
              {searchResult &&
                searchResult.map((result) => {
                  return (
                    <BookItemSearch
                      data={result}
                      key={result.id}
                      to={`/bookdetail?id=${result.id}`}
                      onClick={() => window.location.replace()}
                    />
                  );
                })}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search Book "
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

          <button className={cx('search-btn')} onClick={handleSearch} onMouseDown={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
