import React, { useState, useEffect } from "react";
import EditPopup from "./EditPopup";
import "./index.css";

export default function App() {
  const DEFAULT_INTERVAL = 604800; // 7 days
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_INTERVAL);
  const [showEdit, setShowEdit] = useState(false);

  const saved = JSON.parse(localStorage.getItem("userSettings") || "{}");
  const thumbsUpUrl =
    saved.thumbsUpUrl ||
    "https://.../thumbs-up.jpg";
  const thumbsDownUrl =
    saved.thumbsDownUrl ||
    "https://.../thumbs-down.jpg";
  const intervalSeconds = saved.interval || DEFAULT_INTERVAL;

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleThumbClick = () => {
    setSecondsLeft(intervalSeconds);
  };

  return (
    <div className="container">
      <h1 className="title">Wellness Check</h1>
      <p className="timer">Time left: {Math.floor(secondsLeft / 86400)} days</p>

      <img
        src={secondsLeft > 0 ? thumbsUpUrl : thumbsDownUrl}
        alt="Thumb picture"
        className="thumb"
        onClick={handleThumbClick}
        onDoubleClick={() => setShowEdit(true)}
      />

      {showEdit && <EditPopup onClose={() => setShowEdit(false)} />}
    </div>
  );
}
