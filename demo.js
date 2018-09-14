const express = require("express");
require("dotenv").load();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./build/ticker_data.json");
const cors = require("./middleware/cors");
// Ticker middleware
const alphaVantage = require("./middleware/alpha-vantage");

server.use(cors);
server.use(jsonServer.bodyParser);
// @TODO Find a less intense (jsonServer built-in) way to do this (we're bringing in ALL of express right now!!)
// Serve static files
server.use(express.static("build"));

// Configure middleware
server.get("/live/:symbol", alphaVantage);

// Configure specific endpoint
server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Ticker demo is running @ ${PORT}`));
