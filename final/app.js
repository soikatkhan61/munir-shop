require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
let moment = require('moment');  
const path = require('path')
require('./config/db.config')


//import code
const {homePageGetController} = require("./controllers/myController")

//import middleware
const setMiddleware = require("./middleware/middleware")
//import route
const setRoutes = require("./routes/routes")

//mongodb+srv://admin:admin@cluster0.ljfyxtq.mongodb.net/test


let MONGODB_URI
if(true){
 MONGODB_URI =`mongodb+srv://mh486:9uUq2ygU8g81ETXZ@cluster0.jw82jgz.mongodb.net/ekhonikeno`
}else{
 MONGODB_URI = "mongodb+srv://admin:admin@cluster0.ljfyxtq.mongodb.net/test"
}

const app = express()

let shortDateFormat = "ddd @ h:mmA"; 
app.locals.moment = moment; 
app.locals.shortDateFormat = shortDateFormat;

//setup view engine
app.set('view engine' ,'ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')));

//set the middleware from middleware directory
setMiddleware(app)

//set the routes from routes directory
setRoutes(app)




app.use((error,req,res,next) =>{
    const statusCode = error.statusCode || 500
    console.log(error)
    if(statusCode === 404){
        return res.render("pages/error/404" ,{title: "Page not found",flashMessage:""})
    }else{
        res.render("pages/error/500",{title: "Internel server errors found",flashMessage:"" })
    }

})



//create server
const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log("SERVER IS RUNINNG ON PORT "+PORT)
})

