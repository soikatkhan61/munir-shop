
const db = require("../../config/db.config")

const { validationResult } = require('express-validator')
const errorFormatter = require('../../utils/validationErrorFormatter');


exports.categoryGetController = async (req, res, next) => {
    try {
        db.query("select * from categories",(e,data)=>{
            if(e){
                next(e)
            }else if(data.length >= 0){
                console.log(data)
                res.render("admin/pages/product/category",{categories:data})
            }
        })
    } catch (error) {
        next(error)
    }
   
   
}

exports.addNewCategoryController = async (req, res, next) => {

    let {category} = req.body
    try {
        db.query("select * from categories where category=? LIMIT 1;select * from categories",[category],(e,data)=>{
            if(e){
                next(e)
            }else if(data[0].length > 0){
                return res.render("admin/pages/product/category",{title: "Add new category",categories:data[1], msg:"Category alread exists!"})
            }else if(data[0].length == 0){
                db.query("insert into categories values(?,?,?,?)",[null,category,0,null],(e,datas)=>{
                    if(e){
                        next(e)
                    }else{
                        res.redirect('/admin/category')
                    }
                })
            }
        })

    } catch (error) {
       next(error)
    }
}

exports.deleteCategoryController = async (req, res, next) => {
    let {cat_id} = req.body
    try {
       db.query(`DELETE FROM categories WHERE id=? LIMIT 1`,[cat_id] ,(e,rows)=>{
            if(e){
                next(e)
            }else{
                res.redirect('/admin/category')
            }
        })
       
    } catch (error) {
        next(error)
    }
}



