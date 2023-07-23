const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')

const orderRoutes = require('./api/routes/orders');
const productRoutes = require("./api/routes/products");

mongoose.connect('mongodb+srv://kanki66:K90V11clZXd5209q@naksdb.nxshiaq.mongodb.net/?retryWrites=true&w=majority')


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

app.use('/orders', orderRoutes);
app.use("/products", productRoutes);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;