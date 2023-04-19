import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './Home.module.scss';
import CrossBar from '~/components/CrossBar';
import BookItem from '~/components/BookItem';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Home () {
  const choiceItems = [
    {
      id: 1,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Best Seller',
    },
    {
      id: 2,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'New Release',
    },
    {
      id: 3,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Comming Soon',
    },
    {
      id: 4,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Sales Off',
    },
    {
      id: 5,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Voucher',
    },
    {
      id: 6,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Voucher',
    },
    {
      id: 7,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Voucher',
    },
    {
      id: 8,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Voucher',
    },
  ];

  const typeItems = [
    {
      id: 1,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 2,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 3,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 4,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 5,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 6,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 7,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      id: 8,
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:5000/book/show');
      const booksData = response.data;

      // Loop through booksData and fetch images for each book
      const booksWithImages = await Promise.all(
        booksData.map(async (book) => {
          const imageResponse = await axios.get(`http://localhost:5000/image/show/${book.id}`);
          const imageData = imageResponse.data[0];

          // check if the image data is available or not
          var image;
          if (imageData && imageData.Image) {
            image = imageData.Image;
          } else {
            image = null;
          }

          // Combine book data and image data into a single object
          return {
            ...book,
            image,
          };
        }),
      );

      setBooks(booksWithImages);
    };

    fetchBooks();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <CrossBar
        key={choiceItems.id}
        items={choiceItems}
        icon={faHeart}
        title="2H&M luôn hân hạnh phục vụ quý khách. Khách hàng có thể yên tâm về chất lượng sản phẩm. Hơn 1000 cuốn sách cho quý khách có thể lựa chọn."
      ></CrossBar>

      <CrossBar key={typeItems.id} items={typeItems} icon={faBookmark} title="Thể loại"></CrossBar>
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
          <Button outline>Xem thêm</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
