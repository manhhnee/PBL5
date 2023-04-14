const accountRoute = require('./account')
const UserRoute = require('./user')
function route(app){
     app.use('/user',UserRoute)
     app.use('/',accountRoute)
}

module.exports = route