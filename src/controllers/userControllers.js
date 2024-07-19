const {
  registerQuery,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getSingleUser,
  getAllProducts,
  getProduct,
  addProductId,
  deleteProduct,
  updateProduct,
} = require("../queries/userQuery");
const { bcrypt } = require("../share");
const { jwt } = require("../share");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send(token);
};

const login = async (req, res) => {
  const token = await loginUser(req.body.email, req.body.password);

  res.status(201).send({ token });
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    res.send(console.log("success"));
  } catch (error) {
    res.status(500).send("delete error");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.isAdmin
    );
    if (!user) {
      return res.status(404).send("not found");
    }
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).send("update error");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getSingleUser(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("single user error");
  }
};

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
const deleteProduct = async (req, res) => {
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
//update products
const updateProduct = async (req, res) => {
  try {
    const product = await updateProduct(
      req.params.id,
      req.body.productName,
      req.body.image,
      req.body.price,
      req.body.publish,
      req.body.usersId
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
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
