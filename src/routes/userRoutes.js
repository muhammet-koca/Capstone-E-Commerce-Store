const { route } = require("../share");
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllers/userControllers");

const {
  emptyCartById,
  updateItemQuantity,
  createCartById,
  createCartItemsById,
  getCartById,
  getCartItemsById,
} = require("../controllers/cartControllers");

const {
  getProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProduct,
  deleteCartItem,
} = require("../controllers/productControllers");

const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

route.get("/", getProducts); //display all product tested

route.post("/register", register); //tested
route.post("/login", login); //tested
route.get("/product/:id", getProductById); //get individual product(id) details tested

//admin only- add product, update, delete
route.post("/product", authenticateToken, isAdmin, addProduct); //tested
route.put("/updateProduct/:id", authenticateToken, isAdmin, updateProduct); //tested
route.delete("/product/:id", authenticateToken, isAdmin, deleteProductById); //tested
//admin only get all users and get user by ID
route.get("/users", authenticateToken, isAdmin, getUsers); //tested

route.get("/user/:id", authenticateToken, getUserById); //only get account details tested
route.delete("/user/:id", authenticateToken, deleteUser); //only delete self tested
route.put("/user/:id", authenticateToken, updateUser); //only update self tested

route.post("/cart", authenticateToken, createCartById); //create cart tested
route.post("/cartItems/product/:id", authenticateToken, createCartItemsById); //tested
route.delete("/cartItems/:id", authenticateToken, deleteCartItem);

route.get("/getCart/:id", authenticateToken, getCartById); //tested

route.put("/product/cartItem/:id", authenticateToken, updateItemQuantity); //add item to cart (update cart)
route.delete("/checkout/:id", authenticateToken, emptyCartById); //checkout cart (empty cart)
//retest all routes
//No one else should be able to edit my cart except me.

module.exports = route;

//deploy backend
