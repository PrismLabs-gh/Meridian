import React from 'react';
import { Message } from '../../db';

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="messages-list">
      {messages.length === 0 && <div className="empty">No messages yet.</div>}
      {messages.map((msg) => (
        <div key={msg.id} className={`message message-${msg.role}`}>
          {msg.content.map((item, idx) =>
            item.type === 'text' ? (
              <div key={idx} className="message-text">{item.value}</div>
            ) : (
              <img key={idx} src={item.value} alt="sent-img" className="message-image" />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
