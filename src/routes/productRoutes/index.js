const express = require("express");

const {
  httpAddProductHandler,
  httpGetProductsHandler,
  httpGetProductByIdHandler,
  httpUpdateProductHandler,
  httpDeleteProductHandler,
} = require("../../controllers/product.controller");

const productRouter = express.Router();

productRouter.post("/", httpAddProductHandler);
productRouter.get("/", httpGetProductsHandler);
productRouter.get("/:_id", httpGetProductByIdHandler);
productRouter.put("/:_id", httpUpdateProductHandler);
productRouter.delete("/:_id", httpDeleteProductHandler);

module.exports = productRouter;
