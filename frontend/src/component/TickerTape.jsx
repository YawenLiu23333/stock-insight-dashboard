import React from "react";

function TickerTape() {
  const tickers = [
    { symbol: "EGO", price: "34.15.41", change: "+0.82%" },
    { symbol: "TFPM", price: "33.38.92", change: "+1.24%" },
    { symbol: "KRYS", price: "305.18", change: "+4.82%" },
    { symbol: "ECG", price: "163.30", change: "+3.15%" },
    { symbol: "PSKY", price: "11.90", change: "+1.92%" },
    { symbol: "CSTM", price: "11.55", change: "+1.15%" },
    { symbol: "ENS", price: "119.44", change: "+2.41%" },
    { symbol: "B", price: "43.77", change: "+0.88%" },
  ];

  return (
    <div className="ticker-tape">
      <div className="ticker-track">
        {[...tickers, ...tickers].map((stock, index) => (
          <div className="ticker-item" key={index}>
            <span className="ticker-symbol">{stock.symbol}</span>

            <span className="ticker-price">${stock.price}</span>

            <span className="ticker-change">
              {stock.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TickerTape;