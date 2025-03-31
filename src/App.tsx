import { useState } from "react";
import "./App.css";
import { Greeting } from "./components/Greeting/Greeting";
import { Routes, Route } from "react-router-dom";
import { Composer } from "./components/Composer/Composer";

function HomepageWrapper() {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-content">
          <Greeting username="user" />
          <Composer />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomepageWrapper />} />
    </Routes>
  );
}

export default App;
