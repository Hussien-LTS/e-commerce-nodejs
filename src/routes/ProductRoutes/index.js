const express = require("express");

const {
  httpAddProductHandler,
  httpGetProductsHandler,
  httpGetProductByIdHandler,
  httpUpdateProductHandler,
  httpDeleteProductHandler,
} = require("../../controllers/product.controller");

const productRouter = express.Router();

productRouter.post("/products", httpAddProductHandler);
productRouter.get("/products", httpGetProductsHandler);
productRouter.get("/products/:_id", httpGetProductByIdHandler);
productRouter.put("/products/:_id", httpUpdateProductHandler);
productRouter.delete("/products/:_id", httpDeleteProductHandler);

module.exports = productRouter;