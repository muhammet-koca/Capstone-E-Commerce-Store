const { route } = require("../share");
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authMiddleware");

route.post("/register", register);
route.post("/login", login);

route.get("/users", authenticateToken, getUsers); //admin ability only

route.get("/"); //display all product

route.delete("/users/:id", authenticateToken, deleteUser); //only delete self
route.put("/users/:id", authenticateToken, updateUser); //only update self

//get products (not protected)
//get individual product(id) details
//update cart
//get cart
//checkout cart (empty cart)
//admin only- add product, update, delete
//admin only get all users and get user by ID

module.exports = route;
