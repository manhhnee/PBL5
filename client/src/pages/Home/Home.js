import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import CrossBar from '~/layouts/components/CrossBar';
import BookItem from '~/components/BookItem';
import Button from '~/components/Button';
import { faBook, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Home() {
  const choiceItems = [
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Best Seller',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'New Release',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Best Seller',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Best Seller',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'Best Seller',
    },
  ];

  const typeItems = [
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
    },
  ];

  const bookItems = [
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
    {
      img: 'https://cdn0.fahasa.com/media/catalog/product/b/l/blt2.jpg',
      alt: 'Product',
      title: 'The God of Endings: A Novel',
      author: 'Jacqueline Holland',
    },
  ];
  return (
    <div className={cx('wrapper')}>
      <CrossBar
        items={choiceItems}
        icon={faHeart}
        title="2H&M luôn hân hạnh phục vụ quý khách. Khách hàng có thể yên tâm về chất lượng sản phẩm. Hơn 1000 cuốn sách cho quý khách có thể lựa chọn."
      ></CrossBar>
      <CrossBar items={typeItems} icon={faBookmark} title="Thể loại"></CrossBar>
      <div className={cx('slider')}>
        <Image src={images.slide1} alt="Slide1"></Image>
      </div>
      <div className={cx('container')}>
        <div className={cx('title-field')}>
          <FontAwesomeIcon className={cx('icon')} icon={faBook}></FontAwesomeIcon>
          <span className={cx('title')}>Phổ biến</span>
        </div>
        <div className={cx('book-list')}>
          <BookItem items={bookItems} />
        </div>
        <div className={cx('button')}>
          <Button outline>Xem thêm</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
