import React from "react";
import StockChart from "../component/StockChart";

function Results({ stockData, ticker, onBack}) {
  console.log("result is", ticker);
  console.log("stock data is", stockData);
  console.log(Array.isArray(stockData));
  if (!Array.isArray(stockData)) {
  return (
    <>
      <p>Searched ticker: {ticker}</p>
      <p>{stockData.error || "No valid chart data."}</p>
      <button onClick={onBack}>Go Back</button>
    </>
  );

}

  return (
    <>
      <p>Searched ticker: {ticker}</p>
      
        <StockChart data={stockData} />
  
      <button onClick = {() => onBack()}> Go Back</button>
    </>
  );
}

export default Results;