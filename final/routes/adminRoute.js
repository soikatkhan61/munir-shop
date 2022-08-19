const router = require("express").Router()


const {
    adminHome
} = require("../controllers/admin/adminController")

const {
    addProductGetController,
    addProductPostController,
    allProductGetController,
    editProductGetController,
    editProductPostController,
    deleteProductPostController
} = require("../controllers/product/productCrud")



const product_validator = require('../validator/product_validator')

const {
    isUnAuthenticated,
    isAuthenticated,
    checkAdmin
} = require('../middleware/authMiddleware')

const upload = require("../middleware/uploadMiddleware")

const {
    orderAdminGetController,
    pendingOrderGetController,
    completedOrderGetController,
    deleteOrderPostController

} = require('../controllers/admin/orderAdminControll')

const {categoryGetController,addNewCategoryController,deleteCategoryController} = require('../controllers/product/categoryController')



router.get("/add-product",isAuthenticated,checkAdmin,addProductGetController)
router.post("/add-product",isAuthenticated,checkAdmin,upload.single("product_image"),product_validator,addProductPostController)


router.get("/products/edit-product/:id",isAuthenticated,checkAdmin,editProductGetController)
router.post("/products/edit-product",isAuthenticated,checkAdmin,upload.single("product_image"),product_validator,editProductPostController)

//done
router.get("/category",isAuthenticated,checkAdmin,categoryGetController)
router.post("/add-category",isAuthenticated,checkAdmin,addNewCategoryController)
router.post("/category/delete",isAuthenticated,checkAdmin,deleteCategoryController)


router.get("/products",isAuthenticated,checkAdmin,allProductGetController)

router.post("/products/delete",isAuthenticated,checkAdmin,deleteProductPostController)



router.get("/orders",isAuthenticated,checkAdmin,orderAdminGetController)

router.get("/orders/pending",isAuthenticated,checkAdmin,pendingOrderGetController)
router.get("/orders/completed",isAuthenticated,checkAdmin,completedOrderGetController)

router.post("/order/delete",isAuthenticated,checkAdmin,deleteOrderPostController)


router.get('/',isAuthenticated,checkAdmin,adminHome)



module.exports = router