import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import queryString from 'query-string';

import styles from './AllBook.module.scss';
import BookItem from '~/components/BookItem';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import config from '~/config';

const cx = classNames.bind(styles);

function AllBook() {
  const search = window.location.search;
  const { id } = queryString.parse(search);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idCategory, setIDCategory] = useState(id ? id : '');
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
  const handlePageClick = (buttonId) => {
    setActiveButton(buttonId);
    setPage(buttonId);
  };
  const handleCategoryClick = (buttonId) => {
    setIDCategory(buttonId);
    console.log(buttonId);
  };

  useEffect(() => {
    setActiveButton(page);
    localStorage.setItem('page', page);
  }, [page]);

  console.log(idCategory);

  useEffect(() => {
    const fetchApiBooks = async () => {
      const response = await axios.get(`http://localhost:5000/api/book?category=${idCategory}`);
      const booksData = await response.data;
      setBooks(booksData);
    };

    const fetchApiCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/category');
      const categoriesData = await response.data;
      setCategories(categoriesData);
    };
    fetchApiCategories();
    fetchApiBooks();
  }, [idCategory]);

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
            {categories.map((category) => {
              return (
                <li className={cx('select-input__item')} key={category.id}>
                  <Link
                    to={`${config.routes.allbook}?id=${idCategory}`}
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
