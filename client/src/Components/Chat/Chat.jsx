import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import dateFormat from "dateformat";
// import "./styles.min.css";
import "./styles.css";

let ENDPOINT = "http://127.0.0.1:5000";
if (process.env.NODE_ENV === "production") {
  ENDPOINT = "https://samer-online-clinic.herokuapp.com/";
}

const Chat = ({ user }) => {
  let textInput = React.createRef();

  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [message, setMessage] = useState("");
  const [messageObj, setMessageObj] = useState({});
  const [totalMessage, setTotalMessages] = useState([]);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const newSocket = socketIOClient.connect(ENDPOINT);
    setSocket(newSocket);
    newSocket.on("message", (data) => {
      console.log("response from the server:", data.createdAt);
      setResponse(data.text);
      // setResponse((prev) => prev + "\n" + data.text);
      setCreatedAt(createdAt);
    });

    return () => newSocket.disconnect();
  }, [setSocket]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  /******************************click */
  const handleClick = (event) => {
    textInput.current.focus();
    socket.emit("sendMessage", message, (error) => {
      if (error) {
        console.log(error);
        setError(error);
      }
      setConfirm("Delivered");
    });
  };

  /********************************************* */

  return (
    <div className="chat">
      <div className="chat__sidebar"></div>

      <div className="chat__main">
        <div className="chat__messages"> </div>

        <div className="message">
          <p>
            <span className="message__name"> {user.user.fname}</span>
            <span className="message__meta"> {dateFormat(createdAt, "shortTime")}</span>
          </p>
          <p>{response} </p>
        </div>

        <div className="compose">
          <form id="message-form" onSubmit={handleSubmit}>
            <input
              ref={textInput}
              name="message"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button id="send" onClick={(e) => handleClick()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
