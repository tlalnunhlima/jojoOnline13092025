//database connect hi dah hmasa ber ila

require('./models/dbConnection.js')

const express = require('express')

const mongoose = require('mongoose')

const ejs = require('ejs');

const app = express();


//view engine

app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 3000));


// public express static

app.use(express.static(__dirname + '/public'));

app.use(express.json())

app.use(express.urlencoded({extended: true}))



// app.js / server.js
const session = require('express-session');
const flash = require('connect-flash');


app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

app.use(flash());

// Make flash messages available in all EJS views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error   = req.flash('error');
  res.locals.info    = req.flash('info');
  res.locals.warning = req.flash('warning');
  next();
});


//all the link goes to routeController

const routeController = require('./controllers/routeController');

app.use('/', routeController);



//listen on specific post

 app.listen(app.get('port'), () => {
  
    console.log('App is listening on port:' + app.get('port'));
    
 });
