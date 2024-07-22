const { prisma } = require("../share");

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
  cartItems,
}) => {
  const product = await prisma.products.create({
    data: {
      productName,
      image,
      price,
      publish,
      cartItems,
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

module.exports = {
  getAllProducts,
  getProduct,
  addProductId,
  deleteProduct,
  adminUpdateProduct,
};
