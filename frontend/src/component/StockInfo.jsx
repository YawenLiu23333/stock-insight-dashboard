import React from 'react'

function StockInfo({data}) {
    if (!data) {
    return <p>No stock info available.</p>;
  }

  return (        
    <div>
      <h2>KEY STATS</h2>
    <p>Ticker: {data.ticker}</p>
    <p>Day High: {data.dayHigh}</p>
    <p>Day Low: {data.dayLow}</p>
    <p>previous Close: {data.previousClose}</p>
    {/* <p>Daily Change: {latest.daily}</p> */}
    </div>
  )
}

export default StockInfo