const express = require('express');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const { swaggerUi, specs } = require('./swagger/swagger');
const cors = require('cors');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');
// const userInfo = require('./config/userinfo.json');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch((err) => console.error('MongoDB에 연결할 수 없습니다.', err));

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
