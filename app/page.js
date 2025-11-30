"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [versions, setVersions] = useState([]);

  const fetchVersions = async () => {
    const res = await fetch("/api/versions");
    const data = await res.json();
    setVersions(data);
  };

  const clearHistory = async () => {
    await fetch("/api/versions", { method: "DELETE" });
    setVersions([]);
  };


  useEffect(() => {
    const fetchData = async () => {
      await fetchVersions();
    };
    fetchData();
  }, []);

  const saveVersion = async () => {
    if (!text.trim()) {
      alert("Text cannot be empty");
      return;
    }

    await fetch("/api/versions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchVersions();
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#020617] to-black p-6 text-white">
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">
          Mini Audit Trail
        </h1>
        <button
          onClick={clearHistory}
          className="mb-4 px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition"
        >
          Clear History
        </button>

      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl h-[550px] flex flex-col">

          <h2 className="text-lg font-semibold mb-3">Content Editor</h2>

          <textarea
            className="w-full flex-1 bg-black/40 text-white border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Start typing your content..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={saveVersion}
            className="mt-5 w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:brightness-110 py-3 rounded-xl font-semibold transition"
          >
            Save Version
          </button>

        </div>


        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">

          <h2 className="text-lg font-semibold mb-4">
            Version History
          </h2>

          {versions.length === 0 && (
            <p className="text-gray-400 text-sm">
              No versions recorded yet.
            </p>
          )}

          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">

            {versions.map((v, index) => (
              <div
                key={v.id}
                className="bg-black/40 border border-white/10 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">
                    Version {index + 1}
                  </span>

                  <span className="text-xs text-gray-400">
                    {v.timestamp}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <div>
                    <p className="font-semibold text-green-400 mb-1">+ Added</p>
                    <p className="text-gray-300">
                      {v.addedWords.length
                        ? v.addedWords.join(", ")
                        : "None"}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-red-400 mb-1">- Removed</p>
                    <p className="text-gray-300">
                      {v.removedWords.length
                        ? v.removedWords.join(", ")
                        : "None"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 text-xs mt-3 text-gray-400">
                  <span>Old: {v.oldLength}</span>
                  <span>New: {v.newLength}</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </section>
    </main>
  );
}
