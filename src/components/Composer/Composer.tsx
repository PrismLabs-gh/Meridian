import "./Composer.css";
import attachIcon from "../../assets/icons/png/attach.png";
import sendIcon from "../../assets/icons/png/send.png";
import { useState } from "react";

function ComposerButton({ icon, onclick }: { icon: string; onclick: any }) {
  return (
    <button className="composer-button" onClick={onclick}>
      <img className="composer-button-icon" src={icon} alt="" />
    </button>
  );
}

export function Composer({ onAttach, onSend }: { onAttach: any; onSend: any }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="composer-container">
      <textarea
        placeholder="Type your message here..."
        className="composer-textarea"
        value={input}
        onChange={(e) => handleInputChange(e)}
        onKeyPress={handleKeyPress}
      ></textarea>
      <div className="composer-buttons">
        <ComposerButton icon={attachIcon} onclick={onAttach} />
        <ComposerButton icon={sendIcon} onclick={handleSend} />
      </div>
    </div>
  );
}
