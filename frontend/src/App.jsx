import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState(null);
  const [marketNews, setMarketNews] = useState([]);
  const [companyNews, setCompanyNews] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [error, setError] = useState("");
  const [stockQuote, setStockQuote] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);

  const RANGE_CONFIG = {
  "1D": { period: "1d", interval: "1m" },
  "5D": { period: "5d", interval: "5m" },
  "1M": { period: "1mo", interval: "1d" },
  "6M": { period: "6mo", interval: "1d" },
  "1Y": { period: "1y", interval: "1d" },
  };
  //renders market news automatically
  useEffect(() => {
      fetch("/api/news/market")
      .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Market news request failed: ${res.status}`);
      }

      return res.json();
      })
      .then((data) => {
        console.log("market data received:", data);
        setMarketNews(data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch market news:", err);
      });
  }, []);

  function handleBack() {
    console.log("User clicked go back");
    setStockData(null);
    setCompanyNews([]);
    setTicker("");
    setError("");
    setStockQuote(null);
    setCompanyProfile(null);
  }

  function handleSearch(searchTicker) {
    console.log("User searched:", searchTicker);
    setTicker(searchTicker.toUpperCase());
    setStockData(null);
    setCompanyNews([]);
    setError("");
  }

  //fecthes stock data and company news after user searches
  useEffect(() => {
    console.log("ticker changed:", ticker);
    if (!ticker) return;

    setLoadData(true);
    setError("");

    fetch(`/api/stock/${ticker}`)
      .then(async (res) => {
        const data = await res.json();

        console.log("response status:", res.status);
        console.log("data from Flask:", data);

        if (!res.ok) {
          throw new Error(data.error || "Invalid ticker or stock data not found.");
        }

        return data;
      })
      .then((data) => {
        setStockData(data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch stock data:", err);
        setStockData(null);
        setError(err.message);
      })
      .finally(() => {
        setLoadData(false);
      });

    fetch(`/api/news/company/${ticker}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("company news received from Flask:", data);
        setCompanyNews(data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch company news:", err);
      });

    fetch(`/api/quote/${ticker}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Stock Quote received:", data);
        setStockQuote(data);
      });

    fetch(`/api/company/profile/${ticker}`)
    .then((res) => res.json())
    .then((data) => { 
      console.log("Company profile received:", data)
      setCompanyProfile(data)
    });

  }, [ticker]);

//re-renders the stock chart after user selects a range
  function handleRangeChange(range) {
    const config = RANGE_CONFIG[range];
    console.log("user chose range: ", range, "default interval: ", config.interval)
    
    fetch(`/api/yfinance/${ticker}?period=${config.period}&interval=${config.interval}`)
    .then((res) => res.json())
    .then((data) => {
      setStockData(data.data);
    });
}

  return (
    <>
      {loadData && (
        <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Loading market data...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {stockData ? (
        <Results
          stockData={stockData}
          stockQuote={stockQuote}
          companyNews={companyNews}
          ticker={ticker}
          onBack={handleBack}
          onRangeChange={handleRangeChange}
          companyProfile={companyProfile}
        />
      ) : (
        <Home onSearch={handleSearch} news={marketNews} />
      )}
    </>
  );
}

export default App;