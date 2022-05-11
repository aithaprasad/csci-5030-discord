import React, { useEffect, useState, useRef } from "react";
import "../Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import axios from "./Axios";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [userName, setUserName] = useState("Uday");
  const [inputMessage, setInputMessage] = useState("");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getConversation = (channelId) => {
    if (channelId) {
      axios.get(`/get/conversation?id=${channelId}`).then((res) => {
        setMessages(res.data[0].conversation);
      });
    }
  };

  useEffect(() => {
    getConversation(channelId);
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUserName(localUser["name"]);
    scrollToBottom();
  }, [channelId]);

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

  const handleSendMessage = (message) => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: user.id,
        content: message,
      });
      setInputMessage("");
    }
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.messages}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
