const routes = {
  home: '/',
  error: '/error',
  search: '/search',
  login: '/login',
  //profile
  information: '/customer/information/:id',
  history: '/customer/history/:id',
  cart: '/cart',
  bookdetail: '/bookdetail/:id',
  allbook: '/allbook',
  //staff
  staffRecent: '/staff/recentOrders',
  staffWaiting: '/staff/waitingOrders',
  staffDelivering: '/staff/deliveringOrders',
  staffSuccess: '/staff/successOrders',
  //admin
  adminRecent: '/admin/recentOrders',
  adminWaiting: '/admin/waitingOrders',
  adminDelivering: '/admin/deliveringOrders',
  adminSuccess: '/admin/successOrders',
  manageStaff: '/admin/manageStaff',
  revenue: '/admin/revenue',
};

export default routes;
