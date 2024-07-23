const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  try {
    const users = await Promise.all(
      [...Array(5)].map(async () => {
        return await prisma.users.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            isAdmin: faker.datatype.boolean(),
          },
        });
      })
    );

    console.log("users seeded", users);

    const products = await Promise.all(
      [...Array(5)].map(async () => {
        return await prisma.products.create({
          data: {
            productName: faker.commerce.productName(),
            image: faker.image.urlLoremFlickr({ category: "animals" }),
            price: faker.commerce.price(),
            publish: faker.datatype.boolean(),
          },
        });
      })
    );

    console.log("products seeded", products);

    const addProductsToCart = async (cartId) => {
      const addedProducts = new Set();
      await Promise.all(
        [...Array(5)].map(async () => {
          let product;
          do {
            product = products[Math.floor(Math.random() * products.length)];
          } while (addedProducts.has(product.id));

          addedProducts.add(product.id);

          return await prisma.cartItems.create({
            data: {
              productsId: product.id,
              cartId,
              quantity: faker.number.int({ min: 1, max: 5 }),
            },
          });
        })
      );
    };

    await Promise.all(
      users.map(async (user) => {
        const cart = await prisma.cart.create({
          data: {
            usersId: user.id,
          },
        });

        await addProductsToCart(cart.id);
      })
    );

    console.log("carts and cart items seeded");
  } catch (error) {
    console.error("error seeding", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
