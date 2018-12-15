const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//Connect to db
const connect = require('./database');
connect();

//Handle Routes
const upsertData = require('./src/controller/upsertTx');
const getRecurring = require('./src/controller/getRecurringTx');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware
app.use((req, res, next) => {
  console.log(`Request was made on ${new Date().toString()}`);
  next();
});

app.use(upsertData);
app.use(getRecurring);

//Error handling - 404 & 500
app.use((req, res) => {
  res.status(404).send('Information requested was not found');
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Information requested was not found');
});

const PORT = process.env.PORT || 1984;
app.listen(PORT, () => console.info(`Server started on port ${PORT}`));
