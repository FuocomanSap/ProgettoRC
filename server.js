const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Using cookieParser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Using flash middleware
var flash = require('connect-flash');
app.use(flash());

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var path = require('path');

// Initializing passport
var initPassport = require('./passport/init');
initPassport(passport);

// Setting up routes
var routes = require('./routes/index')(passport);
var fbroutes = require('./routes/facebook-routes')(passport);
var identistcare = require('./routes/identistcare')(passport);


// Setting the view engine with HTML
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.set('view engine', 'ejs'); // view engine -> ejs

app.use(bodyParser.urlencoded({ extended: false }));


// Connecting to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//const Item = require('./models/Item');
const Utente = require('./models/Utente');

// Using routes
app.use('/', routes);
app.use('/', fbroutes);
app.use('/', identistcare);

const port = 3000;

app.listen(port, () => console.log('Server is running on port 80 ...'));

module.exports = app;

//set the css,js,imm path, per poter essere acceduti dalle pagine html 
app.use(express.static(__dirname + '/public'));
