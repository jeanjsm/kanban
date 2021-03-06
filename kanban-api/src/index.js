const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./authRoutes");
const routes = require("./routes");

const app = express();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.connection.on("error", () => console.error("connection error:"));
mongoose.connection.once("open", () => console.log("database connected"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(authRoutes);
app.use(routes);

app.listen(3333);
