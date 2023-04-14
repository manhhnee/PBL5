const express = require('express');
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const route = require('./routes/index')
const app = express();

const port = 3000
app.use(express.json())
app.use(cors())
app.use(cookie_parser())


route(app)
app.listen(port,()=>console.log(`run at port http://localhost:${port}`))