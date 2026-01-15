import React, { useState } from "react";
import Settings from "./Settings";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!showSettings ? (
        <button
          onClick={() => setShowSettings(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Open Settings
        </button>
      ) : (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
