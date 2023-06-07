import classNames from 'classnames/bind';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import InputForm from '~/components/InputForm';
import styles from './Revenue.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Revenue() {
  const [payload, setPayload] = useState({
    fromDate: '',
    toDate: '',
  });

  const data = [
    { date: 'Ngày 1', price: 100 },
    { date: 'Ngày 2', price: 150 },
    { date: 'Ngày 3', price: 200 },
    { date: 'Ngày 4', price: 250 },
    { date: 'Ngày 5', price: 300 },
  ];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('revenue-field')}>
        <div className={cx('header1')}>Thống kê đơn hàng doanh số</div>
        <div className={cx('date-field')}>
          <div className={cx('date')}>
            <span className={cx('title')}>Chọn ngày</span>
            <InputForm
              type="date"
              name={'fromDate'}
              value={payload.fromDate}
              setValue={setPayload}
              className={cx('input')}
            ></InputForm>
          </div>
          <div className={cx('date')}>
            <span className={cx('title')}>Chọn ngày</span>
            <InputForm
              type="date"
              name={'toDate'}
              value={payload.toDate}
              setValue={setPayload}
              className={cx('input')}
            ></InputForm>
          </div>
        </div>
        <div className={cx('chart')}>
          <BarChart width={1220} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
      <div className={cx('revenue-field')}>
        <div className={cx('header1')}>Thống kê tổng quan trong một năm</div>
        <div className={cx('content')}>
          <div className={cx('Top10')}>
            <div className={cx('header')}>Top 10 san pham ban chay trong nam</div>
            <ul className={cx('products')}>
              <li className={cx('product-item')}>1. abc</li>
              <li className={cx('product-item')}>1. abc</li>
              <li className={cx('product-item')}>1. abc</li>
              <li className={cx('product-item')}>1. abc</li>
            </ul>
          </div>
          <div className={cx('revenue')}>
            <div className={cx('sold-product')}>
              <div className={cx('header')}>Tong so san pham da ban</div>
              <div className={cx('number')}>1000</div>
            </div>
            <div className={cx('total-revenue')}>
              <div className={cx('header')}>Tong doanh thu trong mot nam</div>
              <div className={cx('number')}>1000</div>
            </div>
          </div>
          <div className={cx('BestCustomer')}>
            <div className={cx('header')}>Top 10 san pham ban chay trong nam</div>
            <ul className={cx('products')}>
              <li className={cx('product-item')}>1. abc</li>
              <li className={cx('product-item')}>1. abc</li>
              <li className={cx('product-item')}>1. abc</li>
              <li className={cx('product-item')}>1. abc</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
