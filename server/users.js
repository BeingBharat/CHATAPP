const users=[];

const addUser =({id,name,room})=>{
console.log("test1")

name=name.trim().toLowerCase();
room=room.trim().toLowerCase();
const exitingUser=users.find((user)=>{
    user.room===room && user.name===name
});
if(exitingUser){
    return {error:"UserName is taken"}
}

const user ={id,name,room};
users.push(user);
console.log(user)
return {user};
}

const removeUser=(id)=>{
const index=users.findIndex((user)=>user.id===id);
if(index !== -1){
    return users.splice(index,1)[0];
}
}

const getUser=(id)=>users.find((user)=>user.id===id);

const getUserInRoom=(room)=>users.filter((user)=>user.room===room);

module.exports={addUser,removeUser,getUser,getUserInRoom};