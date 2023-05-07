import config from '~/config';
import { HeaderOnly, HeaderAndFooter, Staff } from '~/layouts';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Cart from '~/pages/Cart';
import Login from '~/pages/Public/Login';
import BookDetail from '~/pages/BookDetail/BookDetail';
import StaffRecent from '~/pages/StaffRecent';
import StaffWaiting from '~/pages/StaffWaiting';
import StaffDelivering from '~/pages/StaffDelivering';
import StaffSuccess from '~/pages/StaffSuccess';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  { path: config.routes.bookdetail, component: BookDetail, layout: HeaderAndFooter },
];

const staffRoutes = [
  { path: config.routes.staffRecent, component: StaffRecent, layout: Staff },
  { path: config.routes.staffWaiting, component: StaffWaiting, layout: Staff },
  { path: config.routes.staffDelivering, component: StaffDelivering, layout: Staff },
  { path: config.routes.staffSuccess, component: StaffSuccess, layout: Staff },
];

const adminRoutes = [];

export { publicRoutes, staffRoutes, adminRoutes };
