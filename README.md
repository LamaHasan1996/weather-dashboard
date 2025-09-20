# Weather Dashboard

Weather App — A modern dashboard that fetches real-time and forecasted weather data using the **Open-Meteo API**.  
Built with a clean interface, the app allows users to search cities, view detailed forecasts, and save data locally for quick access.  
Designed with modular code, API integration, and file handling for reliable performance.

---

## Requirements

- **Python** 3.10+
- **Node.js** 20.19.0 (LTS recommended)
- **npm** (comes with Node.js)

---

## How to Run

1. **Backend (Flask API)**

   - Navigate to the project root.
   - Create and activate a virtual environment:
     ```bash
     python -m venv .venv
     source .venv/bin/activate   # Linux/macOS
     .venv\Scripts\activate      # Windows
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask server:
     ```bash
     python -m weather_app.api
     ```
   - The backend will run on [http://localhost:5000](http://localhost:5000).

2. **Frontend (React + Vite)**
   - From the project root, navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The frontend will run on [http://localhost:5173](http://localhost:5173).  
     Requests to `/api/*` are automatically proxied to the Flask backend on port 5000 (see `vite.config.js`).

## Notes

- Ensure the backend is running before starting the frontend.
- Favorites and cached weather data are stored locally in `data/cities.json` and `data/cache.json`.
- If you encounter a 404 or JSON parsing error, double-check that the proxy is configured correctly in `vite.config.js`.
