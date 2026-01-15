import React, { useState, useEffect } from "react";

export default function Settings({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("No check-in received. Please reach out.");
  const [interval, setInterval] = useState(604800); // default 7 days
  const [thumbsUpUrl, setThumbsUpUrl] = useState("/images/thumbs-up.jpg");
  const [thumbsDownUrl, setThumbsDownUrl] = useState("/images/thumbs-down.jpg");

  // load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setUserEmail(saved.userEmail || "");
      setContactEmail(saved.contactEmail || "");
      setMessage(saved.message || "");
      setInterval(saved.interval || 604800);
      setThumbsUpUrl(saved.thumbsUpUrl || "/images/thumbs-up.jpg");
      setThumbsDownUrl(saved.thumbsDownUrl || "/images/thumbs-down.jpg");
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
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">⚙️ Settings</h2>

      <label className="block mb-4">
        <span>User Email</span>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="block w-full border p-2 mt-1"
        />
      </label>

      <label className="block mb-4">
        <span>Contact Email</span>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="block w-full border p-2 mt-1"
        />
      </label>

      <label className="block mb-4">
        <span>Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full border p-2 mt-1"
        />
      </label>

      <label className="block mb-4">
        <span>Check Interval (seconds)</span>
        <input
          type="number"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="block w-full border p-2 mt-1"
        />
      </label>

      <label className="block mb-4">
        <span>Thumbs Up Image URL</span>
        <input
          type="text"
          value={thumbsUpUrl}
          onChange={(e) => setThumbsUpUrl(e.target.value)}
          className="block w-full border p-2 mt-1"
        />
      </label>

      <label className="block mb-4">
        <span>Thumbs Down Image URL</span>
        <input
          type="text"
          value={thumbsDownUrl}
          onChange={(e) => setThumbsDownUrl(e.target.value)}
          className="block w-full border p-2 mt-1"
        />
      </label>

      <div className="flex gap-3 mt-4">
        <button
          onClick={saveSettings}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
