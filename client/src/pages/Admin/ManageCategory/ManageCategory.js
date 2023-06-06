import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Flip, ToastContainer, toast } from 'react-toastify';

import Image from '~/components/Image';
import Button from '~/components/Button';
import InputForm from '~/components/InputForm';
import Popup from '~/components/Popup';
import styles from './ManageCategory.module.scss';
import { faBookmark, faImage } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function ManageCategory() {
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [payload, setPayload] = useState({
    name: '',
    image: '',
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

  useEffect(() => {
    const fetchApiCategory = async () => {
      const response = await axios.get(`http://localhost:5000/api/category`, {
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      const categoriesData = await response.data;
      setListCategory(categoriesData);
    };
    fetchApiCategory();
  }, []);

  const handleAddCategory = async (name, image) => {
    await axios
      .post(
        'http://localhost:5000/api/category/add',
        {
          Name: name,
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

  const handleUpdateCategory = async (name, image) => {
    axios
      .put(
        `http://localhost:5000/api/category/update/${selectedCategoryId}`,
        {
          Name: name,
          Image: image,
        },
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwtFromCookie}`,
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

  const handleDeleteCategory = async () => {
    await axios
      .delete(`http://localhost:5000/api/category/delete/${selectedCategoryId}`)
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

  const modalAnimation1 = useSpring({
    opacity: isModalOpen1 ? 1 : 0,
    transform: isModalOpen1 ? 'translateY(0)' : 'translateY(-100%)',
  });
  const modalAnimation2 = useSpring({
    opacity: isModalOpen2 ? 1 : 0,
    transform: isModalOpen2 ? 'translateY(0)' : 'translateY(-100%)',
  });

  const openModal1 = (categoryId, categoryName, imgUrl) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen1(true);
    setPayload((prevState) => ({
      ...prevState,
      name: categoryName,
      image: imgUrl,
    }));
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
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
      <div className={cx('btn')}>
        <Button onClick={() => openModal2()} blue leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}>
          Thêm thể loại
        </Button>
      </div>

      <Popup isOpen={isModalOpen2} onRequestClose={() => closeModal2()} width={'450px'} height={'450px'}>
        <animated.div style={modalAnimation2}>
          <h2>Thêm nhân viên</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Tên thể loại</div>
            <InputForm
              placeholder={listCategory.Name}
              type="text"
              value={payload.name}
              setValue={setPayload}
              name={'name'}
              className={cx('input')}
              leftIcon={faBookmark}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>URL của ảnh</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.image}
              setValue={setPayload}
              name={'image'}
              className={cx('input')}
              leftIcon={faImage}
            />
          </div>
          <div className={cx('options')}>
            <Button onClick={() => handleAddCategory(payload.name, payload.image)} outline>
              Xác nhận
            </Button>
          </div>
        </animated.div>
      </Popup>

      <div className={cx('category-list')}>
        {listCategory &&
          listCategory.map((category) => {
            return (
              <div
                className={cx('category')}
                onClick={() => openModal1(category.id, category.Name, category.Image)}
                key={category.id}
              >
                <Image src={category.Image} alt="category" className={cx('image')} />
                <span className={cx('name')}>{category.Name}</span>
              </div>
            );
          })}
      </div>

      <Popup isOpen={isModalOpen1} onRequestClose={() => closeModal1()} width={'450px'} height={'450px'}>
        <animated.div style={modalAnimation1}>
          <h2>Thông tin thể loại</h2>
          <div className={cx('input-field')}>
            <div className={cx('header')}>Tên thể loại</div>
            <InputForm
              placeholder={listCategory.Name}
              type="text"
              value={payload.name}
              setValue={setPayload}
              name={'name'}
              className={cx('input')}
              leftIcon={faBookmark}
            />
          </div>
          <div className={cx('input-field')}>
            <div className={cx('header')}>URL của ảnh</div>
            <InputForm
              placeholder=""
              type="text"
              value={payload.image}
              setValue={setPayload}
              name={'image'}
              className={cx('input')}
              leftIcon={faImage}
            />
          </div>

          <div className={cx('options')}>
            <Button onClick={() => handleDeleteCategory()} primary>
              Xóa thể loại
            </Button>
            <Button onClick={() => handleUpdateCategory(payload.name, payload.image)} outline>
              Thay đổi thông tin thể loại
            </Button>
          </div>
        </animated.div>
      </Popup>
    </div>
  );
}

export default ManageCategory;
