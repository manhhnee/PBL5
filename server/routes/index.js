     const accountRoute = require('./account')
     const UserRoute = require('./user')
     const CategoryRoute = require('./category')
     const BookRoute = require('./book')
     const ImageBookRoute = require('./imageBook')
     function route(app){
          app.use('/user',UserRoute)
          app.use('/api',accountRoute)
          app.use('/category',CategoryRoute)
          app.use('/book',BookRoute)
          app.use('/image',ImageBookRoute)
     }

     module.exports = route