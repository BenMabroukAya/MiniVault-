
# MiniVault - Local Prompt Generation API and Frontend

## Overview

MiniVault is a local development project consisting of two main parts:

- **Backend:** A Node.js Express API that accepts prompts and returns streamed token-by-token stubbed responses, while logging all interactions.
- **Frontend:** A React-based UI allowing users to enter prompts, receive streamed responses in real-time, and download logs.

This project mimics typical interactions with large language model APIs, focusing on streaming responses and simple logging for local use.



## Features

- Streaming token-by-token API responses.
- Persistent logging of prompt-response pairs.
- Frontend with live response updates and error handling.
- Downloadable log file for audit or review.
- Cross-Origin support via CORS.
- Simple, clean UI with prompt input, generate button, and footer attribution.



## Requirements

- Node.js (v14+ recommended)
- npm or yarn



## Installation & Setup

### Backend

1. Navigate to the backend folder:
   ```bash
   cd MiniVault-API

2. Install dependencies:

   ```bash
   npm install express cors
   
3. Run the server:

   ```bash
   npm start
The backend will run at `http://localhost:3001`.

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd minivault-client
   
2. Install dependencies:

   ```bash
   npm install
   
3. Run the development server:

   ```bash
   npm start
   

   The frontend will run at `http://localhost:3000`.


## Usage

* Open your browser and go to `http://localhost:3000`.
* Type a prompt in the input box.
* Click **Generate** to send it to the backend.
* Watch the response appear token-by-token in the response area.
* Click **Download Logs** to get the complete interaction logs.



## Project Structure

```
mini-vault/
├── MiniVault-API/
│   ├── index.js
│   ├── logs/
│   │   └── log.jsonl
│   └── package.json
├── minivault-client/
│   ├── src/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
└── README.md  

```

---

## API Endpoints

* `GET /` - Health check endpoint.
* `POST /generate` - Accepts `{ prompt: string }`, streams token-by-token response.
* `GET /logs/download` - Downloads the log file `log.jsonl`.



## Contribution

Contributions are welcome! Feel free to:

* Report bugs or issues.
* Suggest features or improvements.
* Submit pull requests with enhancements.

Please ensure code quality and provide clear commit messages.



## License

All rights reserved © Aya Ben Mabrouk



## Contact

For questions or support, don't hesitate to contact me.

### 🧑‍💻 Author: Aya Ben Mabrouk

- Junior Software Engineer  
- 📍 Douz, Tunisia  
- 📧 aya.benmabrouk@isimg.tn



> Feel free to fork the project or suggest improvements!






