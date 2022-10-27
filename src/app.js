"use strict";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productRouter = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRouter)

app.get("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});

module.exports = app;
