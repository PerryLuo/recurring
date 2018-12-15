const sortData = (dataArr) => {
  var firstBy = require('thenby');
  let uniqueUsers = new Set();

  //parse the names to be same and lowercase
  for (let data of dataArr) {
    let name = data.name.split(' ');
    data.name = name[0].toLowerCase();
  }

  //find all unique user by id
  for (let data of dataArr) {
    uniqueUsers.add(data.user_id);
  }

  //create an array of array of each user's tx
  // const dataArrByUser = [];
  for (let user of uniqueUsers) {
    // dataArrByUser.push(
    dataArr.filter((val) => {
      return val.user_id === user;
    });
    // );
  }

  //sort each array of user's tx in ascending by name, then by amount then by date
  dataArr.sort(
    firstBy((a, b) => {
      return a.user_id > b.user_id;
    })
      .thenBy((a, b) => {
        return a.name > b.name;
      })
      .thenBy((a, b) => {
        return a.amount - b.amount;
      })
      .thenBy((a, b) => {
        return a.date - b.date;
      })
  );

  return dataArr;
};
module.exports = sortData;
