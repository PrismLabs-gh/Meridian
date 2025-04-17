import React from 'react';
import { Greeting } from '../../components/Greeting/Greeting';
import { Composer } from '../../components/Composer/Composer';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { db, Chat, Message } from '../../db';

const NewChatPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSend = (content: any) => {
    // Create a new chat and redirect to it with the first message
    const now = new Date().toISOString();
    const newId = uuidv4();
    const newChat: Chat = {
      id: newId,
      title: content[0]?.value?.slice(0, 32) || 'New Chat',
      lastModified: now
    };
    db.chats.add(newChat).then(() => {
      const newMsg: Message = {
        id: uuidv4(),
        chatId: newId,
        role: 'user',
        content
      };
      db.messages.add(newMsg).then(() => {
        navigate(`/chat/${newId}`);
      });
    });
  };
  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-content">
          <Greeting username="user" />
          <Composer onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default NewChatPage;
