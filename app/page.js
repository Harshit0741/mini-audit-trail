/* eslint-disable react-hooks/set-state-in-effect */
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
    fetchVersions();
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
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #020617 50%, #000000 100%)",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: "1200px",
          margin: "0 auto 32px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "0.5px" }}>
          Mini Audit Trail
        </h1>
        <button
          onClick={clearHistory}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Clear History
        </button>
      </header>

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        <div
          style={{
            flex: "1 1 400px",
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "24px",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            height: "550px",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
            Content Editor
          </h2>
          <textarea
            placeholder="Start typing your content..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "16px",
              outline: "none",
              resize: "none",
            }}
          />
          <button
            onClick={saveVersion}
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "12px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(90deg, #6366f1 0%, #a855f7 100%)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Save Version
          </button>
        </div>

        <div
          style={{
            flex: "1 1 400px",
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "24px",
            borderRadius: "24px",
            maxHeight: "550px",
            overflowY: "auto",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
            Version History
          </h2>

          {versions.length === 0 && (
            <p style={{ color: "#aaa", fontSize: "14px" }}>No versions recorded yet.</p>
          )}

          {versions.map((v, index) => (
            <div
              key={v.id}
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontWeight: "600", fontSize: "14px" }}>
                  Version {index + 1}
                </span>
                <span style={{ fontSize: "12px", color: "#aaa" }}>{v.timestamp}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                <div>
                  <p style={{ fontWeight: "600", color: "#4ade80", marginBottom: "4px" }}>+ Added</p>
                  <p style={{ color: "#ccc" }}>
                    {v.addedWords.length ? v.addedWords.join(", ") : "None"}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: "600", color: "#f87171", marginBottom: "4px" }}>- Removed</p>
                  <p style={{ color: "#ccc" }}>
                    {v.removedWords.length ? v.removedWords.join(", ") : "None"}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#aaa", marginTop: "8px" }}>
                <span>Old: {v.oldLength}</span>
                <span>New: {v.newLength}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
