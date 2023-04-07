import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Login from '~/pages/Public/Login';
import BookDetail from '~/pages/BookDetail/BookDetail';
import Staff from '~/pages/Staff/Staff';
import { HeaderOnly } from '~/layouts';
import { HeaderAndFooter } from '~/layouts';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.bookdetail, component: BookDetail, layout: HeaderAndFooter },
  { path: config.routes.staff, component: Staff, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
