import React, { useEffect, useState, useRef } from "react";
import "../Message.css";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";
import InputEmoji from "react-input-emoji";

function Message({ timestamp, message, user }) {
  const messagesEndRef = useRef(null);
  const [userName, setUserName] = useState("Uday");
  const [inputMessage, setInputMessage] = useState("");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    console.log(localStorage.getItem("user"));
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUserName(localUser["name"]);
    scrollToBottom();
  });
  const handleMessageValueChange = (event) => {
    if (event === "") {
      return;
    }
    setInputMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: user.id,
        content: message,
      });
      setInputMessage("");
    }
  };

  return (
    <div className="message">
      <div className="message__info">
        <h5>
          {userName}
          <span className="message__timestamp">
            {new Date(parseInt(timestamp)).toDateString()}{" "}
            {new Date(parseInt(timestamp)).getHours()}
            {":"}
            {new Date(parseInt(timestamp)).getMinutes()}
          </span>
        </h5>
        <InputEmoji
          placeholder={`Write message to ${user.username}`}
          value={message}
          cleanOnEnter
          onChange={setInputMessage}
          onEnter={handleSendMessage}
        />
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Message;
