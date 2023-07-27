const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
},
{
    timestamps:true,
});

userModel.methods.matchPassword = async function(P){
    return await bcrypt.compare(P,this.password);
}

//before saving the data in database its gonna encrypt the password
userModel.pre('save',async function(next){
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10); //generating a new salt , higher the salt number stronger the salt
    this.password = await bcrypt.hash(this.password,salt);
})

const User = new mongoose.model('User',userModel);
module.exports=User;