

const { body } = require('express-validator')


module.exports = [
    body('f_name')
        .isLength({ min: 1, max: 30 })
        .withMessage("Name cannot be empty or longer than 30").trim(),

    body('address')
        .not().isEmpty().withMessage('Address is required'),
        
    body('email')
    .not().isEmpty().withMessage('email  is requried'),

    body('phone')
    .not().isEmpty().withMessage('Phone number is requried'),
    
    body('product_price')
    .not().isEmpty().withMessage('Price is requried'),
    
    body('product_name')
    .not().isEmpty().withMessage('Product name is requried'),

    body('delivery_charge')
    .not().isEmpty().withMessage('Product name is requried')

]