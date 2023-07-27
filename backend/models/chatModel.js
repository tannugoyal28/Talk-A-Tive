//chatName
//isGroupChat
//users
//latestMessage
//groupAdmin

const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId, //special type typically used for unique identifiers
        ref:"User",
    },
],
latestMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"message",
},
groupAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
},
{
    timestamps:true,
}
);

const Chat = new mongoose.model('Chat', chatModel);
module.exports = Chat;

