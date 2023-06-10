import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import BookItem from '~/components/BookItem';
import axios from 'axios';
import Button from '~/components/Button/Button';
import config from '~/config';
import styles from './AllBook.module.scss';

const cx = classNames.bind(styles);

function AllBook() {
  const location = useLocation();
  const { id, search } = queryString.parse(location.search);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [descPrice, setDescPrice] = useState(2);
  const idCategory = id || '';
  const searchValue = search || '';
  const [activeButton, setActiveButton] = useState(1);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem('page');
    return storedPage ? parseInt(storedPage) : 1;
  });
  let [totalPage, setTotalPage] = useState();

  console.log(descPrice);

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  const handlePageClick = (buttonId) => {
    setActiveButton(buttonId);
    setPage(buttonId);
    window.location.reload();
  };

  const handleCategoryClick = (buttonId) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('id', buttonId);
    const newSearch = urlParams.toString();
    const newUrl = `${window.location.pathname}?${newSearch}`;
    window.location.href = newUrl;
  };

  useEffect(() => {
    setActiveButton(page);
    localStorage.setItem('page', page);
  }, [page]);

  useEffect(() => {
    const fetchApiBooks = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/book?limit=100&category=${idCategory}&page=${page}&search=${searchValue}&DESC_Price=${descPrice}`,
      );
      const booksData = await response.data.books;
      setBooks(booksData);
      setTotalPage(response.data.totalPage);
    };

    const fetchApiCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/category');
      const categoriesData = await response.data;
      setCategories(categoriesData);
    };
    fetchApiCategories();
    fetchApiBooks();
  }, [idCategory, totalPage, page, searchValue, descPrice]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filters')}>
        <span className={cx('label')}>Sắp xếp theo</span>
        <div className={cx('select-input')}>
          <span className={cx('select-input__label')}>Giá</span>
          <FontAwesomeIcon className={cx('select-input__icon')} icon={faChevronDown}></FontAwesomeIcon>
          <ul className={cx('select-input__list')}>
            <li className={cx('select-input__item')}>
              <Link onClick={() => setDescPrice(2)} href="" className={cx('select-input__link')}>
                Giá: Thấp đến cao
              </Link>
            </li>
            <li className={cx('select-input__item')}>
              <Link onClick={() => setDescPrice(1)} href="" className={cx('select-input__link')}>
                Giá: Cao đến thấp
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx('select-input')}>
          <span className={cx('select-input__label')}>Thể loại</span>
          <FontAwesomeIcon className={cx('select-input__icon')} icon={faChevronDown}></FontAwesomeIcon>
          <ul className={cx('select-input__list')}>
            {categories.map((category) => {
              return (
                <li className={cx('select-input__item')} key={category.id}>
                  <Link
                    to={`${config.routes.allbook}?id=${category.id}&search=${encodeURIComponent(searchValue)}`}
                    onClick={() => handleCategoryClick(category.id)}
                    className={cx('select-input__link')}
                  >
                    {category.Name}
                  </Link>
                </li>
              );
            })}
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
                onClick={() => handlePageClick(page)}
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
