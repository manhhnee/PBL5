import classNames from 'classnames/bind';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Order from '~/components/Order';
import Menu from '~/pages/Admin/Menu';
import styles from './AdminRecent.module.scss';

const cx = classNames.bind(styles);

function AdminRecent() {
  const data = [
    { date: '2023-05-01', revenue: 500 },
    { date: '2023-05-02', revenue: 700 },
    { date: '2023-05-03', revenue: 900 },
    // Thêm dữ liệu cho các ngày khác
  ];
  return (
    <div className={cx('content')}>
      <Menu />
      <div className={cx('header-content')}>
        <span className={cx('title-content')}>Đơn hàng gần đây</span>
      </div>
      <div className={cx('order-list')}>
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </div>
      <LineChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default AdminRecent;
