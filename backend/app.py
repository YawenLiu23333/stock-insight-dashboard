from flask import Flask, jsonify
from services import stock_api


app = Flask(__name__)

@app.route('/')
def home():
    return {"message": "Backend is working"}

@app.route('/api/stock/<ticker>')
def stock(ticker):
    ticker_raw_data = stock_api.get_url(ticker)
    cleaned_data = stock_api.get_cleaned_data(ticker_raw_data)
    if "error" in cleaned_data:
        return jsonify(cleaned_data), 400
    return jsonify(cleaned_data)

if __name__ == "__main__":
    app.run(debug=True)
