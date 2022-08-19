const express = require("express")
const morgan = require("morgan")
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const helmet = require("helmet");
const cookieParser = require('cookie-parser');

//import our middleware
const {bindUserWithRequest} = require('./authMiddleware');
const setLocals= require('./setLocals');



let MONGODB_URI
if (true) {
    MONGODB_URI = `mongodb+srv://admin:admin@cluster0.ljfyxtq.mongodb.net/test`
} else {
    MONGODB_URI = "mongodb://localhost:27017"
}

const middleware = [
    express.static('public'),
    cookieParser(),
    morgan('dev'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: "This is secret message",
        resave: false,
        saveUninitialized: false,
        maxAge: Date.now() + (30 * 86400 * 1000)
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}