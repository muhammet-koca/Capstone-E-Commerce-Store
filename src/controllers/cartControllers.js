const {
  addToCart,
  emptyCart,
  updateCartItems,
  createCart,
  createCartItems,
  getCart,
  getCartItems,
} = require("../queries/cartQueries");

const createCartById = async (req, res) => {
  try {
    const cart = await createCart(req.body.usersId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).send("Failed to create cart");
  }
};

const createCartItemsById = async (req, res) => {
  try {
    const cartItem = await createCartItems(
      req.body.productsId,
      req.body.cartId
    );
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).send("Failed to add cart item");
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await getCart(req.params.id);
    if (!cart) return res.status(404).send("Cart not found");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("Failed to retrieve cart");
  }
};

const getCartItemsById = async (req, res) => {
  try {
    const cartItems = await getCartItems(req.params.cartId);
    if (!cartItems) return res.status(404).send("Cart items not found");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).send("Failed to retrieve cart items");
  }
};

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

// const addToCartById = async (req, res) => {
//   try {
//     const { productsId } = req.body;
//     const cartId = req.params.id; // Assumed cart ID is passed as a parameter

//     // Validate cartId and productsId
//     if (!cartId || !productsId) {
//       return res.status(400).send("Bad request: Missing parameters");
//     }

//     const product = await addToCart(cartId, productsId);
//     if (!product) {
//       return res.status(404).send("Product not found");
//     }
//     res.status(201).send(product);
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).send("Failed to add to cart");
//   }
// };

const updateItemQuantity = async (req, res) => {
  try {
    const updatedItem = await updateCartItems(
      req.params.id,
      req.body.productsId,
      req.body.quantity
    );
    if (!updatedItem) return res.status(404).send("Cart item not found");
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).send("Failed to update cart item");
  }
};

// const emptyCartById = async (req, res) => {
//   try {
//     const cart = await emptyCart(
//       req.params.id,
//       req.body.cartItems,
//       req.body.usersId
//     );
//     console.log(cart, "testcart");
//     if (!cart) {
//       return res.status(404).send("cart empty");
//     }
//     res.send(cart);
//   } catch (error) {
//     res.status(500).send("cart error");
//   }
// };

const emptyCartById = async (req, res) => {
  console.log(req.params);
  try {
    await emptyCart(req.params.id);
    res.status(200).send("Cart successfully emptied");
  } catch (error) {
    res.status(500).send("Failed to empty cart");
  }
};

module.exports = {
  addToCartById,
  emptyCartById,
  updateItemQuantity,
  createCartById,
  createCartItemsById,
  getCartById,
  getCartItemsById,
};
