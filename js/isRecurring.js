const isRecurring = (sortedData) => {
  for (let data of sortedData) {
    if (data.length <= 1) {
      data[0].recurring = false;
    }
    for (let i = 1; i < data.length; i++) {
      let currName = data[i].name;
      let prevName = data[i - 1].name;

      let currTxAmt = data[i].amount;
      let prevTxAmt = data[i - 1].amount;

      let currDate = new Date(data[i].date);
      let prevDate = new Date(data[i - 1].date);
      let interval = currDate - prevDate;

      data[i].recurring = false;

      if (currName === prevName && (currTxAmt - prevTxAmt) / currTxAmt <= 0.3) {
        data[i].recurring = true;
      }

      if (
        data[0].name === data[1].name &&
        (data[1].amount - data[0].amount) / data[1].amount <= 0.3
      ) {
        data[0].recurring = true;
      } else {
        data[0].recurring = false;
      }
    }
  }
  return sortedData;
};

module.exports = isRecurring;
