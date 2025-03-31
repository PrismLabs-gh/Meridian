import "./Greeting.css";

import { useState } from "react";

export function Greeting({ username }: { username: string }) {
  const greetings = [
    `Hello ${username}.`,
    `Hey ${username},`,
    `Hey ${username}.`,
    `Welcome back, ${username}.`,
    `Howdy, ${username}!`,
    `What's up, ${username}?`,
    `Good to see you, ${username};`,
    `Ask away!`,
    ``
  ];

  const [greeting] = useState(() => {
    const newGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    localStorage.setItem("greeting", newGreeting);
    return newGreeting;
  });
  return (
    <div className="greeting-container">
      <span className="greeting-top">{greeting}</span>
      <span className="greeting-bottom">How can I help you?</span>
    </div>
  );
}