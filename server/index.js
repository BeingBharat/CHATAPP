const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const router=require('./router');
const {addUser,getUser,removeUser,getUserInRoom}=require('./users');
const cors=require('cors');
const PORT=process.env.PORT || 5000;

const app=express();
const server =http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        const {error,user}=addUser({id:socket.id,name,room});
        console.log(user)       
        if(error) return callback(error);

 

        socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`});
      
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined the room`});
        socket.join(room);
        io.to(user.room).emit('roomData',{room:user.room,users:getUserInRoom(user.room)});
    callback();
    });

    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name,text:message});
        io.to(user.room).emit('roomData',{room:user.room,users:getUserInRoom(user.room)});

        callback();
    });
    console.log("we have new connection !!")

socket.on('disconnect',()=>{
    console.log("user has left");
    const user =removeUser(socket.id);
    if(user){
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
    }
});
});
app.use(router);
app.use(cors());


server.listen(PORT,()=> console.log(`server started on port ${PORT}`));