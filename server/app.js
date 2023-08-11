const express = require("express");
const app = express();
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const { swaggerUi, specs } = require("./swagger/swagger");
const swaggerFile = require("./swagger/swagger-output.json");
const path = require("path");

const cors = require("cors");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:8080",
      "http://savvy-front.s3-website.ap-northeast-2.amazonaws.com/",
      "http://52.79.163.209/",
    ],
    credentials: true,
  })
);

app.use("/", routes);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);

const PORT = process.env.PORT || 8080;

const mongoose = require("mongoose");
// const userInfo = require('./config/userinfo.json');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
  .then(() => console.log("MongoDB에 연결되었습니다."))
  .catch((err) => console.error("MongoDB에 연결할 수 없습니다.", err));

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
