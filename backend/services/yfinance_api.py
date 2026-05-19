import yfinance as yf
import pandas as pd

def get_yfinance_api(ticker):
    yfinance_ticker = yf.Ticker(ticker)
    return yfinance_ticker

def get_yfinance_period_info(yfinance_ticker, time, interval): #ticker as an object
    #time/interval: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
    yfinance_period_info = yfinance_ticker.history(period=time, interval=interval)
    return yfinance_period_info

# res = get_yfinance_api('AAPL')
# period_res = get_yfinance_period_info(res, '1d', '1m')
# yfinance_live = get_yfinance_live(res)
# print("data type: ", type(yfinance_live), 'full data: ', yfinance_live)
# print("data type: ", type(period_res), 'full data: ', period_res, 'data columns: ', period_res.columns)

#needs yfinance_period_info, set intraday=True for 1d/5d)
def clean_history_data(df, period="1mo", interval="1d"):
    result = []

    for date, row in df.iterrows():
        if period in ["1d", "5d"]:
            display_date = date.strftime("%Y-%m-%d %H:%M")
        else:
            display_date = date.strftime("%Y-%m-%d")

        result.append({
            "datetime": display_date,
            "open": round(row["Open"], 2),
            "high": round(row["High"], 2),
            "low": round(row["Low"], 2),
            "price": round(row["Close"], 2),
            "close": round(row["Close"], 2),
            "volume": int(row["Volume"])
        })

    return result

# clean_data = clean_history_data(period_res, '1d', '1m')
# print("clean data type: ", type(clean_data), "full clean data: ", clean_data)

def get_quote(ticker):
    yf_ticker = yf.Ticker(ticker)
    info = yf_ticker.fast_info
    price = info["last_price"]
    previous_close = info["previous_close"]


    change = price - previous_close
    change_percent = (change / previous_close) * 100


    return {
        "ticker": ticker.upper(),
        "price": round(price, 2),
        "previousClose": round(previous_close, 2),
        "change": round(change, 2),
        "changePercent": round(change_percent, 2),
        "dayHigh": round(info["day_high"], 2),
        "dayLow": round(info["day_low"], 2),
        "volume": int(info["last_volume"] or 0)
    }

def get_company_profile(ticker):
    yf_ticker = yf.Ticker(ticker)
    info = yf_ticker.info
    return info
# 
# if __name__ == "__main__":
    quote = get_quote('AAPL')
    print('quote type', type(quote), 'quote data:', quote)
    # info = get_company_profile('AAPL')
    # print('profile info type: ', type(info), 'full data: ', info)
