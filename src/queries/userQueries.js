const { bcrypt, prisma, jwt } = require("../share");

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
      cart,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
      isAdmin: registerUser.isAdmin,
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
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
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

module.exports = {
  registerQuery,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getSingleUser,
};
