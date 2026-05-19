from dotenv import load_dotenv
import os
import finnhub

load_dotenv()
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
# print(FINNHUB_API_KEY)
finnhub_client = finnhub.Client(api_key=FINNHUB_API_KEY)

def get_market_news():
    try:
        market_news = finnhub_client.general_news('general', min_id=0)

        if not market_news:
            return {
                "error": "Market news cannot be found."
            }

        return market_news

    except Exception as e:
        return {
            "error": "Failed to fetch market news.",
            "details": str(e)
        }


def get_company_news(ticker):
    try:
        company_news = finnhub_client.company_news(
            ticker,
            _from="2026-05-01",
            to="2026-05-07"
        )

        if not company_news:
            return {
                "error": "Invalid ticker, news cannot be found."
            }

        return company_news

    except Exception as e:
        return {
            "error": "Failed to fetch company news.",
            "details": str(e)
        }
# news = get_company_news('AAPL')
# general = get_market_news()
# print(news)
# print(general)