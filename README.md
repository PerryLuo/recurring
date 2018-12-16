### `Project Overview`

A nodeJS app with serving data from server side to client side via Express. <br>
Two API Endpoints<br>
GET '/getRecurringTx' will send an array of all transactions identified as recurring.<br>
POST '/upsertTx'' will post all incoming transactions to the database, and return the most up to date trasactions indentified as recurring.
<br>

### `Recurring codition`

Same user<br>
Same name<br>
Similar amount within <= +/-30% <br>
Same internval for weekly <br>
Same internval for monthly with +/-3 days delta threshold <br>

### `Back End`

Node.js, with Express.js

### `Database`

MongoDB Atlas

### `npm server`

Run server side - node app.js <br>
(http://localhost:1984)
