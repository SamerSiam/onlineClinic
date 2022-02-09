import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Message from "../MessageInput/Message";

// import "./styles.min.css";
import "./styles.css";

// setup connection for both dev and production
let ENDPOINT = "http://127.0.0.1:5000";
if (process.env.NODE_ENV === "production") {
  ENDPOINT = "https://samer-online-clinic.herokuapp.com/";
}

const Chat = ({ user }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [socket, setSocket] = useState(null);
  const [messageArr, setMessageArr] = useState([]);

  // const [error, setError] = useState("");

  useEffect(() => {
    setCurrentUser(user);

    // establish socket connection to the server
    const newSocket = socketIOClient.connect(ENDPOINT);
    setSocket(newSocket);

    //listen to messages coming from the server
    newSocket.on("message", (data) => {
      const messageObject = JSON.parse(JSON.stringify(data));

      // save the messages inside an array to display them
      setMessageArr((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.push(messageObject);
        return newMessages;
      });
    });

    // disconnect socket once component unmountes
    return () => newSocket.disconnect();
  }, [setSocket, user]);

  /********************Render Messages Array************************* */
  const renderMessages = () => {
    return messageArr.map((msg) => {
      return (
        <div className="message">
          <p>
            <span className="message__name"> {msg.username}</span>
            <span className="message__meta"> {msg.createdAt}</span>
          </p>
          <p>{msg.text} </p>
        </div>
      );
    });
  };

  /******************************************************************* */

  return (
    <div className="chat">
      <div className="chat__sidebar"></div>
      <div className="chat__main">
        <div className="chat__messages"> </div>
        {renderMessages()}
        <div className="compose">
          {socket && currentUser ? <Message socket={socket} user={currentUser} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Chat;
