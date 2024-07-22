const { prisma } = require("../share");

const createCart = async (usersId) => {
  return await prisma.cart.create({
    data: {
      usersId,
    },
  });
};

const createCartItems = async (productsId, cartId) => {
  return await prisma.cartItems.create({
    data: {
      productsId,
      cartId,
    },
  });
};

const getCart = async (id) => {
  return await prisma.cart.findUnique({
    where: {
      id,
    },
    include: {
      cartItems: true,
    },
  });
};

const addToCart = async (id, productsId) => {
  return await prisma.cartItems.update({
    where: { id },
    data: {
      productsId,
    },
  });
};

//UPDATE cartItems
const updateCartItems = async (id, productsId, quantity) => {
  return await prisma.cartItems.update({
    where: { id },
    data: {
      productsId,
      quantity,
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

module.exports = {
  addToCart,
  emptyCart,
  updateCartItems,
  updateCart,
  createCart,
  createCartItems,
  getCart,
};
