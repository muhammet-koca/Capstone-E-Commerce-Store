const { bcrypt, prisma, jwt } = require("../share");

const registerQuery = async ({
  firstName,
  lastName,
  email,
  password,
  isAdmin,
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
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
    },
    process.env.WEB_TOKEN,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const loginUser = async (email, password) => {
  console.log("Login:", email, password);
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log("user:", user);

  if (!user) {
    throw new Error("No user found.");
  }
  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error("Invalid login");
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.WEB_TOKEN
  );
  console.log("Token:", token);
  return token;
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

const getAllProducts = async () => {
  return await prisma.products.findMany();
};

const getProduct = async (id) => {
  return await prisma.products.findUnique({
    where: {
      id,
    },
  });
};

const addProductId = async ({
  productName,
  image,
  price,
  publish,
  usersId,
}) => {
  const product = await prisma.products.create({
    data: {
      productName,
      image,
      price,
      publish,
      usersId,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  return await prisma.products.delete({
    where: {
      id,
    },
  });
};

const addToCart = async (id, usersId) => {
  return await prisma.products.update({
    where: { id },
    data: {
      usersId,
    },
  });
};

const adminUpdateProduct = async (id, productName, image, price, publish) => {
  return await prisma.products.update({
    where: { id },
    data: {
      productName,
      image,
      price,
      publish,
    },
  });
};

// const emptyCart = async (id) => {
//   try {
//     return await prisma.users.update({
//       where: { id },
//       // data: { users: { connect: { usersId: [] } } },
//       data: {
//         cart: null,
//       },
//     });
//   } catch (error) {
//     console.log("error");
//     throw error;
//   }
// };

// const emptyCart = async (id, usersId) => {
//   return await prisma.products.update({
//     where: { id },
//     data: {
//       usersId: null,
//     },
//   });
// };

//UPDATE cartItems
const updateCartItems = async (id, productsId, quantity, cartId) => {
  return await prisma.cartItems.update({
    where: { id },
    data: {
      productsId,
      quantity,
      cartId,
    },
  });
};
//UPDATE cart
const updateCart = async (id, cartItems, usersId) => {
  return await prisma.cart.update({
    where: { id },
    data: {
      cartItems,
      usersId,
    },
  });
};
//UPDATE cart to null
const emptyCart = async (id, cartItems, usersId) => {
  return await prisma.cart.update({
    where: { id },
    data: {
      cartItems: null,
      usersId,
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
  getAllProducts,
  getProduct,
  addProductId,
  deleteProduct,
  addToCart,
  adminUpdateProduct,
  emptyCart,
  updateCartItems,
  updateCart,
};
