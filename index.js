import mongoose from 'mongoose';
const express = require('express')
const morgan = require('morgan')
const { Schema } = mongoose;


const app = express()
const port = 3000

const account = new Schema({
    name: String, // String is shorthand for {type: String}
    balance: String,
  });


app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/accounts', (req, res) => {
    res.send('Hello World!')
})

app.post('/accounts', (req, res) => {
    res.send('Hello World!')
})

app.put('/accounts/:id', (req, res) => {
    res.send('Hello World!')
})

app.delete('/accounts/:id', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})