const {
    addToCart,
    emptyCart,
    updateCartItems,
    updateCart,
    createCart,
  } = require("../queries/cartQueries");

//update products
const addToCartById = async (req, res) => {
    try {
      const product = await addToCart(req.params.id, req.body.usersId);
      if (!product) {
        return res.status(404).send("not found");
      }
      console.log(product);
      res.send(product);
    } catch (error) {
      res.status(500).send("update product error");
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
  
  const updateItemQuantity = async (req, res) => {
    try {
      const product = await updateCartItems(
        req.params.id,
        req.body.productsId,
        req.body.cartId
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
  
  const updateCartById = async (req, res) => {
    try {
      const cart = await updateCart(
        req.params.id,
        req.body.cartItems,
        req.body.usersId
      );
      if (!cart) {
        return res.status(404).send("not found");
      }
      console.log(cart);
      res.send(cart);
    } catch (error) {
      res.status(500).send("update cart error");
    }
  };
  
  const createCartById = async (req, res) => {
    try {
      const cart = await createCart(req.body.usersId);
      res.send(cart);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {
    addToCartById,
    emptyCartById,
    updateItemQuantity,
    updateCartById,
    createCartById,
  };