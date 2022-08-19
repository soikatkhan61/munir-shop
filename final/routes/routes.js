const authRoute = require("./authRoute")
const adminRoute = require("./adminRoute")
const orderRoute = require("./orderRoute")
const productRoute = require("./productRoute")

//import home page controller
const {homePageGetController} = require('../controllers/homePageController')

const mvc = require("./mvc")
const pg = require("./pg")

const routes = [

    {
        path: "/auth",
        handler: authRoute
    },
    {
        path: "/mvc",
        handler: mvc
    },
    {
        path: "/pg",
        handler: pg
    },
    {
        path: "/admin",
        handler: adminRoute
    },
    {
        path: "/order",
        handler: orderRoute
    },
    {
        path: "/product",
        handler: productRoute
    },
    {
        path: "/",
        handler: homePageGetController
    }
]


module.exports = app =>{
    routes.forEach(r =>{
        if(r.path === '/'){
            app.get('/',r.handler)
        }else{
            app.use(r.path, r.handler)
        }
    })
}