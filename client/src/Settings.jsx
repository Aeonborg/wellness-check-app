import React, { useState, useEffect } from "react";
import "./index.css";

export default function Settings({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("No check-in received. Please reach out.");
  const [interval, setInterval] = useState(604800);
  const [thumbsUpUrl, setThumbsUpUrl] = useState(
    "https://rgdkozcbblfgjljtxnlq.supabase.co/storage/v1/object/public/thumbs/thumbs-up.jpg"
  );
  const [thumbsDownUrl, setThumbsDownUrl] = useState(
    "https://rgdkozcbblfgjljtxnlq.supabase.co/storage/v1/object/public/thumbs/thumbs-down.jpg"
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setUserEmail(saved.userEmail || "");
      setContactEmail(saved.contactEmail || "");
      setMessage(saved.message || "");
      setInterval(saved.interval || 604800);
      setThumbsUpUrl(saved.thumbsUpUrl || thumbsUpUrl);
      setThumbsDownUrl(saved.thumbsDownUrl || thumbsDownUrl);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      userEmail,
      contactEmail,
      message,
      interval,
      thumbsUpUrl,
      thumbsDownUrl,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved!");
    onClose();
  };

  return (
    <div className="container">
      <h2 className="title">⚙️ Settings</h2>

      <label className="settings-label">
        User Email
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="settings-input"
        />
      </label>

      <label className="settings-label">
        Contact Email
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="settings-input"
        />
      </label>

      <label className="settings-label">
        Message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="settings-input"
        />
      </label>

      <label className="settings-label">
        Check Interval (seconds)
        <input
          type="number"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="settings-input"
        />
      </label>

      <label className="settings-label">
        Thumbs Up Image URL
        <input
          type="text"
          value={thumbsUpUrl}
          onChange={(e) => setThumbsUpUrl(e.target.value)}
          className="settings-input"
        />
        <img src={thumbsUpUrl} alt="Preview Up" className="thumb" />
      </label>

      <label className="settings-label">
        Thumbs Down Image URL
        <input
          type="text"
          value={thumbsDownUrl}
          onChange={(e) => setThumbsDownUrl(e.target.value)}
          className="settings-input"
        />
        <img src={thumbsDownUrl} alt="Preview Down" className="thumb" />
      </label>

      <div className="settings-buttons">
        <button onClick={saveSettings} className="settings-save">Save</button>
        <button onClick={onClose} className="settings-cancel">Back</button>
      </div>
    </div>
  );
}
