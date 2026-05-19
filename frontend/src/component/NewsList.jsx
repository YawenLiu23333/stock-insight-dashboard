import React from "react";

function NewsList({ news, limit = 5, requireImage = false, showImage = true }) {
  const newsArray = Array.isArray(news) ? news : news?.data || [];

  if (newsArray.length === 0) {
    return <p>No news available.</p>;
  }

  const getImage = (item) => {
    return item.image || item.urlToImage || item.banner_image || "";
  };

  const isRealNewsImage = (image) => {
    if (!image) return false;

    const lowerImage = image.toLowerCase();

    const blockedLogoImages = [
      "logo",
      "finnhub",
      "yahoo_finance",
      "reuters_logo",
      "benzinga_logo",
      "seekingalpha_logo",
    ];

    return !blockedLogoImages.some((word) => lowerImage.includes(word));
  };

  const getTitle = (item) => {
    return item.headline || item.title || "Untitled News";
  };

  const getSummary = (item) => {
    return item.summary || item.description || "No summary available.";
  };

  const filteredNews = requireImage
    ? newsArray.filter((item) => isRealNewsImage(getImage(item)))
    : newsArray;

  const displayedNews = filteredNews.slice(0, limit);

  if (displayedNews.length === 0) {
    return <p>No news with article images available right now.</p>;
  }

  return (
    <div className="news-list">
      {displayedNews.map((item) => {
        const title = getTitle(item);
        const summary = getSummary(item);
        const image = getImage(item);
        const url = item.url || "#";

        return (
          <div className="news-item" key={item.id || item.url || title}>
            {showImage && image && <img src={image} alt={title} />}

            <h3>
              <a href={url} target="_blank" rel="noreferrer">
                {title}
              </a>
            </h3>

            <p>{summary}</p>
          </div>
        );
      })}
    </div>
  );
}

export default NewsList;