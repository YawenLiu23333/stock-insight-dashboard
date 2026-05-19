import os
from dotenv import load_dotenv
import requests

load_dotenv()

base_url = 'https://www.alphavantage.co/query?'

def get_url(name):
    api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    url = base_url + 'function=TIME_SERIES_DAILY&' + 'symbol=' + name + '&apikey=' + api_key
    
    r = requests.get(url)
    response = r.json()
    return response


def get_cleaned_data(stock):
    if "Note" in stock:
        return {
        "error": "API rate limit reached"
        }

    if "Time Series (Daily)" not in stock:
        return {
        "error": "Invalid ticker",
        }
    time_series = stock["Time Series (Daily)"]

    cleaned = []
    for date, values in time_series.items():
        cleaned.append({
            "datetime": date,
            "open": values["1. open"],
            "high": values["2. high"],
            "low": values["3. low"],
            "close": values["4. close"],
            "volume": values["5. volume"]
        })
    return cleaned


# stock = get_url('AAPL')
# stock_info = get_cleaned_data(stock)
# print('cleaned data is:', stock_info)

