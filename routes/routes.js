const authRoute = require("./auth")
const mvc = require("./mvc")

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
        path: "/",
        handler: (req,res)=>{
           res.render("pages/home")
        }
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