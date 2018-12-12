const mongoose = require('mongoose');

const UserTransactionSchema = new mongoose.Schema({
  trans_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  recurring: {
    type: Boolean,
    required: false,
    default: false
  }
});

module.exports = mongoose.model('UserTxSchema', UserTransactionSchema);
