const { prisma } = require("../share");

const addToCart = async (id, usersId) => {
  return await prisma.products.update({
    where: { id },
    data: {
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

const createCart = async (usersId) => {
  return await prisma.cart.create({
    data: {
      usersId,
    },
  });
};

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
  addToCart,
  emptyCart,
  updateCartItems,
  updateCart,
  createCart,
};
