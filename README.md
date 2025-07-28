# Real-Time IoT Weather Dashboard 🌦️

An end‑to‑end dashboard that reads live data from Raspberry Pi sensors, streams it via WebSockets, stores it in MongoDB, and displays interactive charts in a React frontend.

---

## Features

- **Live sensor streaming** from Raspberry Pi (temperature, humidity, etc.)
- Backend built with **Node.js + Express**
- Storage in **MongoDB** with real-time updates
- Dashboard UI using **React + Chart.js**, supporting filterable time windows
- Fully **containerized** with Docker

---

## Tech Stack

| Component       | Tech                 |
|----------------|----------------------|
| Sensor         | Raspberry Pi (Python)|
| Backend        | Node.js, Express     |
| Database       | MongoDB              |
| Frontend       | React, Chart.js      |
| Containerization | Docker             |

---

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/kiroshaker/Real-Time-Sensor-Project
   cd Real-Time-Sensor-Project
