import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://samer-online-clinic.herokuapp.com/";

const Chat = ({token}) => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setResponse(data);
        });
      }, []);
    
      return (
        <p>
         hi from the socket
        </p>
      );
}

export default Chat
