import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import { SlideData } from '~/layouts/components/SlideShow';
import SlideShow from '~/layouts/components/SlideShow';
import CrossBar from '~/layouts/components/CrossBar';
import BookItem from '~/components/BookItem';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <SlideShow children={SlideData} />
      <CrossBar />
      <div className={cx('container')}>
        <div className={cx('books')}>
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
        </div>
        <div className={cx('button')}>
          <Button outline>Xem thêm</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
