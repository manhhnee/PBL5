import config from '~/config';
import { HeaderOnly, HeaderAndFooter, Staff, Admin } from '~/layouts';

import Home from '~/pages/Public/Home';
import Error from '~/pages/Public/Error';
import Information from '~/pages/Information';
import History from '~/pages/History';
import Cart from '~/pages/Cart';
import Login from '~/pages/Public/Login';
import BookDetail from '~/pages/Public/BookDetail/BookDetail';
import StaffRecent from '~/pages/Staff/StaffRecent';
import StaffWaiting from '~/pages/Staff/StaffWaiting';
import StaffDelivering from '~/pages/Staff/StaffDelivering';
import StaffSuccess from '~/pages/Staff/StaffSuccess';
import AdminRecent from '~/pages/Admin/AdminRecent';
import AdminWaiting from '~/pages/Admin/AdminWaiting';
import AdminDelivering from '~/pages/Admin/AdminDelivering';
import AdminSuccess from '~/pages/Admin/AdminSuccess';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.history, component: History, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.bookdetail, component: BookDetail, layout: HeaderAndFooter },
  { path: config.routes.error, component: Error, layout: null },
];

const staffRoutes = [
  { path: config.routes.staffRecent, component: StaffRecent, layout: Staff },
  { path: config.routes.staffWaiting, component: StaffWaiting, layout: Staff },
  { path: config.routes.staffDelivering, component: StaffDelivering, layout: Staff },
  { path: config.routes.staffSuccess, component: StaffSuccess, layout: Staff },
];

const adminRoutes = [
  { path: config.routes.adminRecent, component: AdminRecent, layout: Admin },
  { path: config.routes.adminWaiting, component: AdminWaiting, layout: Admin },
  { path: config.routes.adminDelivering, component: AdminDelivering, layout: Admin },
  { path: config.routes.adminSuccess, component: AdminSuccess, layout: Admin },
];

export { publicRoutes, staffRoutes, adminRoutes };
