
//external import
const {Schema , model} = require('mongoose')


const productSchema = new Schema({
    product_name :{
        type: String,
        trim : true,
        required: true
    },
    slug:{
        type: String,
        trim : true,
        required: true
    },
    category:{
        type: String,
    },
    old_price:{
        type: Number,
        required: true
    },
    new_price:{
        type:Number,
        required: true
    },
    product_desc:{
        type: String,
        trim : true
    },
    product_image:{
        type: String
    },
    total_sales:[{
        type: Schema.Types.ObjectId,
        ref:"Order"
    }]
},{
    timestamps:true
})

const Product = model('Product',productSchema)

module.exports = Product