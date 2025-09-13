//database connect hi dah hmasa ber ila

require('./models/dbConnection.js')

const express = require('express')

const mongoose = require('mongoose')

const ejs = require('ejs');

const app = express();


//view engine

app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 80));


// public express static

app.use(express.static(__dirname + '/public'));

app.use(express.json())

app.use(express.urlencoded({extended: true}))


//mongoose warning tibotu

//mongoose.set('useNewUrlParser', true);

//mongoose.set('useFindAndModify', false);

// mongoose.set('useCreateIndex', true);


//all the link goes to routeController

const routeController = require('./controllers/routeController');

app.use('/', routeController);



//listen on specific post

 app.listen(app.get('port'), () => {
  
    console.log('App is listening on port:' + app.get('port'));
    
 });
