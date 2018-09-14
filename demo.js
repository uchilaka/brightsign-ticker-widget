const express = require("express");
require("dotenv").load();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./build/ticker_data.json");
// Ticker middleware
const alphaVantage = require("./middleware/alpha-vantage");

server.use(jsonServer.bodyParser);

// // Serve static files
server.use(express.static("build"));

// Configure middleware
server.get("/live/:symbol", alphaVantage);

// Configure specific endpoint
server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Ticker demo is running @ ${PORT}`));
