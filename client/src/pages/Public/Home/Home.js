import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import CrossBar from '~/components/CrossBar';
import BookItem from '~/components/BookItem';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import * as BookService from '~/services/bookServices';
import config from '~/config';
import axios from 'axios';

const cx = classNames.bind(styles);

function Home() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const choiceItems = [
    {
      id: 1,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Best Seller',
    },
    {
      id: 2,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'New Release',
    },
    {
      id: 3,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Comming Soon',
    },
    {
      id: 4,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Sales Off',
    },
    {
      id: 5,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Voucher',
    },
    {
      id: 6,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Voucher',
    },
    {
      id: 7,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Voucher',
    },
    {
      id: 8,
      Image: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      Name: 'Voucher',
    },
  ];

  useEffect(() => {
    const fetchApiBooks = async () => {
      const response = await BookService.showBook();
      setBooks(response);
    };
    const fetchAPICategories = async () => {
      const response = await axios.get('http://localhost:5000/api/category');
      setCategories(response.data);
    };

    fetchAPICategories();
    fetchApiBooks();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <CrossBar
        key={choiceItems.id}
        items={choiceItems}
        icon={faHeart}
        title="2H&M luôn hân hạnh phục vụ quý khách. Khách hàng có thể yên tâm về chất lượng sản phẩm. Hơn 1000 cuốn sách cho quý khách có thể lựa chọn."
      ></CrossBar>

      <CrossBar items={categories} icon={faBookmark} title="Thể loại"></CrossBar>
      <div className={cx('slider')}>
        <Image src={images.slide1} alt="Slide1"></Image>
      </div>
      <div className={cx('container')}>
        <div className={cx('title-field')}>
          <FontAwesomeIcon className={cx('icon')} icon={faBook}></FontAwesomeIcon>
          <span className={cx('title')}>Mới nhất</span>
        </div>
        <div className={cx('book-list')}>
          <BookItem key={books.id} items={books} />
        </div>
        <div className={cx('button')}>
          <Button outline to={config.routes.allbook}>
            Xem thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
