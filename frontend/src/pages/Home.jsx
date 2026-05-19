import React from "react";
import SearchBar from "../component/SearchBar";
import NewsList from "../component/NewsList";
import TopMovers from "../component/TopMovers";
import TickerTape from "../component/TickerTape";
import "../App.css";

function Home({ onSearch, news }) {
  return (
    <div className="home-page">

      <TickerTape />

      <div className="hero-section">
        <h1>Stock Market Dashboard</h1>

        <p>
          Search a ticker to view price trends, company data,
          and recent market news.
        </p>

        <SearchBar onSearch={onSearch} />
      </div>

      <TopMovers />

      <section className="market-news-section">
        <h2>Market News</h2>

        <NewsList
          news={news}
          limit={6}
          requireImage={true}
          showImage={true}
        />
      </section>

    </div>
  );
}

export default Home;