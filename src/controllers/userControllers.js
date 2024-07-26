const {
  registerQuery,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getSingleUser,
} = require("../queries/userQueries");

const register = async (req, res) => {
  try {
    const token = await registerQuery(req.body);
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Login failed" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
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
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getSingleUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
