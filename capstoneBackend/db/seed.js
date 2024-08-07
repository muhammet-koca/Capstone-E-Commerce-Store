const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const getProductData = async () => {
  const limit = 30;
  const totalProducts = 100;
  let products = [];

  for (let skip = 0; skip < totalProducts; skip += limit) {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    products = products.concat(response.data.products);
  }
  return products;
};

const seed = async () => {
  try {
    await prisma.products.deleteMany({});

    const productsData = await getProductData();

    const products = await Promise.all(
      productsData.map(async (product) => {
        return await prisma.products.create({
          data: {
            productName: product.title,
            image: product.images[0],
            price: parseFloat(product.price),
            publish: true,
          },
        });
      })
    );
    console.log("Products seeded:", products);

    const users = await Promise.all(
      [...Array(5)].map(async () => {
        const password = faker.internet.password();
        const hashPassword = await bcrypt.hash(password, 10);
        return await prisma.users.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashPassword,
            isAdmin: faker.datatype.boolean(),
          },
        });
      })
    );
    console.log("users seeded", users);

    await Promise.all(
      users.map(async (user) => {
        const cart = await prisma.cart.create({
          data: {
            usersId: user.id,
          },
        });
      })
    );
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await prisma.$disconnect();
  }
};
seed();
