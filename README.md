# Blackcoffer Insights Dashboard

A full-stack **MERN data visualization dashboard** built for the Blackcoffer Visualization Dashboard test assignment. The application uses the provided JSON dataset, stores the data in MongoDB, exposes REST APIs through Node.js/Express, and presents interactive insights through a React + Chart.js dashboard.

## 🌐 Live Demo

- **Frontend:** https://blackcoffer-insights-dashboard1-iv8ozka0t-lakshya0604s-projects.vercel.app/
- **Backend API:** https://blackcoffer-insights-dashboard.onrender.com/api
- **Repository:** https://github.com/Lakshya0604/blackcoffer-insights-dashboard

## ✨ Features

- Interactive data visualization dashboard
- KPI cards for total records, average intensity, likelihood, relevance, and top topic
- Multi-select filters across available dataset dimensions
- Topic, year, region, country, sector, PESTLE, likelihood and relevance analysis
- MongoDB-backed data access
- RESTful API with Express.js
- JSON-to-MongoDB seed script
- Responsive React/Vite frontend
- Cloud deployment using Vercel and Render
- Environment variables excluded from source control

### Available Filters

The dashboard supports the following filters when corresponding values are available in the supplied dataset:

- End Year
- Topic
- Sector
- Region
- PESTLE
- Source
- SWOT
- Country
- City

Filters with no usable values in the provided dataset are automatically hidden. This keeps the dashboard faithful to the assignment's **given-data-only** requirement.

## 📊 Visualizations

1. **Average Intensity by Topic** — compares average intensity across the top topics.
2. **Intensity & Record Volume by Start Year** — shows trends in intensity and record volume over time.
3. **Region Distribution** — compares record distribution across regions.
4. **Country-wise Intensity** — compares countries using intensity and record volume.
5. **Likelihood vs Relevance** — explores the relationship between likelihood and relevance.
6. **PESTLE Breakdown** — summarizes records by PESTLE category.
7. **Sector vs Relevance API analysis** — backend aggregation for sector-level relevance.

## 🎯 KPI Dashboard

The dashboard calculates metrics from the currently filtered MongoDB dataset:

- Total Records
- Average Intensity
- Average Likelihood
- Average Relevance
- Top Topic

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Charts | Chart.js, react-chartjs-2 |
| Filters | react-select |
| HTTP | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

## 🏗️ Architecture

```text
Provided JSON Dataset
        │
        ▼
   MongoDB Atlas
        │
        ▼
 Node.js + Express API
 (Filtering & Aggregation)
        │
        │ REST API
        ▼
 React + Vite Frontend
        │
        ▼
 Chart.js Visualizations
```

### Data Flow

1. The supplied `jsondata.json` is stored in `backend/data/`.
2. The seed script imports the records into MongoDB.
3. Express routes query and aggregate MongoDB data.
4. React requests data through Axios.
5. Selected filters are sent as query parameters.
6. KPI cards and charts update from the filtered results.

## 📁 Project Structure

```text
blackcoffer-insights-dashboard/
│
├── backend/
│   ├── data/
│   │   └── jsondata.json
│   ├── models/
│   │   └── Insight.js
│   ├── routes/
│   │   └── data.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 📦 Dataset

The project uses the **provided Blackcoffer `jsondata.json` dataset only**.

Location:

```text
backend/data/jsondata.json
```

The data is seeded into MongoDB and subsequently read by the backend API. No additional external dataset is required for the dashboard analysis.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas or another MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Lakshya0604/blackcoffer-insights-dashboard.git
cd blackcoffer-insights-dashboard
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Start the backend

```bash
npm run dev
```

The backend normally runs at `http://localhost:5000`.

### 5. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite frontend normally runs at `http://localhost:5173`.

For local API configuration, create `frontend/.env` if required:

```env
VITE_API_BASE=http://localhost:5000/api
```

## 🔌 API Reference

### Core Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/filters` | Returns distinct filter values |
| GET | `/api/kpis` | Returns dashboard KPI metrics |
| GET | `/api/data` | Returns filtered, paginated records |

### Chart Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/chart/intensity-by-topic` | Average intensity by topic |
| GET | `/api/chart/year-trend` | Intensity and record count by start year |
| GET | `/api/chart/region-distribution` | Record distribution by region |
| GET | `/api/chart/country-intensity` | Country-wise intensity and count |
| GET | `/api/chart/likelihood-relevance` | Likelihood vs relevance data |
| GET | `/api/chart/pestle-breakdown` | PESTLE distribution |
| GET | `/api/chart/sector-relevance` | Sector-wise average relevance |

### Filtering Example

```text
/api/kpis?topic=oil,gas&region=Europe
```

Supported query fields include:

```text
end_year
start_year
topic
sector
region
pestle
source
swot
country
city
```

## 🔐 Environment Variables

Backend:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Frontend:

```env
VITE_API_BASE=http://localhost:5000/api
```

Sensitive/local files are excluded using `.gitignore`:

```text
node_modules/
.env
dist/
.DS_Store
```

**Never commit MongoDB credentials or other secrets.**

## ☁️ Deployment

### Frontend — Vercel

The React/Vite frontend is deployed on Vercel and uses:

```env
VITE_API_BASE=https://blackcoffer-insights-dashboard.onrender.com/api
```

### Backend — Render

The Node.js/Express API is deployed on Render and connects to MongoDB using the `MONGO_URI` environment variable.

## ✅ Assignment Coverage

| Requirement | Status |
|---|---:|
| Provided JSON data | ✅ |
| MongoDB database | ✅ |
| Node.js API | ✅ |
| React/MERN stack | ✅ |
| Interactive visualizations | ✅ |
| Intensity | ✅ |
| Likelihood | ✅ |
| Relevance | ✅ |
| Year | ✅ |
| Country | ✅ |
| Topics | ✅ |
| Region | ✅ |
| End Year filter | ✅ |
| Topic filter | ✅ |
| Sector filter | ✅ |
| Region filter | ✅ |
| PESTLE filter | ✅ |
| Source filter | ✅ |
| City | Dataset-dependent |
| SWOT | Dataset-dependent |

> City and SWOT are supported by the application, but the UI only displays these filters when usable values exist in the supplied dataset.

## 🧪 Validation Checklist

- [x] Provided JSON dataset integrated
- [x] MongoDB-backed dashboard
- [x] REST API
- [x] React frontend
- [x] Chart.js visualizations
- [x] KPI cards
- [x] Multi-select filters
- [x] Dynamic filtering
- [x] Frontend deployment
- [x] Backend deployment
- [x] `.env` excluded from GitHub

## 👨‍💻 Developer

**Lakshya Yadav**  
B.Tech Computer Science Engineering

**Project:** Blackcoffer Insights Dashboard — Full-stack MERN data visualization assignment.

## 📌 Status

**Completed — Assignment Ready**

This project demonstrates full-stack development, MongoDB integration, REST API design, data aggregation, interactive visualization, filtering, and cloud deployment using the supplied Blackcoffer dataset.

## 📄 License

Developed for educational and assignment purposes as part of the Blackcoffer Visualization Dashboard test assignment.
