'use strict';
const PORT = process.env.PORT || 8000;

//REQUIRE
const path = require('path');
const express = require('express');
const Msg = require('./models/message.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//APP DECLARATION
let app = express();

//APP CONFIGURATION
app.set('view engine', 'pug');

//GENERAL PURPOSE MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//static routing!! (frontend css, js, etc.)
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  let indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});


//plugin routers
app.use('/messages', require('./routes/messages'));

//APP LISTEN
app.listen(PORT, err=>{
  console.log(err || `Express listening on port ${PORT}`);
});
