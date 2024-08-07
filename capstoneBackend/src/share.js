const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

const route = express.Router();

module.exports = {
  app,
  bcrypt,
  jwt,
  route,
  prisma,
};
