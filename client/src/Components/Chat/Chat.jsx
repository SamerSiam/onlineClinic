import React, { useState, useEffect } from "react";
import ChatUrl from '../../api/Chat'
import socketIOClient from "socket.io-client";
let ENDPOINT = "http://127.0.0.1:5000";
if (process.env.NODE_ENV === "production") {
  ENDPOINT = "https://samer-online-clinic.herokuapp.com/";
}
const socket = socketIOClient.connect(ENDPOINT);


const Chat = ({token}) => {
    const [response, setResponse] = useState("");
    const [count, setCount]=useState(0)

    
    const handleClick = (event) => {
      console.log("click button")
     socket.emit('increment')
    };


    useEffect(() => {
        
        socket.on("countUpdated", (data) => {
          console.log('the count been updated',data)
          setCount(data);
        });
        // return () => socket.disconnect();
      }, []);
    
      return (
        <p>
         Counter coming from the server <br/>{count}<br/> 
         <button id="inc" onClick= {(e)=>handleClick()} > +1</button>
        </p>
      );
}

export default Chat
