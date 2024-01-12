const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:30,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // jab mail phuch jayegi user ke email pr to yha pr verify ho jayega
    verified:{
        type:Boolean,
        default:false
    },
    verificationToken:String,
    addresses:[
        {
            name:String,
            mobileNo:Number,
            houseNo:String,
            street:String,
            landMark:String,
            city:String,
            country:String,
            PostalCode:Number,
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User