const express = require('express');
const router = express.Router();
const userTxModel = require('../models/userTx.model');
const { collectionExist } = require('../../database');
const sortData = require('../../js/sortData');
const isRecurring = require('../../js/isRecurring');

router.post('/upsertTx', (req, res) => {
  req.setTimeout(10000);
  if (!req.body) {
    console.log('User data not found');
    return res.status(204).send('No User Transactions Found');
  } else {
    // async collectionExist();
    // if(!collectionExist){

    let sortedData = sortData(req.body);
    let recurringData = isRecurring(sortedData);
    const merged = [].concat.apply([], recurringData);
    console.log(merged);

    const userTxInput = new userTxModel();
    userTxInput.collection.insertMany(merged, (err, data) => {
      if (err) {
        res.status(500).send('Update Unsucessful');
      } else {
        res.status(201).send('Update Sucessful');
      }
    });
    // }
  }
});

module.exports = router;
