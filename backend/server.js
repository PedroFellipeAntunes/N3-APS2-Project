const connect = require("./connect");
const express = require("express");
const cors = require("cors");

const sellOffers = require("./sellOfferRoutes");
const buyOffers = require("./buyOfferRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(sellOffers);
app.use(buyOffers);

app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`server on port ${PORT}`);
});