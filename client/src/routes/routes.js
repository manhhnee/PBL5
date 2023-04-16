import config from '~/config';
import { HeaderOnly, HeaderAndFooter, Staff } from '~/layouts';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Public/Login';
import BookDetail from '~/pages/BookDetail/BookDetail';
import StaffRecent from '~/pages/StaffRecent';
import StaffWaiting from '~/pages/StaffWaiting';
import StaffDelivering from '~/pages/StaffDelivering';
import StaffSuccess from '~/pages/StaffSuccess';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.bookdetail, component: BookDetail, layout: HeaderAndFooter },
  { path: config.routes.staffRecent, component: StaffRecent, layout: Staff },
  { path: config.routes.staffWaiting, component: StaffWaiting, layout: Staff },
  { path: config.routes.staffDelivering, component: StaffDelivering, layout: Staff },
  { path: config.routes.staffSuccess, component: StaffSuccess, layout: Staff },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
