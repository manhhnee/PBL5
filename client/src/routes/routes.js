import config from '~/config';
import { HeaderOnly, HeaderAndFooter, Staff, Admin } from '~/layouts';

import Home from '~/pages/Home';
import Error from '~/pages/Error';
import Information from '~/pages/Information';
import History from '~/pages/History';
import Login from '~/pages/Public/Login';
import BookDetail from '~/pages/BookDetail/BookDetail';
import StaffRecent from '~/pages/StaffRecent';
import StaffWaiting from '~/pages/StaffWaiting';
import StaffDelivering from '~/pages/StaffDelivering';
import StaffSuccess from '~/pages/StaffSuccess';
import AdminDelivering from '~/pages/AdminDelivering/AdminDelivering';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.history, component: History, layout: HeaderOnly },
  { path: config.routes.bookdetail, component: BookDetail, layout: HeaderAndFooter },
  { path: config.routes.error, component: Error, layout: null },
];

const staffRoutes = [
  { path: config.routes.staffRecent, component: StaffRecent, layout: Staff },
  { path: config.routes.staffWaiting, component: StaffWaiting, layout: Staff },
  { path: config.routes.staffDelivering, component: StaffDelivering, layout: Staff },
  { path: config.routes.staffSuccess, component: StaffSuccess, layout: Staff },
];

const adminRoutes = [{ path: config.routes.adminDelivering, component: AdminDelivering, layout: Admin }];

export { publicRoutes, staffRoutes, adminRoutes };
