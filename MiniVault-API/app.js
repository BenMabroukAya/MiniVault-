/* POST /generate with token-by-token streaming stubbed response */
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ensure logs directory exists
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Logger
function logInteraction(prompt, response) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    prompt,
    response,
  };
  fs.appendFileSync(
    path.join(logsDir, "log.jsonl"),
    JSON.stringify(logEntry) + "\n"
  );
}

// Health check
app.get("/", (req, res) => {
  res.send("MiniVault API is running");
});

// Download logs 
app.get("/logs/download", (req, res) => {
  const filePath = path.join(__dirname, "logs", "log.jsonl");

  if (fs.existsSync(filePath)) {
    res.download(filePath, "log.jsonl", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading the file.");
      }
    });
  } else {
    res.status(404).send("Log file not found.");
  }
});

//  POST /generate with streaming response
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'prompt' field" });
  }

  // Set headers for streaming
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });

  const tokens = [
    "Stubbed ",
    "response ",
    "for ",
    `prompt: '${prompt}'`,
    ".",
  ];

  res.write('{"response": "');

  for (let token of tokens) {
    await new Promise((r) => setTimeout(r, 300));
    const safeToken = token.replace(/"/g, '\\"');
    res.write(safeToken);
  }

  res.write('"}');
  res.end();

  logInteraction(prompt, tokens.join(""));
});

// Start server
app.listen(PORT, () => {
  console.log(`MiniVault API listening on http://localhost:${PORT}`);
});























/* simple test : a stubbed response, plus logging prompt/response to a local logs/log.jsonl file */
/*const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const LOG_DIR = path.join(__dirname, "logs");
const LOG_FILE = path.join(LOG_DIR, "log.jsonl");

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Helper to log prompt/response
function logInteraction(prompt, response) {
  const entry = {
    timestamp: new Date().toISOString(),
    prompt,
    response,
  };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n");
}

app.get("/", (req, res) => {
  res.send("MiniVault API is running");
});

app.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'prompt' field" });
  }

  // Stubbed response logic
  const responseText = `Stubbed response for prompt: '${prompt}'`;

  logInteraction(prompt, responseText);

  res.json({ response: responseText });
});

app.listen(PORT, () => {
  console.log(`MiniVault API listening on http://localhost:${PORT}`);
});*/
