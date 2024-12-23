const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const studentRoute = require('./router/studentRouter')
const app = express()
require('dotenv').config()

const base_ui_url = process.env.NODE_ENV === 'production' ? process.env.UI_URL_PROD : process.env.UI_URL_LOCAL
const port = 4000

app.use(cors({
  origin: base_ui_url,
  optionsSuccessStatus: 200,
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.use('/api/student', studentRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})