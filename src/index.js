require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoute = require("./routes/user")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/user', userRoute)

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server Running');
});
