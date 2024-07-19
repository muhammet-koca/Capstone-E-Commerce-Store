const { app } = require("../src/share");
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`I am listening on PORT number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Does this work");
});

const userRoutes = require("../src/routes/userRoutes");
app.use("/api/user", userRoutes);
