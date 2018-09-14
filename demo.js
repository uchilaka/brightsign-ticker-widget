const express = require("express");
const app = express();

app.use(express.static("build"));

const PORT = 4000;

app.listen(PORT, () => console.log(`Ticker demo is running @ ${PORT}`));
