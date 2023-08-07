// * Import mongoose module *
const mongoose = require("mongoose");

// * Schema *
const courseSchema = mongoose.Schema({
    title: String ,
    level: String,
    category:String,
    hours:String,
    language:String,
    day:String,
    month:String,
    year:String,
    description:String,
    videoTitle:String,
    videoCategory:String,
    video:String,
    userId:String,
});

// Model Name (collection 'courses' will be created/generated)
const course = mongoose.model("Course",courseSchema);
// Make File Exporatable
module.exports = course; 