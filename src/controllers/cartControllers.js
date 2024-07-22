const {
  addToCart,
  emptyCart,
  updateCartItems,
  createCart,
  createCartItems,
  getCart,
} = require("../queries/cartQueries");

const createCartById = async (req, res) => {
  try {
    const cart = await createCart(req.body.usersId);
    res.send(cart);
    console.log(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCartItemsById = async (req, res) => {
  try {
    const cartItem = await createCartItems(
      req.body.productsId,
      req.body.cartId
    );
    res.send(cartItem);
    console.log(cartItem);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await getCart(req.params.id);
    if (!cart) {
      return res.status(404).send("not found");
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("get cart error");
  }
};

//update products
const addToCartById = async (req, res) => {
  try {
    const product = await addToCart(req.params.id, req.body.productsId);
    if (!product) {
      return res.status(404).send("not found");
    }
    console.log(product);
    res.send(product);
  } catch (error) {
    res.status(500).send("update product error");
  }
};

const updateItemQuantity = async (req, res) => {
  try {
    const product = await updateCartItems(
      req.params.id,
      req.body.productsId,
      req.body.quantity
    );
    if (!product) {
      return res.status(404).send("not found");
    }
    console.log(product);
    res.send(product);
  } catch (error) {
    res.status(500).send("update cartItems error");
  }
};

const emptyCartById = async (req, res) => {
  try {
    const cart = await emptyCart(
      req.params.id,
      req.body.cartItems,
      req.body.usersId
    );
    console.log(cart, "testcart");
    if (!cart) {
      return res.status(404).send("cart empty");
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send("cart error");
  }
};

module.exports = {
  addToCartById,
  emptyCartById,
  updateItemQuantity,
  createCartById,
  createCartItemsById,
  getCartById,
};
