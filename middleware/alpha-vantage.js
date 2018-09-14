require("dotenv").load();
const rp = require("request-promise");

module.exports = (req, res, next) => {
  let { symbol } = req.params;
  if (!symbol) {
    console.log(`NO symbol found. Will default to ADS`);
    symbol = "ADS";
  }
  const q = {
    uri: "https://www.alphavantage.co/query",
    method: "GET",
    qs: {
      function: "GLOBAL_QUOTE",
      symbol,
      apikey: process.env.ALPHA_VANTAGE_API_KEY
    },
    json: true
  };
  rp(q).then(function(data) {
    // Show response
    console.log(`Response from ${q.method} ${q.uri} -> `, data);
    return res.json(data);
  });
};
