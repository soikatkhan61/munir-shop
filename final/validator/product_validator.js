

const { body } = require('express-validator')


module.exports = [
    body('product_name')
        .isLength({ min: 1, max: 70 })
        .withMessage("Product Name is too long").trim(),

    body('old_price')
        .not().isEmpty().withMessage('Price must be given'),

    body('new_price')
        .not().isEmpty().withMessage('Price must be given'),
        
    body('product_desc')
        .isLength({ min: 1, max: 1000 })
        .withMessage("Description should be 1 charecter to 1000 charecter").trim(),

    body('produc_image')
        .isEmpty().withMessage("Product image should be given must")
]