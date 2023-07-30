const express = require('express');
const chats = require('./data/data.js');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const {notFound , errorHandler} = require('./middleware/errorMiddleware.js')
const path = require('path');


dotenv.config();
connectDB();

const app = express();
app.use(express.json()); //to accept JSON data
app.use(cors({
    allow:"*"
}))

app.get('/',(req,res)=>{
        res.send("API is running");
}); 

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

//user defined middlewares
app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 5000;
const server = app.listen(Port,()=>{
    console.log(`server listening to port number ${Port}`);
})

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"*",
    },
});

io.on("connection",(socket)=>{
    // console.log('connected to socket.io');

    socket.on('setup',(userData)=>{ //creating new socket where frontend will send some data and we'll join a room
         socket.join(userData._id); //create a new room for particular user using his id
         socket.emit("connected");
    });

    socket.on('join chat',(room)=>{ //creating new socket where frontend will send some data and we'll join a room
        socket.join(room); //create a new room for particular user using his id
    });

    socket.on('new message',(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user)=>{
            if(user._id==newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved",newMessageRecieved);
        })
    })

    socket.on('typing',(room)=>socket.in(room).emit('typing'));
    socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'));

    socket.off('setup',()=>{
        console.log('user disconnected');
        socket.leave(userData._id);
    })
})