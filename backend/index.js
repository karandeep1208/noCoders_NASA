const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({
    path: "./config/.env"
});

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to MongoDB Database!!"))
    .catch((err) => console.log("Error connecting to the Database", err));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("NASA Climate Backend Running 🚀");
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`)
});