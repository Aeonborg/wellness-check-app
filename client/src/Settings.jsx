import React, { useState, useEffect } from "react";

export default function Settings({ onClose }) {
  const [userEmail, setUserEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("No check-in received. Please reach out.");
  const [interval, setInterval] = useState(604800); // default 7 days
  const [thumbsUpUrl, setThumbsUpUrl] = useState(
    "https://rgdkozcbblfgjljtxnlq.supabase.co/storage/v1/object/public/thumbs/thumbs-up.jpg"
  );
  const [thumbsDownUrl, setThumbsDownUrl] = useState(
    "https://rgdkozcbblfgjljtxnlq.supabase.co/storage/v1/object/public/thumbs/thumbs-down.jpg"
  );

  // Load saved settings
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">⚙️ Settings</h2>

        <div className="space-y-4">
          <label className="block">
            <span className="font-medium">User Email</span>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="block w-full border p-2 rounded-lg mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Contact Email</span>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="block w-full border p-2 rounded-lg mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full border p-2 rounded-lg mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Check Interval (seconds)</span>
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="block w-full border p-2 rounded-lg mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Thumbs Up Image URL</span>
            <input
              type="text"
              value={thumbsUpUrl}
              onChange={(e) => setThumbsUpUrl(e.target.value)}
              className="block w-full border p-2 rounded-lg mt-1"
            />
          </label>

          <label className="block">
            <span className="font-medium">Thumbs Down Image URL</span>
            <input
              type="text"
              value={thumbsDownUrl}
              onChange={(e) => setThumbsDownUrl(e.target.value)}
              className="block w-full border p-2 rounded-lg mt-1"
            />
          </label>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={saveSettings}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
