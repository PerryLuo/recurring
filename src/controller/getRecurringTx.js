const express = require('express');
const router = express.Router();

//Schema
const userTxModel = require('../models/userTx.model');

//Sort res by name
const firstBy = require('thenby');

//Indentify recurring
const sortData = require('../../js/sortData');
const isRecurring = require('../../js/isRecurring');

let RecurringTxObj = require('../../js/createObj');

router.get('/getRecurringTx', async (req, res) => {
  req.setTimeout(10000);

  queryDB = () => {
    return userTxModel.find().exec();
  };
  try {
    let dbData1 = await queryDB();

    //sort the data by user, then by name, then by amount, then by timestamp
    let sortedData = sortData(dbData1);

    //determine if any tx is recurring and filtering out the non-recurring tx
    let recurringData = isRecurring(sortedData).filter(
      (data) => data.recurring != false
    );

    //quering database again to get original name of transaction to match with filtered
    let dbData2 = await queryDB();
    for (recurr of recurringData) {
      for (db of dbData2) {
        if (recurr.trans_id === db.trans_id) {
          recurr.name = db.name;
        }
      }
    }

    if (recurringData.length === 0) {
      res.status(200).send('No recurring trasactions');
    } else {
      //get all unique users from the transactions
      const uniqueUsers = new Set();
      for (user of recurringData) {
        uniqueUsers.add(user.user_id);
      }

      //create return obj for each unique user
      const recurringTxArr = [];
      for (user of uniqueUsers) {
        recurringTxArr.push(new RecurringTxObj('', user));
      }

      for (newObj of recurringTxArr) {
        let transactions = [];
        for (data of recurringData) {
          if (newObj.user_id === data.user_id) {
            newObj.name = data.name.split(' ')[0];
            newObj.next_amt = data.amount;
            newObj.next_date = new Date(
              recurringData[recurringData.length - 1].date.getTime() -
                recurringData[recurringData.length - 2].date.getTime() +
                recurringData[recurringData.length - 1].date.getTime()
            );
            transactions.push(data);
            newObj.transactions = transactions;
          }
        }
      }
      recurringTxArr.sort(
        firstBy((a, b) => {
          return a.name > b.name;
        })
      );
      res.status(200).send(recurringTxArr);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error in return response');
  }
});

router.get('/error', (req, res) => {
  throw new Error('Something went wrong');
});

module.exports = router;
