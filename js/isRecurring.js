const intervalThreshold = require('./intervalThreshold');

const isRecurring = (data) => {
  data[data.length - 1].recurring = false;
  data[0].recurring = false;

  for (let i = 1; i < data.length - 1; i++) {
    let currUser = data[i].user_id;
    let nextUser = data[i + 1].user_id;
    let prevUser = data[i - 1].user_id;

    let currName = data[i].name;
    let prevName = data[i - 1].name;

    let currTxAmt = data[i].amount;
    let prevTxAmt = data[i - 1].amount;
    let nextTxAmt = data[i + 1].amount;

    let currDate = new Date(data[i].date);
    let prevDate = new Date(data[i - 1].date);
    let nextDate = new Date(data[i + 1].date);
    let interval = currDate - prevDate;
    let threshold = intervalThreshold(interval);

    //Testing if conditions - need to improve this and build testing case
    // console.log('i is ' + i);
    // console.log('condition 1');
    // console.log(currUser === prevUser);
    // console.log('condition 2');
    // console.log(currUser === nextUser);
    // console.log('condition 3');
    // console.log(currName === prevName);
    // console.log('condition 4');
    // console.log(Math.abs(currTxAmt - prevTxAmt) / currTxAmt <= 0.3);
    // console.log('condition 5');
    // console.log(Math.abs(nextTxAmt - currTxAmt) / nextTxAmt <= 0.3);
    // console.log('condition 6');
    // console.log(Math.abs(nextDate - currDate) <= threshold);
    if (
      currUser === prevUser &&
      currUser === nextUser &&
      currName === prevName &&
      Math.abs(currTxAmt - prevTxAmt) / currTxAmt <= 0.3 &&
      Math.abs(nextTxAmt - currTxAmt) / nextTxAmt <= 0.3 &&
      Math.abs(nextDate - currDate) <= threshold
    ) {
      data[i].recurring = true;
      data[i - 1].recurring = true;
      data[i + 1].recurring = true;
    }
  }
  console.log(data);
  return data;
};

module.exports = isRecurring;
