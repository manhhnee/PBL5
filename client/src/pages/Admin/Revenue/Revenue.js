import classNames from 'classnames/bind';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

import InputForm from '~/components/InputForm';
import styles from './Revenue.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

function Revenue() {
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

  const [numOfProduct, setNumberOfProduct] = useState();
  const [revenueYear, setRevenueYear] = useState();
  const [topProduct, setTopProduct] = useState([]);
  const [potentialCustomer, setPotentialCustomer] = useState({});

  const [payload, setPayload] = useState({
    fromDate: '',
    toDate: '',
  });

  const [data, setData] = useState([]);
  const [dataCircle, setDataCircle] = useState([]);

  useEffect(() => {
    const fetchApiRevenue = async (fromDate, toDate) => {
      const response = await axios.get('http://localhost:5000/api/order/revenue', {
        params: {
          dateMin: fromDate,
          dateMax: toDate,
        },
        headers: {
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      const formattedData = response.data.chartRevenue.map((item) => ({
        revenue_date: moment(item.revenue_date).format('DD-MM-YYYY'),
        revenue: item.revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', ''),
      }));
      setData(formattedData);
      console.log(formattedData);
    };

    const fetchApiRevenueOfYear = async () => {
      const response = await axios.get('http://localhost:5000/api/order/revenueOfYear', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwtFromCookie()}`,
        },
      });
      setNumberOfProduct(response.data.NumberOfProducts);
      setRevenueYear(response.data.RevenueofYear);
      setTopProduct(response.data.TopProduct);
      setPotentialCustomer(response.data.potentialCustomer);
      setDataCircle(response.data.TopProduct.slice(0, 10));
    };

    fetchApiRevenueOfYear();
    fetchApiRevenue(payload.fromDate, payload.toDate);
  }, [payload.fromDate, payload.toDate]);

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
            <XAxis dataKey="revenue_date" />
            <YAxis />
            <Tooltip />
            <Legend
              iconType="circle" // Kiểu biểu tượng chú thích (circle, plainline, square, rectangle, diamond, triangle, wye)
              align="center" // Vị trí chú thích (center, left, right)
              iconSize={14} // Căn chỉnh theo chiều dọc (top, middle, bottom)
            />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
      <div className={cx('revenue-field')}>
        <div className={cx('header1')}>Thống kê tổng quan trong một năm</div>
        <div className={cx('content')}>
          <div className={cx('revenue')}>
            <div className={cx('sold-product')}>
              <div className={cx('header')}>Tổng số sản phẩm đã bán</div>
              <div className={cx('number')}>{numOfProduct && numOfProduct}</div>
            </div>
            <div className={cx('total-revenue')}>
              <div className={cx('header')}>Tổng doanh thu trong năm</div>
              <div className={cx('number')}>
                {revenueYear &&
                  revenueYear.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')}
                đ
              </div>
            </div>
            <div className={cx('Top10')}>
              <div className={cx('header')}>Top 10 sản phẩm bán chạy trong năm</div>
              <ul className={cx('products')}>
                {topProduct &&
                  topProduct.map((product, index) => {
                    const productNumber = index + 1;
                    return (
                      <li key={product.id} className={cx('product-item')}>
                        {productNumber}. {product.product_name} với{' '}
                        <span className={cx('high-light')}> {product.total_sold} sản phẩm</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className={cx('chart-circle')}>
            <PieChart width={400} height={700}>
              <Pie
                data={dataCircle}
                nameKey="product_name"
                dataKey="total_sold"
                cx="50%"
                cy="50%"
                outerRadius={110}
                fill="#8884d8"
              >
                {dataCircle.map((index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                wrapperStyle={{
                  paddingTop: '10px',
                  paddingBottom: '10px',
                }}
                iconType="circle" // Kiểu biểu tượng chú thích (circle, plainline, square, rectangle, diamond, triangle, wye)
                align="left" // Vị trí chú thích (center, left, right)
                iconSize={14}
                verticalAlign="bottom" // Căn chỉnh theo chiều dọc (top, middle, bottom)
              />
            </PieChart>
          </div>
          <div className={cx('BestCustomer')}>
            <div className={cx('header')}>Khách hàng tiềm năng</div>
            <span className={cx('name')}>
              {potentialCustomer && potentialCustomer.FirstName + ' ' + potentialCustomer.LastName}
            </span>
            <span className={cx('number')}>{potentialCustomer.total_purchases} sản phẩm đã mua</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
