const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', (req, res) => {
    const username= req.body.username;
    const password=req.body.password;

    User.create({
        username,
        password
    })
    res.json({
        msg:"user created successfully"
    })
    // Implement user signup logic
});

router.get('/courses', async (req, res) => {
    const response= await Course.find({});

    res.json({
        courses:response
    }) 
    // Implement listing all courses logic
  
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseid= req.params.courseid;
    const username = req.headers.username;


    User.updateOne({
        username:username
    },{
        purchasedcourses:{
            "$push":courseid
        }
    });
    res.json({
        msg:"purchase completed"
    }) 
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {

   const user = await  User.findOne({
            username:req.headers.username
    });
    const courses= await Course.findOne({
        _id:{
            "&in":user.purchasedcourses 
        }
    });
    res.json({
        courses:courses      
    })
    // Implement fetching purchased courses logic
  
});

module.exports = router