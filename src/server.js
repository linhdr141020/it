const express = require('express')
const app = express()
import morgan from 'morgan'
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web'
import initApiRoute from './route/api'
// import connection from './configs/connectDB'

require('dotenv').config()
app.use(morgan('combined'))

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use((req,res,next) => {
  console.log(req.method);
  next();
})

const port = process.env.PORT || 3001;
//setup view engine
configViewEngine(app)

//init web route
initWebRoute(app);

//handle 404 not found
app.use((req,res) => {
  return res.render('404.ejs')
})

initApiRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})