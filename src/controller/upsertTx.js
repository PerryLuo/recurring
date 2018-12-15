const express = require('express');
const router = express.Router();
const userTxModel = require('../models/userTx.model');

router.post('/upsertTx', (req, res) => {
  req.setTimeout(10000);
  if (!req.body) {
    console.log('User data not found');
    return res.status(204).send('No User Transactions Found');
  } else {
    const userTxInput = new userTxModel();
    userTxInput.collection.insertMany(req.body, (err, data) => {
      if (err) {
        console.log(err.message);
        res.status(500).send('Update Unsucessful');
      } else {
        res.redirect('/getRecurringTx');
      }
    });
  }
});

module.exports = router;
