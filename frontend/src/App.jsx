import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState(null);

  function handleBack() {
    console.log("User clicked go back");
    setStockData(null);
    setTicker("");
  }

  function handleSearch(ticker) {
    console.log("User searched:", ticker);
    setTicker(ticker);
  }

  useEffect(() => {
    if (!ticker) return;

    fetch(`/api/stock/${ticker}`)
      .then((res) => {
        console.log("response status:", res.status);
      return res.json()})
      .then((data) => {
        console.log("data from Flask:", data);
        setStockData(data);
      });
  }, [ticker]);

  return (
    <>
      {stockData ? (
        <Results stockData={stockData} ticker={ticker} onBack={handleBack}/>
      ) : (
        <Home onSearch={handleSearch} />
      )}
    </>
  );
}

export default App;