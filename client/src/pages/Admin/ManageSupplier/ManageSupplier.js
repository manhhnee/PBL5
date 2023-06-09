import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';

import Button from '~/components/Button/Button';
import Popup from '~/components/Popup/Popup';
import InputForm from '~/components/InputForm/InputForm';
import AutoComplete from '~/components/AutoComplete';
import styles from './ManageSupplier.module.scss';

const cx = classNames.bind(styles);

function ManageSupplier() {
  const [autocompleteInputValue, setAutocompleteInputValue] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [supplierID, setSupplierID] = useState();
  const [payload, setPayload] = useState({
    name: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'translateY(0)' : 'translateY(-100%)',
  });
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
  const getSupplier = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/supplier/show');
      setSuppliers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDetailSupplier = async (id) => {
    try {
      setIsModalOpen(true);
      const response = await axios.get(`http://localhost:5000/api/supplier/detail/${id}`);

      const supplier = response.data;
      setPayload((prevPayload) => ({
        ...prevPayload,
        name: supplier.Name,
        address: supplier.Address,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateSupplier = async (id, name, address) => {
    await axios
      .put(
        `http://localhost:5000/api/supplier/update/${id}`,
        {
          Name: name,
          Address: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwtFromCookie()}`,
          },
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
  const handleDeleteSupplier = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/book/delete/${id}`, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwtFromCookie()}`,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((e) => {
        alert(e);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getSupplier();
  }, []);

  const columns = [
    {
      name: 'Tên nhà xuất bản',
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: 'Địa chỉ',
      selector: (row) => row.Address,
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <Button onClick={() => handleDeleteSupplier(row.id)} className={cx('btn')} primary>
          Xóa
        </Button>
      ),
    },
    {
      name: 'Hành động',
      cell: (row) => (
        <Button
          onClick={() => {
            getDetailSupplier(row.id);
            setSupplierID(row.id);
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
      <div className={cx('wrapper')}>
        <DataTable
          title="Danh sách truyện"
          columns={columns}
          data={suppliers}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          pointerOnHover
          highlightOnHover
          className={cx('fixed-header')}
        />
        <Popup isOpen={isModalOpen} onRequestClose={() => closeModal()} width={'700px'} height={'500px'}>
          <animated.div style={modalAnimation}>
            <h2>Thông tin sách</h2>
            <div className={cx('input-field')}>
              <div className={cx('header')}>Tên nhà xuất bản</div>
              <InputForm
                placeholder="Enter name author..."
                type="text"
                value={payload.name}
                setValue={setPayload}
                name={'name'}
                className={cx('input')}
                leftIcon={faBook}
              />
            </div>
            <div className={cx('input-field')}>
              <div className={cx('header')}>Địa chỉ nhà xuất bản</div>
              <AutoComplete setParentInputValue={setAutocompleteInputValue} />
            </div>

            <div className={cx('options')}>
              <Button onClick={() => handleUpdateSupplier(supplierID, payload.name, autocompleteInputValue)} outline>
                Xác nhận
              </Button>
            </div>
          </animated.div>
        </Popup>
      </div>
    </div>
  );
}

export default ManageSupplier;
