function RecurringTxObj(name, user_id, next_amt, next_date) {
  this.name = name;
  this.user_id = user_id;
  this.next_amt = next_amt;
  this.next_date = next_date;
  this.transactions = [];
}

module.exports = RecurringTxObj;
