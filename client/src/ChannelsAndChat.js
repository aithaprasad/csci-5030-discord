import React from "react";
import "../ChannelsAndChat.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const ChannelsAndChat = () => {
  return (
    <div className="app">
      <Sidebar />
      <Chat />
    </div>
  );
};
export default ChannelsAndChat;
