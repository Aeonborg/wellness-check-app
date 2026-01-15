import React, { useState, useEffect } from "react";
import Settings from "./Settings";

export default function App() {
  const DEFAULT_INTERVAL = 604800; // 7 days
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_INTERVAL);
  const [showSettings, setShowSettings] = useState(false);

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

  const handleThumbClick = () => {
    if (secondsLeft > 0) {
      // just reset the timer, keep thumbs-up display
      setSecondsLeft(intervalSeconds);
    } else {
      // timer expired, reset and switch back to thumbs-up
      setSecondsLeft(intervalSeconds);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Wellness Check</h1>
      <p style={styles.timer}>Time left: {Math.floor(secondsLeft / 86400)} days</p>

      <img
        src={secondsLeft > 0 ? thumbsUpUrl : thumbsDownUrl}
        alt={secondsLeft > 0 ? "Thumbs Up" : "Thumbs Down"}
        style={styles.thumb}
        onClick={handleThumbClick}
        onDoubleClick={() => setShowSettings(true)}
      />

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "1rem",
  },
  title: { fontSize: "2rem", marginBottom: "1rem" },
  timer: { fontSize: "1.2rem", marginBottom: "1rem" },
  thumb: {
    maxWidth: "200px",
    width: "80%",
    height: "auto",
    margin: "1rem auto",
    cursor: "pointer",
  },
};
