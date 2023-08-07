// * Import mongoose module *
const mongoose = require("mongoose");

// * Schema *
const affectationSchema = mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

});

// Model Name (collection 'courses' will be created/generated)
const affectation = mongoose.model("Affectation", affectationSchema);
// Make File Exporatable
module.exports = affectation; 