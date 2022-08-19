
//external import
const {Schema , model} = require('mongoose')


const orderSchema = new Schema({
    customer_name:{
        type: String,
        trim:true,
        required: true,
        maxlength : 25,
    },
    address:{
        type:String,
        required:true,
        trim:true,
        maxlength: 300
    }, 
   
    email:{
        type:String,
        trim:true,
        maxlength: 50
    },
    phone:{
        type:String,
        trim:true,
        maxlength: 12
    },
    message:{
        type:String,
        trim:true,
        maxlength: 500
    },
    product_name :{
        type: String,
        trim : true,
        required: true
    },
    product_id :{
        type: String,
        trim : true,
        required: true
    },
    product_price:{
        type:Number,
        required: true
    },
    delivery_charge:{
        type:Number,
        required:true,
    },
    total_amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['success','failed','pending'],
        default: 'pending'
    }
},{
    timestamps:true
})

const Order = model('Order',orderSchema)

module.exports = Order