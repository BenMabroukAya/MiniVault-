import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        result += chunk;
        setResponse(result);
      }
    } catch (err) {
      setResponse("Failed to generate! Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadLogs = () => {
    window.open("http://localhost:3001/logs/download", "_blank");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🧠 MiniVault Prompt Generator</h1>

      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt here..."
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={handleGenerate}
          style={{
            padding: "0.6rem 1.5rem",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Generate
        </button>

        <button
          onClick={handleDownloadLogs}
          style={{
            padding: "0.6rem 1.5rem",
            backgroundColor: "#059669",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Download Logs
        </button>
      </div>

      <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "1.1rem", marginBottom: "2rem" }}>
        <strong>Response:</strong><br />
        {response}
        {isLoading && <span className="blinking-cursor">|</span>}
      </div>

      <style>
        {`
          .blinking-cursor {
            font-weight: bold;
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            from, to { opacity: 0; }
            50% { opacity: 1; }
          }
        `}
      </style>

      <footer style={{ textAlign: "center", fontSize: "0.9rem", color: "#888", marginTop: "3rem" }}>
        Made with <span style={{ color: "red" }}>❤️</span> by Aya Ben Mabrouk — All rights reserved ©
      </footer>
    </div>
  );
}

export default App;
