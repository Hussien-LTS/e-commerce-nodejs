const express = require("express");

const {
  httpAddCategoryHandler,
  httpGetCategoriesHandler,
  httpGetCategoryByIdHandler,
  httpUpdateCategoryHandler,
  httpDeleteCategoryHandler,
  // httpAddProductToCategoryHandler,
} = require("../../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.post("/", httpAddCategoryHandler);
categoryRouter.get("/", httpGetCategoriesHandler);
categoryRouter.get("/:_id", httpGetCategoryByIdHandler);
categoryRouter.put("/:_id", httpUpdateCategoryHandler);
// categoryRouter.put("/:_id", httpAddProductToCategoryHandler);
categoryRouter.delete("/:_id", httpDeleteCategoryHandler);

module.exports = categoryRouter;
