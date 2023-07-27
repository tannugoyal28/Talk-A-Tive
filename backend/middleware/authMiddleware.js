const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "Tannu");
  
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      } catch (error) {
        console.log(error);
        console.log(token);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      console.log("jo");
      console.log(token);
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
  