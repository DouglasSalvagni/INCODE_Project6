const express = require('express');
var expressSession = require('express-session');
const dotenv = require('dotenv');
const mangoose = require('mongoose');
var multiparty = require('connect-multiparty');

const app = express();

//Import Routes
const home = require('./routes/home');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const page404 = require('./routes/404');

dotenv.config();

//Conect to DB
mangoose.connect(
    //local Db
    // process.env.DB_LOCAL_CONNECT,

    //mango Atlas Db
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    () => console.log('connect to DB')
);

//Set template engine
app.set('view engine', 'ejs');
app.set('views',"./src/views");


//Middleware
app.use(expressSession({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(multiparty());

//Set static public folder
app.use(express.static(__dirname + '/public'));

//Route Middlewares
app.use('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);

app.use('*', page404);


module.exports = app;