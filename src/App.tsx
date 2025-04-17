import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatPage from './pages/ChatPage/ChatPage';
import NewChatPage from './pages/NewChatPage/NewChatPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewChatPage />} />
      <Route path="/chat/:chatId" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
