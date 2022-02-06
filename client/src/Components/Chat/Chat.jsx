import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const Chat = ({token}) => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient.connect(ENDPOINT);
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
