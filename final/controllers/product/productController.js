
const db = require("../../config/db.config")

exports.singleProductGetController = async (req, res, next) => {

    let product_id = req.params.product_id
    try {
        db.query('select * from products where slug =? ',[product_id],(e,product)=>{
            if(e){
                next(e)
            }
            if(product.length > 0){
                db.query("select * from products where category = ? LIMIT 8",[product[0].category],(e,category)=>{
                    if(e){
                        next(e)
                    }
                    if(category.length >0){
                        res.render("pages/product/single", {title: product[0].product_name, catWiseProduct:category, product:product[0], flashMessage: "" })
                    }else{
                        res.status(404).send("category not found")
                    }
                })
            }else{
                res.status(404).send("products not found")
            }
        })

    } catch (e) {
        next(e)
    }
}

