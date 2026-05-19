import React from "react";

function TopMovers() {
  const movers = [
    { ticker: "AKAM", name: "Akamai Technologies", price: "147.18", change: "+26.82%" },
    { ticker: "SNDK", name: "Sandisk Crops", price: "1562.30", change: "+16.15%" },
    { ticker: "UU", name: "Micron Technology", price: "746.44", change: "+15.74%" },
    { ticker: "INTC", name: "Intel Crop", price: "124.90", change: "+13.92%" },
  ];

  return (
    <section className="top-movers-section">
      <div className="section-header">
        <h2>Top Movers</h2>
        <span>Market Snapshot</span>
      </div>

      <div className="movers-grid">
        {movers.map((stock) => (
          <div className="mover-card" key={stock.ticker}>
            <div>
              <h3>{stock.ticker}</h3>
              <p>{stock.name}</p>
            </div>

            <div className="mover-price">
              <strong>${stock.price}</strong>
              <span>{stock.change}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopMovers;