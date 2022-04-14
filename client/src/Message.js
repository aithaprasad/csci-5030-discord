import React, { useEffect, useState } from "react";
import "../Message.css";

function Message({ timestamp, message, user }) {
  const [userName, setUserName] = useState("Uday");
  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    console.log(localStorage.getItem("user"));
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUserName(localUser["name"]);
  });
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
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
