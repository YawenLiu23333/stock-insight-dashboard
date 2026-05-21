# Stock Insight Dashboard

A full-stack stock market dashboard built with React and Flask that allows users to search stock tickers, visualize historical price data, view company information, and read real-time financial news.

## Features

- Search stock tickers (AAPL, TSLA, NVDA, etc.)
- Interactive historical stock charts
- Multiple chart ranges:
  - 1D
  - 5D
  - 1M
  - 6M
  - 1Y
- Real-time market news feed
- Company-specific financial news
- Company profile and key statistics
- AI-style market insight panel
- Market mood analysis card
- Animated ticker tape
- Responsive dashboard UI
- Loading overlay and finance-inspired design

## Tech Stack

### Frontend
- React
- Vite
- Recharts
- CSS

### Backend
- Flask
- Python

### APIs / Data Sources
- Yahoo Finance (`yfinance`)
- Finnhub
- Alpha Vantage

---

## Demo

https://github.com/user-attachments/assets/5f481ea1-9a20-4c66-968b-a4d0bc4fc3dc

## Installation

### Clone Repository
```bash
git clone https://github.com/YawenLiu23333/stock-insight-dashboard.git
```

### Backend Setup
```text
cd backend
pip install flask flask-cors yfinance requests pandas
python app.py
```

### Frontend Setup
```text
cd frontend
npm install
npm install recharts
npm run dev
```






