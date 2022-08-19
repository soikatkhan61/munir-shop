const router = require("express").Router()




const {
    singleProductGetController,
} = require("../controllers/product/productController")

const {
    categoryWiseProductGetController
} = require("../controllers/explorerController")



router.get("/:product_id",singleProductGetController)
//router.post("/:product_id",orderPostController)


router.get("/category/:category",categoryWiseProductGetController)




module.exports = router