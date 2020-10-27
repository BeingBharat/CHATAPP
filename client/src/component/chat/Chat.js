import React,{useEffect,useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../infobar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import './Chat.css'
let socket;
const Chat =({location})=>{

    const ENDPOINT='https://react-chat-app-by-bharat.herokuapp.com/';

    const [name,setName]=useState('');
    const [users,setUsers]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);

  
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        socket=io(ENDPOINT);
        socket.emit('join',{name,room},(e)=>{
        })
        console.log(socket)
        setName(name);
        setRoom(room);

     return ()=>{
         socket.emit('disconnect');
         socket.off();
     }  
    },[ENDPOINT,location.search])


    useEffect(()=>{
       
        socket.on('message',(message)=>{
setMessages([...messages,message])
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
   
    },[messages,message])
    const sendMessage=(e)=>{
        e.preventDefault();
        if(e){
            socket.emit('sendMessage',message,()=>setMessage(''));
        
        }
    }
    console.log(message,messages)
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
            <TextContainer users={users}/>
        </div>
    )
}
export default Chat; 