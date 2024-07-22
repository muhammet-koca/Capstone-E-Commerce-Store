const db = require("../db");
const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const register = require("../src/controllers/userControllers")
const addProduct = require("../src/controllers/productControllers")

const seed = async () => {
    try {
        await Promise.all(
            [...Array(5)].map(()=> 
                register(faker.person.firstName(), faker.person.lastName(), faker.internet.email(),faker.internet.password())
            
            )
        )

        await Promise.all(
            [...Array(5)].map(()=> 
                addProduct(faker.product.name(), faker.image.abstract(), faker.number.float({ multipleOf: 0.25, min: 0, max:100 }))
            )
        )
    } catch (error) {
        console.log(error)
    }
}