const router = require("express").Router()

const signupValidator = require('../validator/auth/signupValidator')

const {
    isUnAuthenticated,
    isAuthenticated
} = require('../middleware/authMiddleware')

let decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')

const {
    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController,
    verifyController,
    logoutController
} = require("../controllers/auth")



router.get("/sign-up",decorateHtmlResponse("Sing up"),isUnAuthenticated,signUpGetController)
router.post("/sign-up",isUnAuthenticated,signupValidator,signUpPostController)

router.post("/verify",verifyController)


router.get("/login",isUnAuthenticated,loginGetController)
router.post("/login",isUnAuthenticated,loginPostController)

router.get("/logout",logoutController)




module.exports = router