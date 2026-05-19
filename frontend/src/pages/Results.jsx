import React from "react";
import StockChart from "../component/StockChart";
import NewsList from "../component/NewsList";
import StockInfo from "../component/StockInfo";
import StockHeading from "../component/StockHeading";
import CompanyProfile from "../component/CompanyProfile";
import StockInsight from "../component/StockInsight";
import MarketMood from "../component/MarketMood";
import "../App.css";

function Results({
  stockData,
  stockQuote,
  ticker,
  onBack,
  companyNews,
  onRangeChange,
  companyProfile,
}) {
  if (!Array.isArray(stockData)) {
    return (
      <>
        <p>Searched ticker: {ticker}</p>
        <p>{stockData?.error || "No valid chart data."}</p>
        <button onClick={onBack}>Go Back</button>
      </>
    );
  }

  return (
    <div className="results-page">
      <div className="main-content">
        <StockHeading quote={stockQuote} />

        <StockChart stockData={stockData} ticker={ticker} />

        <div className="range-buttons">
          <button onClick={() => onRangeChange("1D")}>[1D]</button>
          <button onClick={() => onRangeChange("5D")}>[5D]</button>
          <button onClick={() => onRangeChange("1M")}>[1M]</button>
          <button onClick={() => onRangeChange("6M")}>[6M]</button>
          <button onClick={() => onRangeChange("1Y")}>[1Y]</button>
        </div>

        <StockInsight quote={stockQuote} profile={companyProfile} />

        <MarketMood quote={stockQuote} news={companyNews} />

        <div className="info-row">
          <div className="info-card">
            <StockInfo data={stockQuote} />
          </div>

          <div className="info-card">
            <CompanyProfile profile={companyProfile} />
          </div>
        </div>

        <button onClick={onBack}>Go Back</button>
      </div>

      <div className="news-sidebar">
        <h2>Latest News</h2>

        <NewsList
          news={companyNews}
          limit={5}
          showImage={true}
          requireImage={true}
        />
      </div>
    </div>
  );
}

export default Results;