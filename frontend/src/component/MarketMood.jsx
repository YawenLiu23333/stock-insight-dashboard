import React from "react";

function MarketMood({ quote, news }) {
  if (!quote) return null;

  const isPositive = quote.change >= 0;
  const newsCount = Array.isArray(news) ? news.length : 0;

  const score = isPositive
    ? Math.min(85, 60 + Math.abs(quote.changePercent) * 5)
    : Math.max(25, 55 - Math.abs(quote.changePercent) * 5);

  return (
    <div className="mood-card">
      <div>
        <h2>Market Mood</h2>
        <p>Sentiment analysis based on price movement and available news volume.</p>
      </div>

      <div className="mood-grid">
        <div className="mood-box">
          <span className="mood-label">Momentum</span>
          <strong className={isPositive ? "positive-text" : "negative-text"}>
            {isPositive ? "Positive" : "Negative"}
          </strong>
        </div>

        <div className="mood-box">
          <span className="mood-label">News Volume</span>
          <strong>{newsCount} Articles</strong>
        </div>

        <div className="mood-box">
          <span className="mood-label">Score</span>
          <strong>{Math.round(score)}/100</strong>
        </div>
      </div>
    </div>
  );
}

export default MarketMood;