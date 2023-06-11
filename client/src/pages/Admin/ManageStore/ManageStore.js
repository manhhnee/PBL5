import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faHashtag, faMoneyBill, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flip, ToastContainer, toast } from 'react-toastify';

import Button from '~/components/Button/Button';
import Popup from '~/components/Popup/Popup';
import InputForm from '~/components/InputForm/InputForm';
import CustomSelect from '~/components/CustomSelect';
import styles from './ManageStore.module.scss';

const cx = classNames.bind(styles);

function ManageStore() {
  const [books, setBooks] = useState([]);
  const [bookSuppliers, setBookSuppliers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectBookId, setSelectBookId] = useState('1');
  const [selectsupplierID, setSelectSupplierID] = useState('1');
  const [search, setSearch] = useState('');
  const [filteredBookSuppliers, setFilteredBookSuppliers] = useState([]);
  const [payload, setPayload] = useState({
    importPrice: '',
    price: '',
    amount: '',
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

  const fetchApiBook = async () => {
    const response = await axios.get('http://localhost:5000/api/book?limit=10000');
    setBooks(response.data.books);
  };

  const fetchApiSupplier = async () => {
    const response = await axios.get('http://localhost:5000/api/supplier/show');
    setSuppliers(response.data);
  };

  const fetchApiBookSupplier = async () => {
    const response = await axios.get('http://localhost:5000/api/bookSupplier/show', {
      headers: {
        Authorization: `Bearer ${getJwtFromCookie()}`,
      },
    });
    setBookSuppliers(response.data);
    setFilteredBookSuppliers(response.data);
  };

  const handleAddBookSupplier = async (importPrice, amount) => {
    console.log(selectBookId, selectsupplierID, importPrice, amount);
    await axios
      .post(
        'http://localhost:5000/api/bookSupplier/add',
        {
          id_Book: selectBookId,
          id_Supplier: selectsupplierID,
          Import_Price: importPrice,
          Amount: amount,
        },
        {
          headers: {
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

  const handleDeleteBookSupplier = (id) => {
    axios
      .delete(`http://localhost:5000/api/bookSupplier/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      })
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

  useEffect(() => {
    const result = bookSuppliers.filter((book) => {
      return book.Name.toLowerCase().match(search.toLowerCase());
    });

    setFilteredBookSuppliers(result);
  }, [search, bookSuppliers]);

  useEffect(() => {
    fetchApiBookSupplier();
    fetchApiBook();
    fetchApiSupplier();
  }, []);

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
  });

  const openModal = () => {
    setIsModalOpen(true);
    setPayload({});
  };

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
      name: 'Giá nhập',
      selector: (row) => row.Import_Price,
    },
    {
      name: 'Giá bán',
      selector: (row) => row.Price,
      sortable: true,
    },
    {
      name: 'Số lượng trong kho',
      selector: (row) => row.Amount,
    },
    {
      name: 'Xóa nhà cung cấp sách',
      selector: (row) => (
        <Button
          onClick={() => {
            handleDeleteBookSupplier(row.id);
          }}
          primary
        >
          Xóa
        </Button>
      ),
    },
  ];

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
        data={filteredBookSuppliers}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pointerOnHover
        highlightOnHover
        pagination
        className={cx('fixed-header')}
        subHeader
        subHeaderComponent={
          <div className={cx('wrapper-header')}>
            <Button onClick={openModal} leftIcon={<FontAwesomeIcon icon={faPlus} />} blue>
              Thêm sách vào kho
            </Button>
            <input
              type="text"
              placeholder="Tìm kiếm nhà xuất bản sách ở đây"
              className={cx('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
        }
      />

      <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={'700px'} height={'640px'}>
        <animated.div style={modalAnimation}>
          <h2>Thông tin sách</h2>
          <div className={cx('header')}>Chọn sách</div>
          <div className={cx('input-field')}>
            <CustomSelect data={books} setId={setSelectBookId}></CustomSelect>
          </div>

          <div className={cx('header')}>Chọn nhà cung cấp</div>
          <div className={cx('input-field')}>
            <CustomSelect data={suppliers} setId={setSelectSupplierID}></CustomSelect>
          </div>
          <div className={cx('header')}>Giá bán</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Enter book price..."
              type="text"
              value={payload.importPrice}
              setValue={setPayload}
              name={'importPrice'}
              className={cx('input')}
              leftIcon={faMoneyBill}
            />
          </div>
          <div className={cx('header')}>Số lượng</div>
          <div className={cx('input-field')}>
            <InputForm
              placeholder="Enter book count..."
              type="text"
              value={payload.amount}
              setValue={setPayload}
              name={'amount'}
              className={cx('input')}
              leftIcon={faHashtag}
            />
          </div>

          <div className={cx('options')}>
            <Button
              onClick={() => {
                handleAddBookSupplier(payload.importPrice, payload.amount);
              }}
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

export default ManageStore;
