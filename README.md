# BrightSign Ticker Data

This is a proof of concept to demonstrate integrating a fully customized ticker into the BrightSign display system.

## How it Works

- We've setup a simulated API @ `https://brightsign-ticker-api.herokuapp.com/` from which we are fetching fake ticker data.
- The frontend code in `./build/index.html` consumes the `GET /stocks` endpoint from this service and on success, extracts and displays both the symbol and current price.
