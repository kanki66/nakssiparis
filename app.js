const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')
const info = require('./info')

const orderRoutes = require('./api/routes/orders');
const productRoutes = require("./api/routes/products");

mongoose.connect(info.constants.MONGODB_LINK)


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