import React, { useState, useEffect } from "react";

import randomColor from "randomcolor";
import "./App.css";

function App() {
  const [backgroundTimer, setBackgroundTimer] = useState(0);
  const [divTimer, setDivTimer] = useState(0);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const updateTime = () => {
      if (backgroundTimer === 20) {
        setBackgroundTimer(0);
        setColor(randomColor());
      } else {
        setBackgroundTimer((time) => time + 1);
      }
    };

    const token = setTimeout(updateTime, 1000);
    return function cleanUp() {
      clearTimeout(token);
    };
  }, [backgroundTimer]);

  useEffect(() => {
    const updateTime = () => {
      if (divTimer > 0) {
        setDivTimer((time) => time - 1);
      }
    };

    const token = setTimeout(updateTime, 1000);
    return function cleanUp() {
      clearTimeout(token);
    };
  }, [divTimer]);

  const mouseMove = () => {
    setDivTimer(10);

    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("keypress", mouseMove);
  };

  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("keypress", mouseMove);

  return (
    <div className="App" style={{ backgroundColor: `${color}` }}>
      <h1>Background timer: {backgroundTimer}</h1>
      <div className={divTimer > 0 ? "contentOn" : "contentOff"}>
        <h2>{divTimer}</h2>
      </div>
    </div>
  );
}

export default App;
