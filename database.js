const mongoose = require('mongoose');
const pw = 'freemongodb';
const URI = `mongodb://ucool22:${pw}@interview-challenge-shard-00-00-ebwzx.mongodb.net:27017,interview-challenge-shard-00-01-ebwzx.mongodb.net:27017,interview-challenge-shard-00-02-ebwzx.mongodb.net:27017/interview_challenge?ssl=true&replicaSet=interview-challenge-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);
const dbConnection = mongoose.connection;

const connect = () => {
  dbConnection.once('open', () => {
    console.log('Conntected to MongoDB');
  });

  dbConnection.on('error', (err) => {
    console.log(err);
  });
};

module.exports = connect;
