import React, { useState, useEffect } from "react";
import Settings from "./Settings";

export default function App() {
  const DEFAULT_INTERVAL = 604800; // 7 days in seconds
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_INTERVAL);
  const [status, setStatus] = useState("pending"); // "pending", "ok", "notok"
  const [showSettings, setShowSettings] = useState(false);

  // countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // when timer hits 0 → thumbs down
  useEffect(() => {
    if (secondsLeft === 0) {
      setStatus("notok");
    }
  }, [secondsLeft]);

  // thumbs up resets timer
  const handleThumbsUp = () => {
    setSecondsLeft(DEFAULT_INTERVAL);
    setStatus("ok");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <h1 className="text-2xl font-bold">Wellness Check</h1>
      <p className="text-lg">
        Time left: {Math.floor(secondsLeft / 86400)} days
      </p>

      {/* Show thumbs depending on status */}
      {status === "ok" && (
        <img
          src="/images/thumbs-up.jpg"
          alt="Thumbs Up"
          className="w-20 h-20"
        />
      )}
      {status === "notok" && (
        <img
          src="/images/thumbs-down.jpg"
          alt="Thumbs Down"
          className="w-20 h-20"
        />
      )}

      {/* Tap thumbs up to reset, double click opens settings */}
      <img
        src="/images/thumbs-up.jpg"
        alt="Tap to reset"
        className="w-16 h-16 cursor-pointer"
        onClick={handleThumbsUp}
        onDoubleClick={() => setShowSettings(true)}
      />

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
