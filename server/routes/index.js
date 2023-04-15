     const accountRoute = require('./account')
     const UserRoute = require('./user')
     const CategoryRoute = require('./category')
     function route(app){
          app.use('/user',UserRoute)
          app.use('/api',accountRoute)
          app.use('/category',CategoryRoute)
     }

     module.exports = route