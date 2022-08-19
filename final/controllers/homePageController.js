
const db = require("../config/db.config")

exports.homePageGetController = async (req, res, next) => {
  try {
    db.query("select * from products where category = ?;select * from categories; select * from products" ,['latest'],(e,results)=>{
      if(e){
          res.send(e)
          next(e)
      }else{
           res.render("pages/home", {
           title:"Home Page",
            topSales:results[2],
              latest_products:results[0],
              categories:results[1],
              products:results[2],
              flashMessage: "",
        });
      }
   

    })
  

  } catch (error) {
    next(error)
  }
};

exports.searchController = (req,res,next) =>{
  let {search_query} = req.body
  console.log(req.body)
  try {
    db.query(`SELECT * FROM products WHERE product_name LIKE '%?%';`,[search_query],(e,data)=>{
      if(e){
        next(e)
      }
      if(data.length>0){
        console.log(data)
        res.render("pages/search",{flashMessage:""})
      }
    })
  } catch (error) {
    next(error)
  }
}
