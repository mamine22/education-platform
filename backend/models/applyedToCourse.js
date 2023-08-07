// * Import mongoose module *
const mongoose = require("mongoose");

// * Schema *
const applyedToCourseSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    firstName: String,
    lastName: String,
    email: String,
    note: String,
    title: String,
    category: String,
    description: String,
    day:String,
    month:String,
    year:String,
});

// Model Name (collection 'courses' will be created/generated)
const applyedToCourse = mongoose.model("ApplyedToCourse", applyedToCourseSchema);
// Make File Exporatable
module.exports = applyedToCourse; 