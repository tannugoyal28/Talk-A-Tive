const jwt = require('jsonwebtoken');
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET || "Tannu",{
        expiresIn:'30d',
    });
};

module.exports = generateToken;