import React, { useState } from "react";

export default function Settings({ onClose }) {
  const [email, setEmail] = useState("");

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const saveSettings = () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    alert("Settings saved!");
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">⚙️ Settings</h2>
      <label className="block mb-4">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border border-gray-300 rounded-lg p-2 mt-1"
          placeholder="you@example.com"
        />
        {!isValidEmail(email) && email.length > 0 && (
          <p className="text-red-600 text-sm mt-1">Invalid email format</p>
        )}
      </label>
      <div className="flex gap-3">
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
