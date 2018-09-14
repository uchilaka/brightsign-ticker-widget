import React, { Fragment } from "react";

export class StockTickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isBusy: true };
  }

  updateTickerInfo(ticker) {
    this.setState({ ticker });
  }

  loadTickerData = async () => {
    // Using the live (alpha-vantage) API
    let updates = { isBusy: false };
    try {
      const data = await fetch(
        "https://brightsign-ticker-api.herokuapp.com/live/ADS",
        {
          "Content-Type": "application/json"
        }
      ).then(function(response) {
        console.log("Result -> ", response);
        return response.json();
      });
      console.log("Data -> ", data);
      // Formatting
      var fields = {
        "01. symbol": "symbol",
        "05. price": "price",
        "09. change": "change"
      };
      var arrayOfFields = Object.keys(fields);
      var packet = {};
      for (var i = 0; i < arrayOfFields.length; i++) {
        const field = fields[arrayOfFields[i]];
        packet[field] = data["Global Quote"][arrayOfFields[i]];
      }
      if (packet.price) packet.price = parseFloat(packet.price);
      packet.change = packet.change ? parseFloat(packet.change) : 0;
      console.log("Packet -> ", packet);
      // Test to make sure you have an array
      updates.ticker = packet;
      // Update state
      this.setState(updates);
    } catch (err) {
      console.error("Fetch failed :(", err);
    }
  };

  componentDidMount = async () => {
    // Pull the stock data
    return this.loadTickerData();
  };

  renderTickerView() {
    const { ticker } = this.state;
    if (!ticker) return null;
    return (
      <Fragment>
        <span>
          {ticker.symbol} {ticker.price}
        </span>
      </Fragment>
    );
  }

  render() {
    const { isBusy } = this.state;
    return (
      <Fragment>{isBusy ? "Loading..." : this.renderTickerView()}</Fragment>
    );
  }
}

export default StockTickerComponent;
