const express = require('express')
const app = express()
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
import initApiRoute from './route/api'
// import connection from './configs/connectDB'

require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const port = process.env.PORT || 3001;
//setup view engine
configViewEngine(app)

//init web route
initWebRoute(app);

initApiRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})