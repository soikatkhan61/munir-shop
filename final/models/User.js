
//external import
const {Schema , model} = require('mongoose')


const userSchema = new Schema({
    username :{
        type: String,
        trim : true,
        maxlength : 25,
        required: true
    },
    userType:{
        type:String,
        enum:['admin','moderator','user'],
        default: 'user'
    },
    email:{
        type:String,
        trim: true,
        required: true
    },
    password:{
        required:true,
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verification_id:{
        type:Number,
        default:-1
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref: 'Profile'
    },
    profilePics:{
        type: String,
        default:'/uploads/soikat.jpg'
    }

},{
    timestamps:true
})

const User = model('User',userSchema)

module.exports = User