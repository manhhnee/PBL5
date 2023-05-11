const routes = {
  home: '/',
  error: '/error',
  information: '/customer/information/:id',
  history: '/customer/history/:id',
  cart: '/cart',
  search: '/search',
  login: '/login',
  bookdetail: '/bookdetail/:id',
  allbooks: '/allbooks',
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
};

export default routes;
