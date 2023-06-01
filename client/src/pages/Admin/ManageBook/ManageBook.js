import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';

import Button from '~/components/Button/Button';
import Popup from '~/components/Popup/Popup';
import InputForm from '~/components/InputForm/InputForm';
import styles from './ManageBook.module.scss';

const cx = classNames.bind(styles);

function ManageBook() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('1');
  const [bookId, setBookId] = useState();
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [payload, setPayload] = useState({
    name: '',
    category: '',
    author: '',
    publisher: '',
    price: '',
    description: '',
    id_Category: '',
    date: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getJwtFromCookie() {
    //lấy token được lưu trong cookie ra
    const name = 'token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/book');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getDetailBook = async (id) => {
    try {
      setIsModalOpen(true);
      const response = await axios.get(`http://localhost:5000/api/book/detail/${id}`);

      const { book } = response.data;
      setPayload((prevPayload) => ({
        ...prevPayload,
        name: book.Name,
        author: book.Author,
        description: book.Description,
        price: book.Price,
        category: book.category,
        idCategory: book.id_Category,
        publisher: book.Publisher,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const getCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/category');
    const categoriesData = await response.data;
    setCategories(categoriesData);
  };

  const handleUpdateBook = async (id, idCategory, name, price, author, description, date, publisher) => {
    await axios
      .put(
        `http://localhost:5000/api/book/update/${id}`,
        {
          id_Category: idCategory,
          Name: name,
          Price: price,
          Author: author,
          Description: description,
          Publication_Date: date,
          Publisher: publisher,
        },
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwtFromCookie}`,
        },
      )
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((e) => {
        alert(e);
      });
  };
  const handleDeleteBook = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/book/delete/${id}`, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwtFromCookie}`,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  useEffect(() => {
    const result = books.filter((book) => {
      return book.Name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredBooks(result);
  }, [search, books]);
  const modalAnimation2 = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'translateY(0)' : 'translateY(-100%)',
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      name: 'Tên truyện',
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: 'Thể loại',
      selector: (row) => row.category,
    },
    {
      name: 'Tác giả',
      selector: (row) => row.Author,
    },
    {
      name: 'Giá bán',
      selector: (row) => row.Price,
      sortable: true,
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <Button onClick={() => handleDeleteBook(row.id)} className={cx('btn')} primary>
          Xóa
        </Button>
      ),
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <Button
          onClick={() => {
            getDetailBook(row.id);
            setBookId(row.id);
          }}
          className={cx('btn')}
          blue
        >
          Sửa
        </Button>
      ),
    },
  ];

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
        className={cx('fixed-header')}
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
      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={'700px'} height={'700px'}>
        <animated.div style={modalAnimation2}>
          <h2>Thông tin sách</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Tên sách</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.name}
              setValue={setPayload}
              name={'name'}
              className={cx('input')}
              leftIcon={faBook}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Tác giả</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.author}
              setValue={setPayload}
              name={'author'}
              className={cx('input')}
              leftIcon={faImage}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Nhà sản xuất</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.publisher}
              setValue={setPayload}
              name={'publisher'}
              className={cx('input')}
              leftIcon={faImage}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Giá</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.price}
              setValue={setPayload}
              name={'price'}
              className={cx('input')}
              leftIcon={faImage}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Mô tả</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.description}
              setValue={setPayload}
              name={'description'}
              className={cx('input')}
              leftIcon={faImage}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Thể loại</div>
            <select
              value={selectedCategoryId}
              onChange={(e) => {
                setSelectedCategoryId(e.target.value);
              }}
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleUpdateBook(
                  bookId,
                  selectedCategoryId,
                  payload.name,
                  payload.price,
                  payload.author,
                  payload.description,
                  new Date().toString(),
                  payload.publisher,
                )
              }
              outline
            >
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageBook;
