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
  deleteProduct,
  updateProduct,
} = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authMiddleware");

route.get("/", getProducts); //display all product

route.post("/register", register);
route.post("/login", login);
route.get("/:id", getProductById); //get individual product(id) details

//get cart
//can we get one piece of information? can we get just cart product array from user?
route.get("/user/:id/cart", authenticateToken, getUserById);
route.delete("/user/:id", authenticateToken, deleteUser); //only delete self
route.put("/user/:id", authenticateToken, updateUser); //only update self

//update cart
route.put("/:id", authenticateToken, updateProduct);

//checkout cart (empty cart)
//should we be doing delete or update? or is it frontend only?

//admin only- add product, update, delete
route.post("/product", authenticateToken, addProduct);
route.put("/product/:id", authenticateToken, updateProduct);
route.delete("/product/:id", authenticateToken, deleteProduct);
//admin only get all users and get user by ID
route.get("/users/:id", authenticateToken, getUserById);
route.get("/users", authenticateToken, getUsers);

module.exports = route;
