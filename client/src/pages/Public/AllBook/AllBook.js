import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './AllBook.module.scss';
import * as CategoryService from '~/services/categoryServices';
import BookItem from '~/components/BookItem';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AllBook() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchApiBooks = async () => {
      const response = await axios.get(`http://localhost:5000/api/book?limit=40`);
      const booksData = await response.data;
      setBooks(booksData);
    };

    const fetchAPICategories = async () => {
      const response = await CategoryService.showCategory();
      setCategories(response);
    };

    fetchAPICategories();
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
      </div>
    </div>
  );
}

export default AllBook;
