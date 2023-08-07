const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema({

    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    message: String,
    firstName: String,
    lastName: String,
    img: String,

});
const feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = feedback;