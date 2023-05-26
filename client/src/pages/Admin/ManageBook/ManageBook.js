import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

import Button from '~/components/Button/Button';
import styles from './ManageBook.module.scss';

const cx = classNames.bind(styles);

function ManageBook() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/book');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    {
      name: 'Tên truyện',
      selector: (row) => row.Name,
      styles: {
        header: {
          fontSize: '1.5rem',
        },
      },
    },
    {
      name: 'Thể loại',
      selector: (row) => row.id_Category,
    },
    {
      name: 'Tác giả',
      selector: (row) => row.Author,
    },
    {
      name: 'Giá bán',
      selector: (row) => row.Price,
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <Button onClick={() => alert(row.id)} className={cx('btn')} primary>
          Xóa
        </Button>
      ),
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <Button onClick={() => alert(row.id)} className={cx('btn')} blue>
          Sửa
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = books.filter((book) => {
      return book.Name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredBooks(result);
  }, [search, books]);
  return (
    <div className={cx('wrapper')}>
      <DataTable
        title="Danh sách truyện"
        columns={columns}
        data={filteredBooks}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        pointerOnHover
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Tìm kiếm sách ở đây"
            className={cx('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        }
      />
    </div>
  );
}

export default ManageBook;
