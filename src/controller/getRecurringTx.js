const express = require('express');
const router = express.Router();
const userTxModel = require('../models/userTx.model');

function RecurringTxObj(name, user_id, next_amt, next_date) {
  this.name = name;
  this.user_id = user_id;
  this.next_amt = next_amt;
  this.next_date = next_date;
  this.transactions = [];
}

router.get('/getRecurringTx', (req, res) => {
  req.setTimeout(10000);
  const recurringTxArr = [];
  userTxModel
    .find({ recurring: true })
    .exec()
    .then((recurringTxData) => {
      for (let data of recurringTxData) {
        recurringTxArr.push(
          new RecurringTxObj(
            data.name,
            data.user_id,
            data.amount,
            data.date,
            []
          )
        );
      }
      res.status(200).send(recurringTxArr);
    })
    .catch((err) => {
      console.log(err);
      console.log('Could not find recurring transactions');
      res.status(500).send('Could not find recurring transactions');
    });
});

router.get('/error', (req, res) => {
  throw new Error('Something went wrong');
});
module.exports = router;
