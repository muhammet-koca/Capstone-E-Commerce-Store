const {
  getAllProducts,
  getProduct,
  addProductId,
  deleteProduct,
  adminUpdateProduct,
} = require("../queries/productQueries");

//get all products

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("error");
  }
};

//get single product

const getProductById = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) {
      return res.status(404).send("not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("single product error");
  }
};

//add new products
const addProduct = async (req, res) => {
  const product = await addProductId(req.body);
  res.send(product);
};
//delete products
const deleteProductById = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).send("not found");
    }
    res.send(console.log("success"));
  } catch (error) {
    res.status(500).send("delete error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await adminUpdateProduct(
      req.params.id,
      req.body.productName,
      req.body.image,
      req.body.price,
      req.body.publish
    );
    if (!product) {
      return res.status(404).send("not found");
    }
    console.log(product);
    res.send(product);
  } catch (error) {
    res.status(500).send("update product error");
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProduct,
};
