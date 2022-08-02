const express = require('express')
const app = express()
const port = 3000
import configViewEngine from './configs/viewEngine'

configViewEngine(app)
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})