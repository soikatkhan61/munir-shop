const Flash = require('../../utils/Flash')
const db = require("../../config/db.config")
const { google } = require("googleapis");
const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter');
const url = require('url')



exports.orderGetController = async (req, res, next) => {

    let product_id = req.params.product_id

    try {
        db.query("select * from products where id= ?" ,[product_id.trim()],(e,data)=>{
            if(e){
                next(e)
            }
            if(data.length>0){
                res.render("pages/product/placeOrder", {title: "Order - " + data[0].product_name , product:data[0], flashMessage: "" ,delivery_charge:""})
            }else{
                res.status(404).send("404, product not found")
            }
        })
    } catch (e) {
        next(e)
    }

}

exports.orderPostController = async (req, res, next) => {

    let product_id = req.params.product_id
    let {delivery_charge} = req.body
    try {
        db.query("select * from products where id= ?" ,[product_id.trim()],(e,data)=>{
            if(e){
                next(e)
            }
            if(data.length>0){
                res.render("pages/product/placeOrder", {title: "Order - " + data[0].product_name , product:data[0], flashMessage: "" ,delivery_charge})
            }else{
                res.status(404).send("404, product not found")
            }
        })
    } catch (e) {
        next(e)
    }
}


exports.placeOrderPostController = async (req, res, next) => {
   
    let { f_name, address,delivery_charge, email, phone, message, product_name, product_price,product_id } = req.body
    let customer_name = f_name

    let errors = validationResult(req).formatWith(errorFormatter)
   

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please check your form')
        return res.render('pages/product/add-product', {
            error: errors.mapped(),
            value: {
                customer_name,
                address,
                email,
                phone,
                message,
                product_name,
                product_price,
                product_id
            },
            flashMessage: Flash.getMessage(req)
        })
    }

    let total_amount = parseInt(delivery_charge) + parseInt(product_price)
    try {

        async function sendOrderToGoogleSheet(){
            const auth = new google.auth.GoogleAuth({
                keyFile: "key.json",
                //url to spreadsheets API
                scopes: "https://www.googleapis.com/auth/spreadsheets", 
            });
        
            //Auth client Object
            const authClientObject = await auth.getClient();
            //Google sheets instance
            const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
            const spreadsheetId = "1SRlr0TbU_W50_B6Y2_79ocOkUxbCT2izmfgmTYzR26o";
        
            //write data into the google sheets
             await googleSheetsInstance.spreadsheets.values.append({
                auth, //auth object
                spreadsheetId, //spreadsheet id
                range: "Sheet1!A:I", //sheet name and range of cells
                valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
                resource: {
                    values: [[customer_name, address,email,phone,message,product_name,product_price,delivery_charge,total_amount]],
                },
            });
        }

        db.query("insert into orders values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[null,customer_name,address,email,phone,message,product_name,product_id,product_price,delivery_charge,total_amount,"pending",null],(e,result)=>{
            if(e){
                next(e)
            }
            if(result){
                sendOrderToGoogleSheet().then(
                    res.redirect(`/order/invoice/${result.insertId}`)
                )
                
            }else{
                res.status(404).send("order creating failed")
            }
        })


    } catch (error) {
        next(error)
    }

    
}

exports.confirmOderController = async (req, res, next) => {

    let order_id = req.params.order_id
    try {
        db.query("select * from orders where id=?",[order_id],(e,data)=>{
            if(e){
                next(e)
            }else{
                db.query("update orders set statuss='success' where id=?;update products set total_sales = total_sales +1 where id=? limit 1",[order_id,data[0].product_id],(e,data)=>{
                    if(e){
                        next(e)
                    }else{
                        console.log(req.url)
                        res.redirect("/admin/orders/pending")
                    }
                })
            }
        })
    } catch (e) {
        next(e)
    }

}

exports.invoiceGetController = async (req, res, next) => {
    try {
        let order_id = req.params.order_id
        db.query("select * from orders where id = ? ",[order_id],(e,data)=>{
            if(e){
                next(e)
            }
            if(data.length > 0){
                res.render("pages/order/invoice",{title: "Invoice id - " + order_id ,flashMessage:"",order:data[0]})
            }else{
               res.status(404).send("404, order id is not valid")
            }
        })
    } catch (e) {
        next(e)
    }
}

exports.trackOrderGetController = async (req, res, next) => {
    res.render("pages/order/track-order",{title: "Track your order",flashMessage:""})
}

exports.trackOrderPostController = async (req, res, next) => {
    try {
       
        let {order_id} = req.body
    
        db.query("select * from orders where id = ? ",[order_id],(e,data)=>{
            if(e){
                next(e)
            }
            if(data.length > 0){
                res.render("pages/order/invoice",{title: "Invoice id - " + order_id ,flashMessage:"",order:data[0]})
            }else{
               res.status(404).send("404, order id is not valid")
            }
        })
        
    } catch (e) {
        next(e)
    }
}

