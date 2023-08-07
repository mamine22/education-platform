// * Import mongoose module *
const { number } = require("@google/maps/lib/internal/validate");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// * Schema *
const userSchema = mongoose.Schema({
    firstName: String ,
    lastName: String,
    email: {type:String,unique:true},
    phone:{type:String,unique:true},
    password:String,
    category:String,
    country:String,
    status:String,
    userClass:String,
    speciality:String,
    bio:String,
    status:String,
    role:String,
    img:String,
    studentNumber:[],
    cv:String,
    token:String,
    SMSCode:String,
    expiresIn:Number,
    jwt:String
});

// Model Name (collection 'users' will be created/generated)
const user = mongoose.model("User",userSchema.plugin(uniqueValidator));
// Make File Exporatable
module.exports = user; 