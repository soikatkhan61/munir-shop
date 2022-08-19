
const db = require("../config/db.config")

exports.categoryWiseProductGetController = async (req, res, next) => {
  try {

    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 16
    db.query("select * from categories where category=? LIMIT 1",[req.params.category],(e,data)=>{
      if(e){
        next(e)
      }else{
        if(data.length){
          db.query("select count(*) as count from products where category=?;select * from products where category = ? ",[data[0].category,data[0].category],(e,product)=>{
            if(e){
              next(e)
            }else{
              if(product.length){
                let totalProduct = product[0]
                console.log(totalProduct)
                let totalPage = totalProduct[0].count / itemPerPage
                res.render("pages/product/categoryWiseProduct",{title: data[0].category + " - Category" ,currentPage,totalProduct:product[0].count,categoriesProduct:product[1],totalPage,flashMessage:""})
    
              }else{
                res.status(404).send("prodcut is invalid")
              }
            }
            
          })
        }else{
          res.status(404).send("category is invalid")
        }
      }
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
};
