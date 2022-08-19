const router = require("express").Router()


const {
    isUnAuthenticated,
    isAuthenticated
} = require('../middleware/authMiddleware')

const {
    orderGetController,
    orderPostController,
    placeOrderPostController,
    confirmOderController,
    invoiceGetController,
    trackOrderGetController,
    trackOrderPostController
} = require("../controllers/product/orderController")




router.get("/confirm/:order_id",confirmOderController)
router.get("/invoice/:order_id",invoiceGetController)

router.get("/track",trackOrderGetController)
router.post("/track",trackOrderPostController)

router.post("/place-order/:product_id",placeOrderPostController)

router.get("/:product_id",orderGetController)
router.post("/:product_id",orderPostController)



module.exports = router