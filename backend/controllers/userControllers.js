const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

exports.registerUser = asyncHandler(async (req,res) =>{
    const {name, email, password , pic} = req.body; 

    if(!name || !email || !password){ //In case you didn't fill all the necessary details
        res.status(400);
        throw new Error('please Enter all the details');
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("user already exists");
    }

    const user = await User.create({ //to create a new user 
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create new user");
    }
});

exports.authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({ email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

exports.allUsers = asyncHandler(async(req,res)=>{
     const keyword = req.query.search ? {
        $or:[
            {name:{ $regex:req.query.search,$options:"i"}}, //regex provides regular expression capabilites for pattern matching strings in query
            {email:{ $regex:req.query.search,$options:"i"}},

        ]
     } : {}
     
     const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
     res.send(users);
});
