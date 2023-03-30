import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Login from '~/pages/Public/Login';
import { HeaderOnly } from '~/layouts';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.login, component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
