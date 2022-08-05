const express = require('express')
const app = express()
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
// import connection from './configs/connectDB'

require('dotenv').config()

const port = process.env.PORT || 3001;
//setup view engine
configViewEngine(app)

//init web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})