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

const getCartItems = async (cartId) => {
  return await prisma.cartItems.findMany({
    where: {
      cartId,
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

const emptyCart = async (id) => {
  return await prisma.cart.delete({
    where: { id },
  });
};

module.exports = {
  addToCart,
  emptyCart,
  updateCartItems,
  createCart,
  createCartItems,
  getCart,
  getCartItems
};
