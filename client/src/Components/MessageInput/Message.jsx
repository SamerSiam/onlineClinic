import React, { useState, useRef } from "react";
import dateFormat from "dateformat";

const NewMessage = ({ socket, user }) => {
  const textInput = useRef();
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
      username: user.fname,
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
