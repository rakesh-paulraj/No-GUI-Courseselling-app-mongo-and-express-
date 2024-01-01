const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

router.post('/signup', async (req, res) => {
    const username= req.body.username;
    const password= req.body.password;


      await Admin.create({
        username:username,
        password:password
    })
    res.json({
        msg:"admin created successfully"
    })

    // Implement admin signup logic
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const imagelink=req.body.imagelink;
    const price=req.body.price;
    
    const newcourse=await Course.create({
        title,
        description,
        imagelink,
        price
    })
    
    res.json({
        msg:"course created successfully",courseid:newcourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {

    const response= await Course.find({});

    res.json({
        courses:response
    })
    // Implement fetching all courses logic

   

});


module.exports = router;