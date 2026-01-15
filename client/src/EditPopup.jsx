import React, { useState, useEffect } from "react";
import "./index.css";

export default function EditPopup({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("No check-in received. Please reach out.");
  const [interval, setInterval] = useState(604800);
  const [thumbsUpUrl, setThumbsUpUrl] = useState("");
  const [thumbsDownUrl, setThumbsDownUrl] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setUserEmail(saved.userEmail || "");
      setContactEmail(saved.contactEmail || "");
      setMessage(saved.message || "");
      setInterval(saved.interval || 604800);
      setThumbsUpUrl(saved.thumbsUpUrl || "");
      setThumbsDownUrl(saved.thumbsDownUrl || "");
    }
  }, []);

  const saveSettings = () => {
    const settings = { userEmail, contactEmail, message, interval, thumbsUpUrl, thumbsDownUrl };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved!");
    onClose();
  };

  return (
    <div className="edit-overlay">
      <div className="edit-panel">
        <h2 className="edit-heading">Edit Settings</h2>

        <label className="edit-label">
          User Email
          <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="edit-input" />
        </label>

        <label className="edit-label">
          Contact Email
          <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="edit-input" />
        </label>

        <label className="edit-label">
          Message
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="edit-input" />
        </label>

        <label className="edit-label">
          Check Interval (seconds)
          <input type="number" value={interval} onChange={(e) => setInterval(Number(e.target.value))} className="edit-input" />
        </label>

        <label className="edit-label">
          Thumbs Up Image URL
          <input type="text" value={thumbsUpUrl} onChange={(e) => setThumbsUpUrl(e.target.value)} className="edit-input" />
        </label>

        <label className="edit-label">
          Thumbs Down Image URL
          <input type="text" value={thumbsDownUrl} onChange={(e) => setThumbsDownUrl(e.target.value)} className="edit-input" />
        </label>

        <div className="edit-buttons">
          <button onClick={saveSettings} className="edit-save">Save</button>
          <button onClick={onClose} className="edit-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
