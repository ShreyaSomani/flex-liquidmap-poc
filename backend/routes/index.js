let express = require('express'); //start a webserver
let mongoose = require('mongoose'); //connect to db
let cors = require('cors'); //security attacks -> ingoing outgoing requests/responses 
let bodyParser = require('body-parser'); //parsing response body to a recognizable format

// Express Route
const liquidmaproute = require('../backend/routes/map.route')

// Connecting mongoDB Database
mongoose
  .connect('mongodb://127.0.0.1:27017/optumliquidmaps')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/liquidmaps', liquidmaproute) //all end points nested with this


// PORT
const port = process.env.PORT || 4000; 
const server = app.listen(port, () => {  //starting server
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404)); //unknown error
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500; //internal server error
  res.status(err.statusCode).send(err.message);
});
