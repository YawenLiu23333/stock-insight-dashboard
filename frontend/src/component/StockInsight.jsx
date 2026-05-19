import React from "react";

function StockInsight({ quote, profile }) {
  if (!quote) return null;

  const isPositive = quote.change >= 0;

  return (
    <div className="insight-card">
      <h2>AI Market Snapshot</h2>

      <p>
        {quote.ticker} is currently trading at <strong>${quote.price}</strong>,
        {isPositive ? " showing positive momentum " : " showing negative movement "}
        today with a change of <strong>{quote.changePercent}%</strong>.
      </p>

      <p>
        The stock traded between <strong>${quote.dayLow}</strong> and{" "}
        <strong>${quote.dayHigh}</strong> during the session.
      </p>

      {profile?.sector && (
        <p>
          Sector exposure: <strong>{profile.sector}</strong>. This can help users
          understand the broader market category behind the stock.
        </p>
      )}

      <div className={isPositive ? "signal bullish" : "signal bearish"}>
        {isPositive ? "Bullish short-term signal" : "Bearish short-term signal"}
      </div>
    </div>
  );
}

export default StockInsight;