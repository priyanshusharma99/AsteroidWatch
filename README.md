# 🌌 AsteroidWatch — Near-Earth Object Explorer

A web application that lets users explore asteroids and near-earth objects (NEOs)
approaching our planet, built using NASA's NeoWs public API.

## 🎯 Purpose
AsteroidWatch helps users discover and learn about asteroids flying close to Earth.
Users can search, filter, and sort asteroid data in an interactive and visually
engaging interface.

## 🔗 API Used
- **NASA NeoWs (Near Earth Object Web Service)**
- Docs: https://api.nasa.gov/
- Endpoint: `https://api.nasa.gov/neo/rest/v1/feed`

## ✨ Planned Features
- 📡 Fetch and display real-time asteroid data from NASA
- 🔍 Search asteroids by name
- ⚠️ Filter by hazardous / non-hazardous classification
- 📊 Sort by size, speed, or closest approach distance
- ❤️ Favorite/like asteroids (saved to localStorage)
- 🌙 Dark mode / Light mode toggle
- 📄 Pagination for large result sets
- ⏳ Loading indicators during API calls

## 🛠️ Technologies
- React.js (with Vite)
- Tailwind CSS
- NASA NeoWs Public API
- Fetch API
- Array Higher-Order Functions (filter, map, sort, reduce)
- localStorage for persistence

## ⚙️ Setup & Run
1. Clone the repository:
```
   git clone https://github.com/YOUR_USERNAME/asteroid-watch.git
```
2. Install dependencies:
```
   npm install
```
3. Get a free API key from https://api.nasa.gov and create a `.env` file in the root:
```
   VITE_NASA_API_KEY=your_api_key_here
```
4. Start the development server:
```
   npm run dev
```

## 📅 Project Milestones
| Milestone | Description | Deadline |
|-----------|-------------|----------|
| 1 | Project Setup & README | 23rd March |
| 2 | API Integration | 1st April |
| 3 | Core Features | 8th April |
| 4 | Deployment & Final Submission | 10th April |
