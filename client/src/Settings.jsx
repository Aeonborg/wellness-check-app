import React, { useState, useEffect } from "react";

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>⚙️ Settings</h2>

        <label>
          User Email
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
          />
        </label>

        <label>
          Contact Email
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
          />
        </label>

        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
          />
        </label>

        <label>
          Check Interval (seconds)
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
          />
        </label>

        <label>
          Thumbs Up Image URL
          <input
            type="text"
            value={thumbsUpUrl}
            onChange={(e) => setThumbsUpUrl(e.target.value)}
            style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
          />
        </label>

        <label>
          Thumbs Down Image URL
          <input
            type="text"
            value={thumbsDownUrl}
            onChange={(e) => setThumbsDownUrl(e.target.value)}
            style={{ width: "100%", margin: "0.5rem 0", padding: "8px" }}
          />
        </label>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={saveSettings} style={{ padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px" }}>
            Save
          </button>
          <button onClick={onClose} style={{ padding: "10px 20px", background: "#ccc", border: "none", borderRadius: "6px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
