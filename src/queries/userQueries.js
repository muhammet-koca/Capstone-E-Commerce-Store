const { bcrypt, prisma, jwt } = require("../share");
// import { createCart } from "./cartQueries";

const registerQuery = async ({
  firstName,
  lastName,
  email,
  password,
  isAdmin,
  cart,
}) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
      isAdmin,
    },
    include: {
      cart,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
      isAdmin: registerUser.isAdmin,
      cart: registerUser.cart,
    },
    process.env.WEB_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  const updatedToken = { token, id: registerUser.id, cart: registerUser.cart };
  return updatedToken;
};

const loginUser = async (email, password) => {
  console.log("Login:", email, password);
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    include: {
      cart: true,
    },
  });
  console.log("user:", user);

  if (!user) {
    throw new Error("No user found.");
  }
  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
      cart: user.cart,
    },
    process.env.WEB_TOKEN
  );
  const updatedToken = { token, id: user.id, cart: user.cart };
  return updatedToken;
};

const getAllUsers = async () => {
  return await prisma.users.findMany();
};

const deleteUserById = async (id) => {
  return await prisma.users.delete({
    where: {
      id,
    },
  });
};

const updateUserById = async (
  id,
  firstName,
  lastName,
  email,
  password,
  isAdmin
) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return await prisma.users.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
      isAdmin,
    },
  });
};

const getSingleUser = async (id) => {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
};

module.exports = {
  registerQuery,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getSingleUser,
};
