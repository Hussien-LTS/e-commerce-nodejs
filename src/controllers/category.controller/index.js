const { CategorySchema } = require("../../models/Category");
const { ProductSchema } = require("../../models/Product");

const httpAddCategoryHandler = async (req, res) => {
  // const { error } = validateCategories(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    // console.log("req.body====>", req.body);
    const result = await CategorySchema.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpGetCategoriesHandler = async (req, res) => {
  try {
    const options = {
      _id: 1,
      __v: 0,
    };
    // console.log("results", await CategorySchema.find({}, options));
    const results = await CategorySchema.find({}, options);
    results.length <= 0
      ? res.status(200).json("no data")
      : res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpGetCategoryByIdHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
    const options = {
      _id: 0,
      __v: 0,
    };
    await CategorySchema.findOne(query, options)
      .populate("_productId") // only works if we pushed refs to person.eventsAttended
      .exec((err, results) => {
        if (err) {
          console.log(err);
          res.status(400).end();
        }
        return res.json({
          success: true,
          data: results,
        });
      });
    // results == null
    //   ? res.status(200).json("no data")
    //   : res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const httpUpdateCategoryHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
    // console.log(req.body);
    // console.log(id);
    const options = {
      $set: req.body,
    };
    await CategorySchema.findOneAndUpdate(query, options);
    const results = await CategorySchema.findOne(query, {
      _id: 0,
      __v: 0,
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

// const httpAddProductToCategoryHandler = async (req, res) => {
//   try {
//     const id = req.params._id;
//     const query = { _id: id };
//     const productId = req.body;
//     // console.log(req.body);
//     // console.log(id);
//     const options = {
//       $push: { _productId: productId },
//     };
//     await CategorySchema.findOneAndUpdate(query, options);
  
//     const results = await CategorySchema.findOne(query, {
//       _id: 0,
//       __v: 0,
//     });
//     await res.status(200).json(results);
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error", error });
//   }
// };

const httpDeleteCategoryHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };

    await CategorySchema.findByIdAndDelete(query);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

module.exports = {
  httpAddCategoryHandler,
  httpGetCategoriesHandler,
  httpGetCategoryByIdHandler,
  httpUpdateCategoryHandler,
  httpDeleteCategoryHandler,
  // httpAddProductToCategoryHandler,
};
