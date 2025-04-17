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

export function Composer({ onAttach, onSend, placeholder = "Type your message here...", buttonLabel = "Send", disabled = false }: {
  onAttach?: any;
  onSend: (content: any) => void;
  placeholder?: string;
  buttonLabel?: string;
  disabled?: boolean;
}) {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() !== "" && !disabled) {
      onSend([
        { type: "text", value: input }
      ]);
      setInput("");
    }
  };

  return (
    <div className="composer-container">
      <textarea
        placeholder={placeholder}
        className="composer-textarea"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      ></textarea>
      <div className="composer-buttons">
        <ComposerButton icon={attachIcon} onclick={onAttach} />
        <ComposerButton icon={sendIcon} onclick={handleSend} />
      </div>
    </div>
  );
}
