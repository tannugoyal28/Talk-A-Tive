const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Tannu:9896@cluster0.paanyym.mongodb.net/CHATAPP";
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true,
        });
        console.log(`connected to database:${conn.connection.host}`);
    }catch(e){
        console.log(`Error: ${e}`);
        process.exit(1);
    }
};

module.exports= connectDB;