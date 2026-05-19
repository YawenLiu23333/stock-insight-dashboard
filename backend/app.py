from flask import Flask, jsonify, request
from services import stock_api
from services import news_api
from services import yfinance_api

app = Flask(__name__)

stock_cache = {}
general_news_cache = {}
company_news_cache = {}

#test route
@app.route('/')
def home():
    return {"message": "Backend is working"}

#route for fetchign general news
@app.route("/api/news/market")
def market_news():
    cache_key = "general"

    if cache_key in general_news_cache:
        return jsonify({
            "source": "cache",
            "type": "market_news",
            "data": general_news_cache[cache_key]
        })

    data = news_api.get_market_news()
    general_news_cache[cache_key] = data

    if "error" in data:
        return jsonify(data), 400
    
    return jsonify({
        "source": "api",
        "type": "market_news",
        "data": data
    })

#fecthes company news once user searched a ticker
@app.route("/api/news/company/<ticker>")
def company_news(ticker):
    ticker = ticker.upper()

    if ticker in company_news_cache:
        return jsonify({
            "ticker": ticker,
            "source": "cache",
            "type": "company_news",
            "data": company_news_cache[ticker]
        })

    data = news_api.get_company_news(ticker)
    company_news_cache[ticker] = data

    if "error" in data:
        return jsonify(data), 400

    return jsonify({
        "ticker": ticker,
        "source": "api",
        "type": "company_news",
        "data": data
    })

#fecthes geenral ticker info from Alpha Vantage
@app.route('/api/stock/<ticker>')
def stock(ticker):
    ticker = ticker.upper()

    if ticker in stock_cache:
        return jsonify({
            "ticker": ticker,
            "source": "cache",
            "data": stock_cache[ticker]
        })

    ticker_raw_data = stock_api.get_url(ticker)
    cleaned_data = stock_api.get_cleaned_data(ticker_raw_data)

    if "error" in cleaned_data:
        return jsonify(cleaned_data), 400

    stock_cache[ticker] = cleaned_data

    return jsonify({
        "ticker": ticker,
        "source": "api",
        "data": cleaned_data
    })

#fetches detailed stock info for charts 
@app.route("/api/yfinance/<ticker>")
def get_yfinance_data(ticker):
    period = request.args.get("period", "1mo")
    interval = request.args.get("interval", "1d")

    yf_ticker = yfinance_api.get_yfinance_api(ticker)
    df = yfinance_api.get_yfinance_period_info(yf_ticker, period, interval)
    cleaned_data = yfinance_api.clean_history_data(df, period, interval)

    return jsonify({
        "ticker": ticker.upper(),
        "period": period,
        "interval": interval,
        "data": cleaned_data
    })

#fecthes fast quote for ticker
@app.route("/api/quote/<ticker>")
def get_quote(ticker):
    data = yfinance_api.get_quote(ticker)
    return jsonify(data)

#fetches company profile info
@app.route("/api/company/profile/<ticker>")
def get_company_profile(ticker):
    data = yfinance_api.get_company_profile(ticker)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)