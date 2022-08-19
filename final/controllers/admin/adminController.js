const db = require("../../config/db.config")
exports.adminHome = async(req,res,next) =>{

    try {
        // let orders = await Order.find()
        // let topSales = await Product.find().sort('-total_sales')
        db.query("select * from orders  order by  createdAt desc limit 5 ; select * from products order by total_sales LIMIT 4;select * from orders where statuss=?;select * from orders where statuss=?;select count(*) as count from orders",['pending','success'],(e,data)=>{
            if(e){
                console.log(e)
                next(e)
            }else{
                let orders = data[0]
                console.log(orders)
                let topSales = data[1]
                console.log(topSales)
                let total_order = data[4]
                res.render("admin/index",{total_order,orders,topSales,pending:data[2],success:data[3]})
            }
        })
       
    } catch (error) {
        console.log(error)
        next(error)
    }
   
}

