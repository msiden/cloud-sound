const express = require('express')
const app = express()
const port = 3001
const { Client } = require('pg')

const client = new Client({
  host: 'db',
  port: 5432,
  user: 'reason',
  password: 'reason',
})

client.connect((err) => {
  if (err) {
    throw err
  }
  app.listen(port, async () => {
    console.log('doing stuff')
  })
})
