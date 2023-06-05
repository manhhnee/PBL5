import config from '~/config';
import { HeaderOnly, HeaderAndFooter, Staff, Admin } from '~/layouts';

import Home from '~/pages/Public/Home';
import Error from '~/pages/Public/Error';
import Information from '~/pages/Information';
import History from '~/pages/History';
import BookItemHistory from '~/pages/BookItemHistory';
import Cart from '~/pages/Cart';
import Login from '~/pages/Public/Login';
import BookDetail from '~/pages/Public/BookDetail';
import AllBook from '~/pages/Public/AllBook';
import Introduce from '~/pages/Public/Introduce';
import Privacy from '~/pages/Public/Privacy';
//staff
import StaffRecent from '~/pages/Staff/StaffRecent';
import StaffWaiting from '~/pages/Staff/StaffWaiting';
import StaffDelivering from '~/pages/Staff/StaffDelivering';
import StaffSuccess from '~/pages/Staff/StaffSuccess';
//admin
import AdminRecent from '~/pages/Admin/AdminRecent';
import AdminWaiting from '~/pages/Admin/AdminWaiting';
import AdminDelivering from '~/pages/Admin/AdminDelivering';
import AdminSuccess from '~/pages/Admin/AdminSuccess';
import ManageStaff from '~/pages/Admin/ManageStaff';
import ManageCategory from '~/pages/Admin/ManageCategory';
import ManageBook from '~/pages/Admin/ManageBook';
import ManageStore from '~/pages/Admin/ManageStore';
import ManageSupplier from '~/pages/Admin/ManageSupplier';
import Revenue from '~/pages/Admin/Revenue';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.bookdetail, component: BookDetail, layout: HeaderAndFooter },
  { path: config.routes.information, component: Information, layout: HeaderOnly },
  { path: config.routes.history, component: History, layout: HeaderOnly },
  { path: config.routes.historydetails, component: BookItemHistory, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.error, component: Error, layout: null },
  { path: config.routes.allbook, component: AllBook, layout: HeaderAndFooter },
  { path: config.routes.introduce, component: Introduce, layout: HeaderAndFooter },
  { path: config.routes.privacy, component: Privacy, layout: HeaderAndFooter },
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
  { path: config.routes.manageStaff, component: ManageStaff, layout: Admin },
  { path: config.routes.manageCategory, component: ManageCategory, layout: Admin },
  { path: config.routes.manageBook, component: ManageBook, layout: Admin },
  { path: config.routes.manageStore, component: ManageStore, layout: Admin },
  { path: config.routes.manageSupplier, component: ManageSupplier, layout: Admin },
  { path: config.routes.revenue, component: Revenue, layout: Admin },
];

export { publicRoutes, staffRoutes, adminRoutes };
