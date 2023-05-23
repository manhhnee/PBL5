import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './AllBook.module.scss';
import BookItem from '~/components/BookItem';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function AllBook() {
  const [books, setBooks] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem('page');
    return storedPage ? parseInt(storedPage) : 1;
  });
  let totalPage = 41;
  if (totalPage % 10 === 0) {
    totalPage = totalPage / 10;
  } else {
    totalPage = totalPage / 10 + 1;
  }
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setPage(buttonId);
  };

  useEffect(() => {
    setActiveButton(page);
    localStorage.setItem('page', page);
  }, [page]);

  useEffect(() => {
    const fetchApiBooks = async () => {
      const response = await axios.get(`http://localhost:5000/api/book?limit=5`);
      const booksData = await response.data;
      setBooks(booksData);
    };

    fetchApiBooks();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('filters')}>
        <span className={cx('label')}>Sắp xếp theo</span>
        <div className={cx('select-input')}>
          <span className={cx('select-input__label')}>Giá</span>
          <FontAwesomeIcon className={cx('select-input__icon')} icon={faChevronDown}></FontAwesomeIcon>
          <ul className={cx('select-input__list')}>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Giá: Thấp đến cao
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Giá: Cao đến thấp
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx('select-input')}>
          <span className={cx('select-input__label')}>Thể loại</span>
          <FontAwesomeIcon className={cx('select-input__icon')} icon={faChevronDown}></FontAwesomeIcon>
          <ul className={cx('select-input__list')}>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Hành động
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Giải trí
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Lãng mạn
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Kinh dị
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Văn học
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link href="" className={cx('select-input__link')}>
                Trinh thám
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx('book-list')}>
        <BookItem key={books.id} items={books} />
        <ul className={cx('pagination')}>
          {pages.map((page, index) => {
            return (
              <Button
                className={cx('pagination-item', `${activeButton === page ? 'active' : ''}`)}
                onClick={() => handleButtonClick(page)}
                key={index}
              >
                {page}
              </Button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AllBook;
