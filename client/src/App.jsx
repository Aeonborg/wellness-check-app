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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6 px-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Wellness Check
      </h1>

      <p className="text-base md:text-lg lg:text-xl">
        Time left: {Math.floor(secondsLeft / 86400)} days
      </p>

      {status === "ok" && (
        <img src={thumbsUpUrl} alt="Thumbs Up" className="w-20 md:w-28 lg:w-32" />
      )}
      {status === "notok" && (
        <img src={thumbsDownUrl} alt="Thumbs Down" className="w-20 md:w-28 lg:w-32" />
      )}

      <img
        src={thumbsUpUrl}
        alt="Tap to reset"
        className="w-16 md:w-24 lg:w-28 cursor-pointer"
        onClick={handleThumbsUp}
        onDoubleClick={() => setShowSettings(true)}
      />

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
