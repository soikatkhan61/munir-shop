const db = require("../../config/db.config")


exports.orderAdminGetController = async(req,res,next) =>{

    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 3

    try {
      db.query("select * from orders where statuss=? order by id desc LIMIT ? , ?;select count(*) as count from orders;select * from orders where statuss =? order by id desc LIMIT ? , ?",['pending',((itemPerPage * currentPage) - itemPerPage),itemPerPage,"success",((itemPerPage * currentPage) - itemPerPage),itemPerPage],(e,data)=>{
        if(e){
          next(e)
        }
        if(data.length > 0){
          let totalOrder = data[1]
          let totalPage = totalOrder[0].count / itemPerPage
          res.render("admin/pages/orders",{currentPage,itemPerPage,totalPage,success:data[2],pending:data[0]})
        }else{
          res.status(404).send("your requested data is not found")
        }
      })
    } catch (error) {
      next(error)
    }
}

exports.pendingOrderGetController = async(req,res,next) =>{

  let currentPage = parseInt(req.query.page) || 1
  let itemPerPage = 5

  try {

    db.query("select count(*) as count from orders where statuss='pending';select * from orders where statuss='pending'  ORDER BY id DESC LIMIT ?,?",[((itemPerPage * currentPage) - itemPerPage),itemPerPage],(e,data)=>{
      if(e){
        next(e)
      }
      if(data.length > 0){
        let totalOrder = data[0]
        let totalPage = totalOrder[0].count / itemPerPage
        res.render("admin/pages/pending-orders",{orders:data[1],currentPage,itemPerPage,totalPage,totalOrder})
      }else{
        res.status(404).send("your requested data is not found")
      }
    })

  } catch (error) {
    console.log(error)
  }
}

exports.completedOrderGetController = async(req,res,next) =>{

    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 5

    try {
      db.query("select count(*) as count from orders where statuss='success';select * from orders where statuss='success'  ORDER BY id DESC LIMIT ?,?",[((itemPerPage * currentPage) - itemPerPage),itemPerPage],(e,data)=>{
        if(e){
          next(e)
        }
        if(data.length > 0){
          let totalOrder = data[0]
          let totalPage = totalOrder[0].count / itemPerPage
          res.render("admin/pages/completed-orders",{orders:data[1],currentPage,itemPerPage,totalPage,totalOrder})
        }else{
          res.status(404).send("your requested data is not found")
        }
      })
    } catch (error) {
      console.log(error)
    }
}

exports.deleteOrderPostController = async(req,res,next) =>{
    try {
      let {order_id} = req.body
      db.query('select * from orders where id=?',[order_id],(e,order)=>{
        if(e){
          next(e)
        }
        if(order.length>0){
          db.query('delete from orders where id=?',[order_id],(e,order)=>{
            if(e){
              console.log(e)
            }else{
              res.redirect("/admin/orders/pending")
            }
          })
        }else{
          res.status(404).send("orders not found")
        }
      })
    } catch (error) {
      console.log(error)
    }
}

