import React from 'react';
import './Input.css';

function Input({message,setMessage,sendMessage}) {
    return (
        <div>
            <form className="form">
            <input className="input" type="text" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} onKeyPress={e=>e.key==='Enter' ? sendMessage(e) : null}></input>   
         <button className="sendButton" onClick={(e)=>sendMessage(e)}>Send</button>
            </form>
        </div>
    )
}

export default Input
