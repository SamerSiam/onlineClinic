import React, { useState, useRef } from "react";
import dateFormat from "dateformat";
// import './MessageInput.css';

const NewMessage = ({ socket, user }) => {
  const textInput = useRef();
  console.log("inside messages:", user);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const msgObj = generateMessage(value);
    console.log("msg object", msgObj);
    socket.emit("sendMessage", msgObj, (error) => {
      if (error) {
        setError(error);
      }
    });

    setValue("");
    setError("");
    textInput.current.focus();
  };

  const generateMessage = (text) => {
    return {
      text,
      createdAt: dateFormat(new Date().getTime(), "shortTime"),
      username: user.user.fname,
    };
  };
  return (
    <div>
      {error}

      <form onSubmit={submitForm}>
        <input
          ref={textInput}
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default NewMessage;
