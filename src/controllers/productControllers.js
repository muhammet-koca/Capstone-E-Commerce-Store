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
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

//get single product

const getProductById = async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};

//add new products
const addProduct = async (req, res) => {
  try {
    const product = await addProductId(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};
//delete products
const deleteProductById = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
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
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProduct,
};
