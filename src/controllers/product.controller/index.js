const { CategorySchema } = require("../../models/Category");
const { ProductSchema } = require("../../models/Product");

const httpAddProductHandler = async (req, res) => {
  // const { error } = validateProducts(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    // console.log("req.body====>", req.body);
    const result = await ProductSchema.create(req.body);
    await CategorySchema.findByIdAndUpdate(req.body._categoryId, { $push: {_productId:result._id} });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpGetProductsHandler = async (req, res) => {
  try {
    const options = {
      _id: 1,
      __v: 0,
    };
    // console.log("results", await ProductSchema.find({}, options));
    const results = await ProductSchema.find({}, options);
    results.length <= 0
      ? res.status(200).json("no data")
      : res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpGetProductByIdHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
    const options = {
      _id: 0,
      __v: 0,
    };
    const results = await ProductSchema.findOne(query, options);
    res.status(201).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpUpdateProductHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
    // console.log(req.body);
    // console.log(id);
    const options = {
      $set: req.body,
    };
    await ProductSchema.findOneAndUpdate(query, options);
    const results = await ProductSchema.findOne(query, {
      _id: 0,
      __v: 0,
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpDeleteProductHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };

    await ProductSchema.findByIdAndDelete(query);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = {
  httpAddProductHandler,
  httpGetProductsHandler,
  httpGetProductByIdHandler,
  httpUpdateProductHandler,
  httpDeleteProductHandler,
};
