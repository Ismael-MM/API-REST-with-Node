const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://ismael:F9Q8NeVEzQvrm7n4@majadabae.mfhiqj0.mongodb.net/?retryWrites=true&w=majority');

const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { Schema } = mongoose;


const account = new Schema({
  name: String, // String is shorthand for {type: String}
  balance: String,
});

const Cuenta = mongoose.model('Cuenta', account);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/accounts', (req, res) => {
  Cuenta.find({})
    .exec()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
})

app.post('/accounts', bodyParser.json(), (req, res) => {
  const account = new Cuenta(req.body)

  account.save()
    .then(savedAccount => {
      res.status(201).json(savedAccount)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Internal Server Error')
    })
})

app.put('/accounts/:id', bodyParser.json(), (req, res) => {
  Cuenta.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedAccount => {
      res.json(updatedAccount);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
})

app.delete('/accounts/:id', async (req, res) => {
  try {
    const account = await Cuenta.findOneAndDelete({ _id: req.params.id });

    if (!account) {
      return res.status(404).send('Account not found');
    }

    console.log('Removed account:', account);

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})