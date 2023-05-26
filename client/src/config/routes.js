const routes = {
  //header
  home: '/',
  error: '/error',
  search: '/search',
  login: '/login',
  //footer
  introduce: '/introduce',
  privacy: '/privacy',
  termsofuse: '/termsofuse',
  returnPolicy: '/returnPolicy',
  warrantyPolicy: '/warrantyPolicy',
  //profile
  information: '/customer/information',
  history: '/customer/history',
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
  manageCategory: '/admin/manageCategory',
  revenue: '/admin/revenue',
};

export default routes;
