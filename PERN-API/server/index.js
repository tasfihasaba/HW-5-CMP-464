const express = require('express')

const app = express()

const path = require('path')

const db = require('./queries')

const PORT = 9001


app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('/', (req, res) => {

  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.get('/links', db.getLinks)

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}.`)
})
