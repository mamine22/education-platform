//***** Import express module *****
const express = require("express")
//***** Import mongoose module *****
const mongoose = require('mongoose');
//***** Import body-parser module *****
const bodyParser = require("body-parser");
//***** Import bcrypt module *****
const bcrypt = require("bcrypt");
//***** Import lodash module *****
const utils = require('lodash')
//***** Import nodemailer module *****
const nodemailer = require("nodemailer");
//***** Import ObjectId module *****
const { ObjectId } = require("mongodb");

//connect APP with DataBase
mongoose.connect('mongodb://127.0.0.1:27017/education');

//======= Import File Configuration ===========
//======= Begin ===========
//***** Import multer module *****
const multer = require("multer")
//import path module 
const path = require("path")
//======= END ===========

//create express application
const app = express()

//***** Body-parser Configuration *****
// Send JSON responses
app.use(bodyParser.json());

// Get objects from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//======================== Multer configuration ================================
// ** Upload files configuration ** 
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
    'video/mp4': 'mp4',
}
// Upload images
app.use('/assets/images', express.static(path.join('backend/assets/images')))
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/assets/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-MAmin-' + '.' + extension;
        cb(null, imgName);
    }
});

// Upload files 
app.use('/assets/files', express.static(path.join('backend/assets/files')))
const storagePdf = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/assets/files')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-MAmin-' + '.' + extension;
        cb(null, imgName);
    }
});

// Upload Videos
app.use('/assets/video', express.static(path.join('backend/assets/video')))
const storageVid = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/assets/video')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-MAmin-' + '.' + extension;
        cb(null, imgName);
    }
});

//====================== End Multer configuration =================================

//======================== Models Importation =====================================
const User = require("./models/user")
const Course = require("./models/course")
const ApplyedToCourse = require("./models/applyedToCourse");
const Feedback = require("./models/feedback");
const Affectation = require("./models/affectation");
const jwt = require("jsonwebtoken");
//======================== END Models Importation ==================================

//======================== Twilio API configuration ================================
//  Twilio Client
const client = require('twilio')("AC25e8ed8f0d245aaf9eddb9bed418d6c2", "8236be699b6c4cd4168e7872cf6c1cec");

// *** Twilio API Configuration ***
// Twilio SMS  
app.put("/users/confirm-SMS/code/:id", (req, res) => {
    let id = req.params.id;
    console.log("id user", id)
    // Randomize SMS Code
    User.updateOne({ _id: id }, { SMSCode: Math.floor(Math.random() * 1000000) }).then((response) => {
        // Get user by id
        User.findOne({ _id: id }).then((user) => {
            // Sending Code To User phone number
            client.messages
                .create({
                    body: 'Your verification account to access MAmin plateform is :' + user.SMSCode,
                    from: '+13613216250',
                    to: '+216' + user.phone
                })
                .then(message => console.log(message.sid));
        });
    });
});

//Confirm Account (SMS)
app.put("/users/confirm-SMS/:id", (req, res) => {
    console.log("Here into BL: Confirm your Acount (SMS)")
    let id = req.params.id
    //find user by id
    User.findOne({ _id: id }).then((user) => {

        // Confirm function
        if (user.SMSCode == req.body.code) {
            User.updateOne({ _id: id }, { status: 'valid' }).then((response) => {
                res.json({ isConfirmed: true })
            });
        } else {
            res.json({ isConfirmed: false })
        }
    })
});
//======================== End Twilio API configuration ==============================

//======================== Nodemailer configuration ==============================
// Nodemailer   
app.put("/users/nodeMailer-code/:id", (req, res) => {
    let id = req.params.id;
    console.log("id user", id)
    // Randomize  Code
    User.updateOne({ _id: id }, { SMSCode: Math.floor(Math.random() * 1000000) }).then((response) => {
        // Get user by id
        User.findOne({ _id: id }).then((user) => {
            // Sending Code To User email
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',

                auth: {
                    user: 'mohamedbenm317@gmail.com',
                    pass: 'xkqocetcvdqgjpfm'
                }
            });
            // send mail with defined transport object
            let mailOptions = {
                from: 'mohamedbenm317@gmail.com',
                // Comma separated list of recipients
                to: 'mohamedaminbenmessaoud@gmail.com',

                // Subject of the message
                subject: 'MAmin Verification Code',

                // plaintext body
                text: `Hi ${user.firstName}, Please enter the following verification code to access your MAmin Account!`,

                // HTML body
                html: `
                <!DOCTYPE html>
                <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <meta name="x-apple-disable-message-reformatting">
                    <title></title>
                    <!--[if mso]>
                  <noscript>
                    <xml>
                      <o:OfficeDocumentSettings>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                    </xml>
                  </noscript>
                  <![endif]-->
                    <style>
                        table,
                        td,
                        div,
                        h1,
                        p {
                            font-family: Arial, sans-serif;
                        }
                    </style>
                </head>
                
                <body style="margin:0;padding:0;">
                    <table role="presentation"
                        style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                        <tr>
                            <td align="center" style="padding:0;">
                                <table role="presentation"
                                    style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                                    <tr>
                                        <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                                            <img src="https://assets.codepen.io/210284/h1.png" alt="" width="300"
                                                style="height:auto;display:block;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:36px 30px 42px 30px;">
                                            <table role="presentation"
                                                style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                                <tr>
                                                    <td style="padding:0 0 36px 0;color:#153643;">
                                                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                                                            Welcome To MAmin Education</h1>
                                                        <p
                                                            style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus
                                                            adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget
                                                            accumsan et dictum, nisi libero ultricies ipsum, posuere neque at erat.</p>
                                                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Your
                                                            Code : ${user.SMSCode}</h1>
                                                        <p
                                                            style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                            <a href="http://www.example.com"
                                                                style="color:#ee4c50;text-decoration:underline;">contact@mamin.com</a>
                                                        </p>
                
                                                    </td>
                                                </tr>
                
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:30px;background:#ee4c50;">
                                            <table role="presentation"
                                                style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                                <tr>
                                                    <td style="padding:0;width:50%;" align="left">
                                                        <p
                                                            style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                                            &reg; Education, MAmin 2023<br /><a href="http://www.example.com"
                                                                style="color:#ffffff;text-decoration:underline;">Unsubscribe</a>
                                                        </p>
                                                    </td>
                                                    <td style="padding:0;width:50%;" align="right">
                                                        <table role="presentation"
                                                            style="border-collapse:collapse;border:0;border-spacing:0;">
                                                            <tr>
                                                                <td style="padding:0 0 0 10px;width:38px;">
                                                                    <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                                                            src="https://assets.codepen.io/210284/tw_1.png"
                                                                            alt="Twitter" width="38"
                                                                            style="height:auto;display:block;border:0;" /></a>
                                                                </td>
                                                                <td style="padding:0 0 0 10px;width:38px;">
                                                                    <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                                                            src="https://assets.codepen.io/210284/fb_1.png"
                                                                            alt="Facebook" width="38"
                                                                            style="height:auto;display:block;border:0;" /></a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                
                </html>
        
                `,

                // An array of attachments
                attachments: [

                    // Binary Buffer attachment
                    {
                        filename: 'image.png',
                        content: Buffer.from(
                            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                            '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                            'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                            'base64'
                        ),

                        cid: 'note@example.com' // should be as unique as possible
                    },

                    // File Stream attachment
                    {
                        filename: 'nyan cat ✔.gif',
                        path: __dirname + '/assets/images/cat.gif',
                        cid: 'nyan@example.com' // should be as unique as possible
                    }
                ],
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    });
});
//======================== End Nodemailer configuration ==============================

// ============================
// ======= User Config ========
// ============================

// GET all users (Role Tri)
app.get("/users", (req, res) => {
    const roles = ["teacher", "parent", "student"];
    User.find({ role: { $in: roles } }).then((users) => {
        console.log("Here into BL: GET all User");
        const usersTri = users.sort((a, b) => {
            const roleOrder = { "teacher": 1, "parent": 2, "student": 3 }
            return roleOrder[a.role] - roleOrder[b.role]
        });
        res.json({ users: usersTri });
    })
})

// GET User by ID
app.get("/users/:id", (req, res) => {
    let id = req.params.id;
    User.findOne({ _id: id }).then((doc) => {
        console.log("Here into BL: GET User By ID")
        res.json({ user: doc });
    });
});

// GET User by phone
app.get("/users/phone/:phone", (req, res) => {
    let phone = req.params.phone;
    User.find({ phone: phone }).then((data) => {
        console.log("Here into BL: GET User By Phone", data);
        res.json({ user: data });
    });
});

//GET users by role
app.get("/users/byRole/:id", (req, res) => {
    User.find({ role: req.params.id }).then((doc) => {
        console.log("Here into BL: GET User By role",doc)
        res.json({ users: doc });
    });
});

// DELETE user By ID
app.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }).then((response) => {
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    });
});

// EDIT User
app.put("/users", (req, res) => {
    console.log("Here into BL: EDIT User By ID")
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        req.body.password = cryptedPwd;
        User.updateOne({ _id: req.body._id }, req.body).then((response) => {
            if (response.nModified == 1) {
                res.json({ isUpdated: true })
            } else {
                res.json({ isUpdated: false })
            }
        });
    });
});

// Confirm validation to user account
app.put("/users/:id", (req, res) => {
    let id = req.params.id;
    console.log("Here into BL: Valid user account")
    User.updateOne({ _id: id }, { status: "valid" }).then((response) => {
        if (response.nModified == 1) {
            res.json({ isUpdated: true })
        } else {
            res.json({ isUpdated: false })
        }
    });
});

// * Signup Student Methode *
app.post("/users/signup-student", (req, res) => {
    // Traitement logique
    let url = req.protocol + '://' + req.get('host');

    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: cryptedPwd,
            category: req.body.category,
            country: req.body.country,
            status: req.body.status,
            userClass: req.body.userClass,
            bio: req.body.bio,
            role: req.body.role,
            SMSCode: "0",
            img: url + '/assets/images/avatar-profil.png',
        },
        );
        console.log("Here into BL: Student : ", user);
        console.log("Here into BL: crypted password :", cryptedPwd);
        user.save().then((doc) => {
            if (doc) {
                res.json({ message: true });
            }
        }).catch((err) => {
            console.log("here err", err);
            if (err) {
                res.json({ message: false });
            }
        });
    });
});

// * Signup Teacher Methode *
app.post("/users/signup-parent", (req, res) => {
    // Traitement logique
    let url = req.protocol + '://' + req.get('host');
    let result = false;
    let users = [];
    let studentNumber = req.body.studentNumber

    // Get All Users from DB
    User.find().then((docs) => {
        users = docs
    })

    // Add new user with crypted password 
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        //Check student number is exist or not
        for (let i = 0; i < studentNumber.length; i++) {
            result = false;
            for (let j = 0; j < users.length; j++) {
                if (studentNumber[i].studentPhone == users[j].phone && users[j].role == "student") {
                    result = true;
                }
            }
        }
        // if student number exist second part (add new user) 
        if (result) {
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: cryptedPwd,
                country: req.body.country,
                status: req.body.status,
                role: req.body.role,
                SMSCode: "0",
                studentNumber: req.body.studentNumber,
                img: url + '/assets/images/avatar-profil.png'
            },
            );
            console.log("Here into BL: Parent", user);
            user.save().then((doc) => {
                if (doc) {
                    res.json({ message: true });
                }
            }).catch((err) => {
                console.log("here err", err);
                if (err) {
                    res.json({ message: false });
                }
            });
        } else {
            console.log("Student Do Not Exist.");
            res.json({ message: false, errMessage: "Student(s) Do Not Exist." });
        }
    });
});

// * Signup Admin Methode *
app.post("/users/signup-admin", (req, res) => {
    // Traitement logique
    let url = req.protocol + '://' + req.get('host');
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: cryptedPwd,
            status: 'valid',
            country: req.body.country,
            bio: req.body.bio,
            role: req.body.role,
            img: url + '/assets/images/avatar-profil.png'

        },
        );
        console.log("Here into BL: Admin : ", user);
        console.log("Here into BL: crypted password :", cryptedPwd);
        user.save().then((doc) => {
            if (doc) {
                res.json({ message: true });
            }
        }).catch((err) => {
            console.log("here err", err);
            if (err) {
                res.json({ message: false });
            }
        })
    })
});

// * Signup Teacher Methode *
app.post("/users/signup-teacher", multer({ storage: storagePdf }).single('cv'), (req, res) => {
    // Traitement logique
    let url = req.protocol + '://' + req.get('host');
    // Crypted password and saving into data base
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: cryptedPwd,
            country: req.body.country,
            status: req.body.status,
            speciality: req.body.speciality,
            bio: req.body.bio,
            role: req.body.role,
            SMSCode: "0",
            img: url + '/assets/images/avatar-profil.png',
            cv: url + '/assets/files/' + req.file.filename,
        });
        console.log("Here into BL: Teacher  ", user);
        console.log("Here into BL: crypted password :", cryptedPwd);
        user.save().then((doc) => {
            if (doc) {
                res.json({ message: true });
            }
        }).catch((err) => {
            console.log("here err", err);
            if (err) {
                res.json({ message: false });
            }
        });
    });
});

// * Login Methode *
app.post("/users/login", (req, res) => {
    let user = req.body;
    let userToSend;

    if (user.userAcces.includes('@')) {
        // Login With Email only
        User.findOne({ email: user.userAcces }).then((response) => {
            if (!response) {
                res.json({ message: "1" });
            }
            userToSend = response;
            // Decrypt password and compare with new data
            return bcrypt.compare(user.password, response.password);
        }).then((pwdResponse) => {

            if (!pwdResponse) {
                res.json({ message: "1" });
            } else {
                const token = jwt.sign(
                    {
                        email: userToSend.email,
                        userId: userToSend._id,
                        userRole: userToSend.role,
                    },
                    "Testing",
                    { expiresIn: "1min" }
                );

                // Import user Data
                let newUser = {
                    id: userToSend._id,
                    firstName: userToSend.firstName,
                    access: userToSend.email,
                    status: userToSend.status,
                    lastName: userToSend.lastName,
                    role: userToSend.role,
                    img: userToSend.img,
                    jwt: token,
                    expiresIn: 60,
                }
                console.log("here into BL: Login User", newUser)
                res.json({ user: newUser, message: "2" });
            }
        });
    } else {
        // Login With Password only
        User.findOne({ phone: user.userAcces }).then((response) => {
            if (!response) {
                res.json({ message: "1" });
            }
            userToSend = response;
            // Decrypt password and compare with new data
            return bcrypt.compare(user.password, response.password);
        }).then((pwdResponse) => {
            if (!pwdResponse) {
                res.json({ message: "1" });
            } else {

                const token = jwt.sign(
                    {
                        phone: userToSend.phone,
                        userId: userToSend._id,
                        userRole: userToSend.role,
                    },
                    "Testing",
                    { expiresIn: "1min" }
                );

                // Import user Data
                let newUser = {
                    id: userToSend._id,
                    firstName: userToSend.firstName,
                    access: userToSend.phone,
                    lastName: userToSend.lastName,
                    status: userToSend.status,
                    role: userToSend.role,
                    img: userToSend.img,
                    jwt: token,
                    expiresIn: 60,
                }
                console.log("here into BL: Login User", newUser)
                res.json({ user: newUser });
            };
        });
    };
});

// * update Photo Profile *
app.put("/users/dashboard-profil/:id", multer({ storage: storage }).single('img'), (req, res) => {
    // Traitement logique
    console.log("Here into BL: update photo profil ");
    let imgPath;
    let id = req.params.id
    let url = req.protocol + '://' + req.get('host');
    imgPath = (req.file) ? url + '/assets/images/' + req.file.filename : url + '/assets/images/avatar.png';
    User.findOneAndUpdate({ _id: id }, { img: imgPath }).then((response) => {
    });
});

// GET all applyed to courses
app.get("/users/applyedStudent/all", (req, res) => {
    ApplyedToCourse.find().then((doc) => {
        res.json({ applyed: doc });
        console.log("Here into BL: GET all applyed students", doc)
    });
});

// GET applyed course by ID
app.get("/users/applyedToCourse/:id", (req, res) => {
    let id = req.params.id;
    ApplyedToCourse.find({ userId: id }).then((doc) => {
        res.json({ applyed: doc });
        console.log("get applyed courses", doc)
    });
});

// ============================
// ======= END User Config ====
// ============================

// ----------------------------

// ============================
// ======= Course Config ======
// ============================


// GET all courses
app.get("/courses", (req, res) => {
    Course.aggregate(
        [
            {
                $lookup: {
                    from: "applyedtocourses", // collection to join
                    localField: "_id", //field from the input documents
                    foreignField: "courseId", //field from the documents of the "from" collection
                    as: "applyedStudent", // output array field
                },
            },
            {
                $lookup: {
                    from: "feedbacks", // collection to join
                    localField: "_id", //field from the input documents
                    foreignField: "courseId", //field from the documents of the "from" collection
                    as: "feedbacks", // output array field
                },

            },
        ],
    ).then((data) => {
        console.log("Here into BL: GET all courses", data)
        res.json({ courses: data });
    })

});

// GET single course by Id
app.get("/courses/:id", (req, res) => {
    Course.findById({ _id: req.params.id }).then((doc) => {
        console.log("Here into BL: GET course by ID", doc)
        res.json({ course: doc });
    });
});

// DELETE Course By ID
app.delete("/courses/:id", (req, res) => {
    console.log("Here into BL: DELETE course by ID ",req.params.id)
    let id = req.params.id;
    Course.deleteOne({ _id: id }).then((response) => {
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    })
});

// Find courses by category
app.get("/courses/searsh/:id", (req, res) => {
    console.log("Here into BL: Searsh course by category", req.params.id)
    Course.find({ category: req.params.id }).then((doc) => {
        res.json({ course: doc });
    });
});

// Submit Course
app.post("/courses/:id", multer({ storage: storageVid }).single('video'), (req, res) => {

    let id = req.params.id;
    let url = req.protocol + '://' + req.get('host');

    let course = new Course({
        title: req.body.title,
        level: req.body.level,
        category: req.body.category,
        hours: req.body.hours,
        language: req.body.language,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        video: url + '/assets/video/' + req.file.filename,
        videoCategory: req.body.month,
        description: req.body.description,
        videoTitle: req.body.videoTitle,
        userId: id,
    });
    console.log("Here into BL: Submit Course",course)
    course.save().then((doc) => {
        if (doc) {
            res.json({ message: true });
        }
    }).catch((err) => {
        console.log("here err", err);
        if (err) {
            res.json({ message: false });
        }
    });
});

// Applyed To Course
app.post("/courses/course-details/:applyed", (req, res) => {
    let exist = false;
    let course = req.body
    let id = req.body._id;
    let applyed = req.params.applyed;
    // connected user Data
    User.findById({ _id: applyed }).then((data) => {
        if (data && data.role == 'student') {
            //searsh if student already exist
            ApplyedToCourse.find({ courseId: new ObjectId(course._id) }).then((applyedCourses) => {
                for (let i = 0; i < applyedCourses.length; i++) {
                    if (applyedCourses[i].userId.toString() == data._id) {
                        exist = true;
                        res.json({ message: true });
                        break;
                    }
                }
                console.log(" Here into BL: Student exist : ", exist)
                //if student exist then apply
                if (!exist) {
                    const applyedToCourse = new ApplyedToCourse({
                        userId: new ObjectId(applyed),
                        courseId: new ObjectId(id),
                        note: '0',
                        title: course.title,
                        day: course.day,
                        month: course.month,
                        year: course.year,
                        category: course.category,
                        description: course.description,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    })
                    console.log("Here into BL: applyed to course ", applyedToCourse)
                    applyedToCourse.save();
                }
            })
        }
    })
})

// GET all Applyed To Course
app.get("/courses/myCourse/:id", (req, res) => {
    console.log(" Here into BL: GET all Applyed To Courses ")
    ApplyedToCourse.find().then((doc) => {
        res.json({ applyed: doc });
    });
});

// Affect note to student
app.put("/courses/postNote/:id", (req, res) => {
    console.log("Here into BL: Affect note to student")
    let id = req.params.id
    ApplyedToCourse.updateOne({ userId: new ObjectId(id), courseId: new ObjectId(req.body.courseId) }, { note: req.body.note }).then((response) => {
        res.json({ isConfirmed: true })
    });
});

//------------ feedback Part ------------------------
// Submit feedback
app.post("/courses/feedback/:courseId/:userId", (req, res) => {
    let courseId = req.params.courseId
    let userId = req.params.userId
    User.findOne({ _id: userId }).then((docs) => {
        const feedback = new Feedback({
            message: req.body.message,
            userId: new ObjectId(userId),
            courseId: new ObjectId(courseId),
            firstName: docs.firstName,
            lastName: docs.lastName,
            img: docs.img
        });
        console.log("Here into BL: Submit feedback", feedback);
        feedback.save();
    });
});

// GET feedback By course ID
app.get("/courses/feedbacks/:id", (req, res) => {
    Feedback.find({ courseId: req.params.id }).then((doc) => {
        console.log("Here into BL: GET feedback by Course ID : ", doc)
        res.json({ feedbacks: doc });
    });
});

// GET All courses with feedbacks and applyed courses 
app.get("/courses/all-courses/here", (req, res) => {
    Feedback.find().then((doc) => {
        console.log("Here into BL: GET all feedback ")
        res.json({ feedbacks: doc });
    });
});

// GET all feedback 
app.get("/courses/all-feedbacks/here", (req, res) => {
    Feedback.find().then((doc) => {
        console.log("Here into BL: GET all feedback ")
        res.json({ feedbacks: doc });
    });
});

// GET feedbacks By Id
app.get("/courses/getfeedbacksById/:id", (req, res) => {
    let id = req.params.id
    Feedback.find().then((doc) => {
        console.log("Here into BL: GET feedbacks By Id ",doc)
        res.json({ feedbacks: doc });
    });
});
// ----------- End feedback Part -----------------

// ============================
// ==== Affectation Config ====
// ============================

// Affect student to teacher
app.post("/users/affect-student/:teacherId", (req, res) => {
    // Traitement logique
    let user = req.body
    teacherId = req.params.teacherId;
    Affectation.find({ studentId: new ObjectId(user._id), teacherId: new ObjectId(teacherId) }).then((data) => {
        if (data.length <= 0) {
            let affectation = new Affectation(
                {
                    studentId: new ObjectId(user._id),
                    teacherId: new ObjectId(teacherId),
                }
            );
            affectation.save()
            res.json({ message: 'Student Affected' })
            console.log("Here into BL: Student Affected", affectation)

        } else {
            console.log("Here into BL: Already Affected !")

            res.json({ message: 'Already Affected' })
        }
    });
});

// GET all affectations
app.get("/users/affect-teacher/:studentId", (req, res) => {
    studentId = req.params.studentId;
    User.aggregate(
        [
            {
                $lookup: {
                    from: "affectations", // collection to join
                    localField: "_id", //field from the input documents
                    foreignField: "studentId", //field from the documents of the "from" collection
                    as: "comment", // output array field
                },

            },
        ],
    ).then((resp) => {
        let teachers = resp
        res.json({ teachers: resp })
        console.log(" Here into BL: GET all affectations", teachers)
    });
});

// GET all affectatuions
app.get("/users/getAllAffectedStudent/:teacherId", (req, res) => {
    let teacherId = req.params.teacherId;
    Affectation.find({ teacherId: teacherId }).then((data) => {
        res.json({ teachers: data })
        console.log("*-------------", data)
    });
});

// ============================
// == END Affectation Config ==
// ============================

//make app importable
module.exports = app;
