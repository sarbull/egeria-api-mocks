const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', '*');

  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/api/themes/', express.static('./api/themes/'));

// Add latency in response time to simulate
// poor internet connection
app.use(function (req, res, next) {
  setTimeout(() => {
    next()
  }, 1000);
});

app.get('/', (req, res) => {
  res.json({});
});

require('./api')(app);
require('./api/lineage')(app);

app.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});