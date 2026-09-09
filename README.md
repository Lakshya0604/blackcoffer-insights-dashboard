# Blackcoffer Insights Dashboard

A full-stack **MERN data visualization dashboard** developed for the Blackcoffer Insights Dashboard assignment.

The application loads the provided JSON dataset into MongoDB and provides interactive visualizations, KPI cards, and filters to analyze insights across different dimensions such as intensity, likelihood, relevance, topics, regions, countries, sectors, PESTLE, and more.

## 🚀 Tech Stack

### Frontend

* React.js
* Vite
* Chart.js
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Tools & Services

* MongoDB Atlas
* Git & GitHub
* REST API

---

## ✨ Features

* Interactive dashboard
* KPI summary cards
* Multiple data visualizations
* Dynamic filtering
* Multi-select filters
* MongoDB database integration
* RESTful backend APIs
* Responsive frontend
* JSON dataset seeding
* Real-time filtering of dashboard data

### Available Filters

The dashboard supports filtering by:

* End Year
* Topic
* Sector
* Region
* PESTLE
* Source
* SWOT
* Country
* City

---

## 📊 Dashboard Visualizations

The dashboard includes visualizations for:

1. **Intensity by Topic**
2. **Year-wise Trend**
3. **Region Distribution**
4. **Country-wise Intensity**
5. **Likelihood vs Relevance**
6. **PESTLE Breakdown**
7. **Sector vs Relevance**

These charts help identify patterns and relationships within the Blackcoffer insights dataset.

---

## 📁 Project Structure

```text
blackcoffer-dashboard/
│
├── backend/
│   ├── data/
│   │   └── jsondata.json
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 📦 Dataset

The project uses the **complete provided Blackcoffer JSON dataset**, stored at:

```text
backend/data/jsondata.json
```

The dataset is seeded into MongoDB using the backend seed script.

> Note: The dataset is included in the repository for the purpose of this assignment. MongoDB connection credentials are not included in the repository.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Lakshya0604/blackcoffer-insights-dashboard.git
cd blackcoffer-insights-dashboard
```

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 🌱 Seed the Database

After configuring MongoDB, run:

```bash
npm run seed
```

This will import the JSON dataset from:

```text
backend/data/jsondata.json
```

into MongoDB.

---

## 💻 Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔗 API Endpoints

### Data

```text
GET /api/data
GET /api/filters
GET /api/kpis
```

### Charts

```text
GET /api/chart/intensity-by-topic
GET /api/chart/year-trend
GET /api/chart/region-distribution
GET /api/chart/country-intensity
GET /api/chart/likelihood-relevance
GET /api/chart/pestle-breakdown
GET /api/chart/sector-relevance
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**Do not commit `.env` to GitHub.**

The repository uses `.gitignore` to exclude:

```text
node_modules/
.env
dist/
.DS_Store
```

---

## 🧪 Running the Project

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown by Vite, usually:

```text
http://localhost:5173
```

---

## 🎯 Assignment Objective

The objective of this project is to build an interactive visualization dashboard using the provided Blackcoffer insights dataset.

The dashboard allows users to explore the data through:

* Interactive charts
* KPIs
* Filters
* Topic analysis
* Regional analysis
* Country analysis
* Sector analysis
* PESTLE analysis
* Likelihood and relevance analysis

---

## 👨‍💻 Developer

**Lakshya Yadav**

B.Tech Computer Science Engineering

---

## 📌 Project Status

**Completed**

The project includes:

* ✅ MERN stack implementation
* ✅ Complete JSON dataset
* ✅ MongoDB integration
* ✅ REST APIs
* ✅ Interactive dashboard
* ✅ Multiple Chart.js visualizations
* ✅ Dynamic filtering
* ✅ GitHub repository
* ✅ Environment variable protection

---

## 📄 License

This project was developed for educational and assignment purposes.
