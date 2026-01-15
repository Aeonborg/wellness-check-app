import React, { useState, useEffect } from "react";
import Settings from "./Settings";

export default function App() {
  const DEFAULT_INTERVAL = 604800; // 7 days in seconds
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_INTERVAL);
  const [status, setStatus] = useState("pending");
  const [showSettings, setShowSettings] = useState(false);

  // Load saved settings
  const saved = JSON.parse(localStorage.getItem("userSettings") || "{}");
  const thumbsUpUrl =
    saved.thumbsUpUrl ||
    "https://rgdkozcbblfgjljtxnlq.supabase.co/storage/v1/object/public/thumbs/thumbs-up.jpg";
  const thumbsDownUrl =
    saved.thumbsDownUrl ||
    "https://rgdkozcbblfgjljtxnlq.supabase.co/storage/v1/object/public/thumbs/thumbs-down.jpg";
  const intervalSeconds = saved.interval || DEFAULT_INTERVAL;

  // countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      setStatus("notok");
    }
  }, [secondsLeft]);

  const handleThumbsUp = () => {
    setSecondsLeft(intervalSeconds);
    setStatus("ok");
  };

  return (
    <div className="container">
      <h1>Wellness Check</h1>
      <p>Time left: {Math.floor(secondsLeft / 86400)} days</p>

      {status === "ok" && (
        <img src={thumbsUpUrl} alt="Thumbs Up" className="thumb" />
      )}
      {status === "notok" && (
        <img src={thumbsDownUrl} alt="Thumbs Down" className="thumb" />
      )}

      <img
        src={thumbsUpUrl}
        alt="Tap to reset"
        className="tap"
        onClick={handleThumbsUp}
        onDoubleClick={() => setShowSettings(true)}
      />

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
