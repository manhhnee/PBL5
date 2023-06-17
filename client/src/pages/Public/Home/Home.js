import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import MessengerPopup from '~/components/Chat/MessengerPopup';

import styles from './Home.module.scss';
import CrossBar from '~/components/CrossBar';
import BookItem from '~/components/BookItem';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import axios from 'axios';
import config from '~/config';

const cx = classNames.bind(styles);

function Home() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchApiBooks = async () => {
      const response = await axios.get('https://pbl5-server-shpk.onrender.com/api/book');
      setBooks(response.data.books);
    };
    const fetchAPICategories = async () => {
      const response = await axios.get('https://pbl5-server-shpk.onrender.com/api/category');
      setCategories(response.data);
    };

    fetchAPICategories();
    fetchApiBooks();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <CrossBar items={categories} icon={faBookmark} title="Thể loại"></CrossBar>
      <div className={cx('slider')}>
        <Image src={images.slide1} alt="Slide1"></Image>
      </div>
      <div className={cx('container')}>
        <div className={cx('title-field')}>
          <FontAwesomeIcon className={cx('icon')} icon={faBook}></FontAwesomeIcon>
          <span className={cx('title')}>Phổ biến</span>
        </div>
        <div className={cx('book-list')}>
          <BookItem key={books.id} items={books} />
        </div>
        <div className={cx('button')}>
          <Button to={config.routes.allbook} outline>
            Xem thêm
          </Button>
        </div>
      </div>
      <MessengerPopup />
    </div>
  );
}

export default Home;
