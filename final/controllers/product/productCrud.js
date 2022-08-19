const slugify = require("slugify");
const fs = require("fs");
const path = require("path")
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const Flash = require("../../utils/Flash");
const { validationResult } = require("express-validator");
const errorFormatter = require("../../utils/validationErrorFormatter");
const db = require("../../config/db.config")

exports.addProductGetController = async (req, res, next) => {
  db.query("select * from categories;",(e,results)=>{
    if(results.length > 0){
      let errors = validationResult(req).formatWith(errorFormatter);

      res.render("admin/pages/product/add-product", {
        title: "Add Product",
        error: errors.mapped(),
        value: {},
        categories:results,
        slugError: "",
        customError:"",
        category:""
      });
    }
})
};

exports.addProductPostController = async (req, res, next) => {
  let {
    product_name,
    category,
    old_price,
    slug,
    new_price,
    product_desc,
    product_image,
  } = req.body;

  let customError = ''
  if(parseInt(old_price) < parseInt(new_price)){
   customError = "Old price cannot be greater than new price"
  }

  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty() || (parseInt(old_price) < parseInt(new_price))) {
   
    if(req.file){
      fs.unlink(`./${req.file.path}`, function (err) {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
    }


    db.query("select * from categories;",(e,results)=>{
      if(results.length > 0){
        return res.render("admin/pages/product/add-product", {
          title: "Add Product",
          error: errors.mapped(),
          value: {
            product_name,
            old_price,
            new_price,
            product_desc,
            category,
          },
          categories:results,
          slugError: "",
          customError,
          category
        });
      }
  })
   
  }

  slug = slugify(slug, {
    replacement: "-",
    lower: true,
    strict: true,
    trim: true,
  });


  db.query("select * from products where slug=?;",[slug],(e,results)=>{
    if(results.length > 0){
      fs.unlink(`./${req.file.path}`, function (err) {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });

      return res.render("admin/pages/product/add-product", {
        title: "Add Product",
        error: errors.mapped(),
        value: {
          product_name,
          old_price,
          new_price,
          product_desc,
          slug,
          category,
        },
        categories:results,
        slugError: "Product name exists, try different name",
        customError,
        category
      });
    }
})


  if (req.file) {
    product_image = `/uploads/${req.file.filename}`;
  }

  try {
    db.query("insert into products values(?,?,?,?,?,?,?,?,?,?);update categories set products = products + 1 where category=?;",[null,product_name,slug,category,old_price,new_price,product_desc,product_image,0,null,category],(e,results)=>{
     if(e){
      next(e)
     }else{
      res.redirect("/admin/products")
     }

  })

  } catch (error) {
    next(error);
  }
};

exports.editProductGetController = async (req, res, next) => {
  try {
    let id = req.params.id;
    db.query("select * from products where id=?;select * from categories",[id],(e,data)=>{
        if(e){
          next(e)
        }else{
        if(data[0].length > 0){
          return res.render("admin/pages/product/edit-product", {
            product:data[0],
            categories:data[1],
          });
        }else{
          res.status(404).send("products not found")
        }}
    })
  } catch (error) {
    next(error);
    console.log(error)
  }
};

exports.editProductPostController = async (req, res, next) => {
  let {
    id,
    product_name,
    category,
    old_price,
    new_price,
    slug,
    product_desc,
    product_image
  } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);

  let customError = ''
  if(parseInt(old_price) < parseInt(new_price)){
    customError = "Old price cannot be greater than new price"
   }

  if (!errors.isEmpty()) {
    db.query("select * from categories;select * from products where id=?",[id],(e,data)=>{
      if(e){
        next(e)
      }else{
        if(req.file){
          fs.unlink(`./${req.file.path}`, function (err) {
            if (err && err.code == "ENOENT") {
              // file doens't exist
              console.info("File doesn't exist, won't remove it.");
            } else if (err) {
              // other errors, e.g. maybe we don't have enough permission
              console.error("Error occurred while trying to remove file");
            } else {
              console.info(`removed`);
            }
          });
        }
        return res.render("admin/pages/product/edit-product", {
          title: "Add Product",
          error: errors.mapped(),
          value: {
            product_name,
            old_price,
            new_price,
            product_desc,
          },
          categories:data[0],
          product:data[1]
        });
      }
    })
   
  }
  let link = slugify(slug, {
    replacement: "-",
    lower: true,
    strict: true,
    trim: true,
  });
  try {
  
    if(req.file) {
      product_image = `/uploads/${req.file.filename}`;
    }
    
    db.query("select * from products where id=?;update products set slug=?, product_name=?, category=?,old_price=?,new_price=?,product_desc=?,product_image=? where id=?",[id,link,product_name,category,old_price,new_price,product_desc,product_image,id],(e,data)=>{
      if(e){
        if(req.file){
          fs.unlink(`./${req.file.path}`, function (err) {
            if (err && err.code == "ENOENT") {
              // file doens't exist
              console.info("File doesn't exist, won't remove it.");
            } else if (err) {
              // other errors, e.g. maybe we don't have enough permission
              console.error("Error occurred while trying to remove file");
            } else {
              console.info(`removed`);
            }
          });
        }
        next(e)
      }else{
        if(data[0] && req.file){
          let product = data[0]
          let productImagePath = product[0].product_image
          fs.unlink(productImagePath.trim(), function (err) {
            if (err && err.code == "ENOENT") {
              // file doens't exist
              console.info("File doesn't exist, won't remove it.");
            } else if (err) {
              // other errors, e.g. maybe we don't have enough permission
              console.error("Error occurred while trying to remove file");
            } else {
              console.info(`removed`);
            }
          });
        }
        return res.redirect("/admin/products");
      }
    })

   
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.allProductGetController = async (req, res, next) => {
  try {
    db.query("select * from products ",(e,data)=>{
      if(e){
        next(e)
      }

      if (data.length >= 0)  {
        res.render("admin/pages/product/all-product-admin", { products:data });
      }else{
        res.status(404).send("products not found")
      }
    })

  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProductPostController = async (req, res, next) => {
  let { product_id } = req.body
  try {
    db.query("select * from products where id=? LIMIT 1;",[product_id],(e,data)=>{
      if(e){
        next(e)
      }else{

        let product_image_path = data[0].product_image;
        fs.unlink(`public${product_image_path}`, async function (err) {
          if (err && err.code == "ENOENT") {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
          } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
          } else {
              console.log("File removed")
          }

          db.query("delete FROM products where id=?",[product_id],(e,data)=>{
            if(e){
              return next(e)
            }else{
              return res.redirect("/admin/products");
            }
          })
        });
      
      }
    })
  } catch (error) {
    next(error);
  }
};
