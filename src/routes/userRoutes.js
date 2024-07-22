const { route } = require("../share");
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  getProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProduct,
  addToCartById,
  emptyCartById,
} = require("../controllers/userControllers");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

route.get("/", getProducts); //display all product tested

route.post("/register", register); //tested
route.post("/login", login); //tested
route.get("/product/:id", getProductById); //get individual product(id) details tested

//rerun prisma migrate
//add item to cart (update cart)
//update cartItems
//set cart to null (item quantity zero?)
//fix isAdmin
//retest all routes
//deploy backend

route.get("/user/:id", authenticateToken, getUserById); //only get account details tested
route.delete("/user/:id", authenticateToken, deleteUser); //only delete self tested
route.put("/user/:id", authenticateToken, updateUser); //only update self tested

//Add to cart
route.put("/cart/:id", authenticateToken, addToCartById); //tested
route.put("/checkout", authenticateToken, emptyCartById); //checkout cart (empty cart)

//admin only- add product, update, delete
route.post("/product", authenticateToken, addProduct); //tested
route.put("/product/:id", authenticateToken, updateProduct); //tested
route.delete("/product/:id", authenticateToken, deleteProductById); //tested
//admin only get all users and get user by ID
route.get("/users/:id", authenticateToken, getUserById); //tested
route.get("/users", authenticateToken, getUsers); //tested

module.exports = route;
