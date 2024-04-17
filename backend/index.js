const express = require('express');
const cors = require('cors');
require("dotenv").config();
var http = require('http');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


require('./config/mongoDB');
app.use("/", require("./routes"));

app.listen(process.env.PORT, async function () {
    await sequelize.sync();
    console.log(`server running at ${process.env.PORT}`);
})