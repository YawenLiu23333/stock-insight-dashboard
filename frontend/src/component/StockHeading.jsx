import "../App.css";

function StockHeading({ quote }) {

  if (!quote) {
    return <p>Loading stock heading...</p>;
  }

  const isPositive = quote.change >= 0;

  return (
    <div className="stock-heading">

      <h1>{quote.ticker}</h1>

      <div className="price-section">

        <span className="stock-price">
          ${quote.price}
        </span>

        <span className={isPositive ? "positive" : "negative"}>

          {isPositive ? "▲" : "▼"}

          {" "}
          {quote.change}

          {" "}

          ({quote.changePercent}%)

        </span>

      </div>

    </div>
  );
}

export default StockHeading;