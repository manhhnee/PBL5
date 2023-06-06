import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faBook, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flip, ToastContainer, toast } from 'react-toastify';

import Button from '~/components/Button/Button';
import Popup from '~/components/Popup/Popup';
import InputForm from '~/components/InputForm/InputForm';
import CustomSelect from '~/components/CustomSelect';
import styles from './ManageBook.module.scss';

const cx = classNames.bind(styles);

function ManageBook() {
  const [books, setBooks] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [image, setImage] = useState([]);
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
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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
      const response = await axios.get('http://localhost:5000/api/book?limit=10000');
      setBooks(response.data.books);
      setFilteredBooks(response.data.books);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchApiDetailBook = async (id) => {
    try {
      setIsModalOpen1(true);
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
      toast.error(e);
    }
  };

  const fetchApiCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/category');
    const categoriesData = await response.data;
    setCategories(categoriesData);
  };

  const handleAddBook = async (idCategory, name, price, author, description, date, publisher, image) => {
    await axios
      .post(
        'http://localhost:5000/api/book/add',
        {
          id_Category: idCategory,
          Name: name,
          Price: price,
          Author: author,
          Description: description,
          Publication_Date: date,
          Publisher: publisher,
          Image: image,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleUpdateBook = async (id, idCategory, name, price, author, description, date, publisher, image) => {
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
          Image: image,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  const handleDeleteBook = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/book/delete/${id}`, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwtFromCookie()}`,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getBooks();
    fetchApiCategories();
  }, []);

  useEffect(() => {
    const result = books.filter((book) => {
      return book.Name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredBooks(result);
  }, [search, books]);
  const modalAnimation1 = useSpring({
    opacity: isModalOpen1 ? 1 : 0,
  });
  const modalAnimation2 = useSpring({
    opacity: isModalOpen2 ? 1 : 0,
  });

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
    setPayload({});
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
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
  ];

  const handleRowClick = (row) => {
    const bookId = row.id;
    fetchApiDetailBook(bookId);
    setBookId(bookId);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
    setAvatar(e.target.files[0]);
  };

  return (
    <div className={cx('wrapper')}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <DataTable
        title="Danh sách truyện"
        columns={columns}
        data={filteredBooks}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pointerOnHover
        highlightOnHover
        pagination
        className={cx('fixed-header')}
        subHeader
        subHeaderComponent={
          <div className={cx('wrapper-header')}>
            <Button onClick={openModal2} leftIcon={<FontAwesomeIcon icon={faPlus} />} blue>
              Thêm sách
            </Button>
            <input
              type="text"
              placeholder="Tìm kiếm sách ở đây"
              className={cx('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
        }
        onRowClicked={(row) => {
          handleRowClick(row);
        }}
      />

      <Popup isOpen={isModalOpen1} onRequestClose={() => closeModal1()} width={'700px'} height={'700px'}>
        <animated.div style={modalAnimation1}>
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
          <div className={cx('header')}>Mô tả</div>
          <div className={cx('input-field')}>
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
          <div className={cx('header')}>Chọn thể loại</div>
          <div className={cx('input-field')}>
            <CustomSelect data={categories} setId={setSelectedCategoryId}></CustomSelect>
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
              Thay đổi thông tin
            </Button>
            <Button onClick={() => handleDeleteBook(bookId)} primary>
              Xóa
            </Button>
          </div>
        </animated.div>
      </Popup>
      <Popup isOpen={isModalOpen2} onRequestClose={() => closeModal2()} width={'700px'} height={'700px'}>
        <animated.div style={modalAnimation2}>
          <h2>Thông tin sách</h2>
          <div className={cx('header')}>Tên sách</div>
          <div className={cx('input-field')}>
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
          <div className={cx('header')}>Tác giả</div>
          <div className={cx('input-field')}>
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
          <div className={cx('header')}>Nhà sản xuất</div>
          <div className={cx('input-field')}>
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
          <div className={cx('header')}>Giá</div>
          <div className={cx('input-field')}>
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
          <div className={cx('header')}>Mô tả</div>
          <div className={cx('input-field')}>
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
          <div className={cx('header')}>Chọn thể loại</div>
          <div className={cx('input-field')}>
            <CustomSelect data={categories} setId={setSelectedCategoryId}></CustomSelect>
          </div>
          <div className={cx('header')}>Ảnh của sách</div>
          <div className={cx('input-field')}>
            <div className={cx('upload-field')}>
              {avatar && <img src={image} className={cx('image')} alt="Avatar" />}
              <label htmlFor="file-upload" className={cx('upload-btn')}>
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <input id="file-upload" type="file" onChange={handleImgChange}></input>
              </label>
            </div>
          </div>
          <div className={cx('options')}>
            <Button
              onClick={() =>
                handleAddBook(
                  selectedCategoryId,
                  payload.name,
                  payload.price,
                  payload.author,
                  payload.description,
                  new Date().toString(),
                  payload.publisher,
                  avatar,
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
