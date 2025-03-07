const connect = require("./connect");
const express = require("express");
const cors = require("cors");

const offers = require("./offerRoutes");

const app = express();
const PORT = 3000;

//Fix for payload size
const bodyParser = require('body-parser');
// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Express 3.0
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb' }));

app.use(cors());
app.use(express.json());
app.use(offers);

app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`server on port ${PORT}`);
});