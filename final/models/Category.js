const {Schema,model} = require('mongoose')

const categorySchema = new Schema({
    
    category:{
        type:String,
        trim:true,
        unique:true
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
    
},{
    timestamps:true
})


const Category  = model('Category', categorySchema)

module.exports = Category