# Blackcoffer Insights Dashboard

Full-stack MERN data visualization dashboard built for the Blackcoffer test assignment.

**Stack:** Node.js + Express + MongoDB (Mongoose) backend · React (Vite) + Chart.js frontend

---

## ⚠️ IMPORTANT — Before you do anything else

The `backend/data/jsondata.json` file in this project currently has only **3 sample records**
(placeholder). Replace it with the **complete, real `jsondata.json`** file from the assignment
before seeding, otherwise your dashboard will show almost no data.

```
cp /path/to/your/real/jsondata.json backend/data/jsondata.json
```

---

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set `MONGO_URI`:

- **Local MongoDB:** `mongodb://127.0.0.1:27017/blackcoffer` (make sure `mongod` is running)
- **MongoDB Atlas (recommended, free tier is enough):**
  1. Create a free cluster at https://www.mongodb.com/cloud/atlas
  2. Create a DB user + allow network access from anywhere (0.0.0.0/0) for easy submission
  3. Copy the connection string into `MONGO_URI`

Seed the database from `jsondata.json`:

```bash
npm run seed
```

You should see something like `Inserted 1000 documents into 'insights' collection`.

Start the API server:

```bash
npm run dev
```

API runs at `http://localhost:5000`. Sanity check: open `http://localhost:5000/api/filters`
in your browser — you should see JSON with distinct topic/sector/region/etc. values.

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. It talks to the backend at `http://localhost:5000/api` by
default (see `frontend/src/api.js`). To point it elsewhere, create `frontend/.env`:

```
VITE_API_BASE=http://localhost:5000/api
```

---

## 3. What's included

**Backend API (`/api`):**
- `GET /api/data` — raw filtered, paginated records
- `GET /api/filters` — distinct values for every filter dropdown (topic, sector, region, pestle,
  source, swot, country, city, end_year)
- `GET /api/kpis` — total records, avg intensity/likelihood/relevance, top topic
- `GET /api/chart/intensity-by-topic`
- `GET /api/chart/year-trend`
- `GET /api/chart/region-distribution`
- `GET /api/chart/country-intensity`
- `GET /api/chart/likelihood-relevance`
- `GET /api/chart/pestle-breakdown`
- `GET /api/chart/sector-relevance`

All endpoints accept the same filter query params (comma-separated for multi-select):
`end_year, topic, sector, region, pestle, source, swot, country, city`

**Frontend dashboard:**
- Multi-select filter bar for every required filter (end year, topics, sector, region, PEST,
  source, SWOT, country, city)
- KPI cards: total records, avg intensity, avg likelihood, avg relevance, top topic
- 6 interactive Chart.js visualizations:
  1. Bar — Average Intensity by Topic
  2. Dual-axis Line — Intensity & Record Volume trend by Start Year
  3. Doughnut — Records by Region
  4. Horizontal Bar — Top Countries by Record Count
  5. Bubble Scatter — Likelihood vs Relevance (bubble size = Intensity)
  6. Polar Area — PESTLE Category Breakdown

**Note on `city` and `swot` fields:** In the standard Blackcoffer `jsondata.json` dataset, the
`city` field is empty for essentially every record, and `swot` doesn't appear in most records
either. The schema, API, and filter UI fully support both — if your actual data has values for
them, they'll show up automatically. If not, that's expected from the source data, not a bug in
this app — mention this in your submission notes.

---

## 4. Deployment (for submission)

- **Database:** MongoDB Atlas (free tier)
- **Backend:** Render or Railway (free tier) — set `MONGO_URI` and `PORT` as environment
  variables, start command `node server.js`
- **Frontend:** Vercel or Netlify — set `VITE_API_BASE` to your deployed backend URL, build
  command `npm run build`, output directory `dist`

## 5. Submission checklist (per assignment)

1. Push this project to a GitHub repo (public or add Blackcoffer's account as collaborator)
2. Deploy backend + frontend (links above) — or record a short screen-capture demo
3. Fill the Google Form: https://forms.gle/YBV6Xka5WsrPwYsB8
4. Upload a brief write-up/article to Google Drive explaining your approach, and share that
   Drive URL in the form
