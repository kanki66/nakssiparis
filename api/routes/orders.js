
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Order.find()
    .select('-__v')
    .populate('products.product_id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      products: req.body.products,
      order_for_date_format: req.body.order_for_date_format,
      order_for_date_string: req.body.order_for_date_string,
      total_price: req.body.total_price,
  })

  order
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Order stored",
      createdOrder: {
        _id: result._id,
        product: result.product,
        quantity: result.quantity
      },
      request: {
        type: "GET",
        url: "http://localhost:5000/orders/" + result._id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('products.product_id')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:5000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/", (req, res, next) => {
  Order.deleteMany()
  .exec()
  .then(result => {
    res.status(200).json({
      message: "All Order deleted"
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/:date1/:date2', (req, res, next) => {
  const date1 = req.params.date1;
  const date2 = req.params.date2;
  console.log(date1)
  Order.find({ "order_for_date_format": { $gt: new Date(date1+"T00:00:00.000Z"), $lt: new Date(date2+"T23:59:59.999Z")}})
  .populate('products.product_id')
  .select('-__v')        
  .exec()
  .then(doc => {
      if (doc) {
          res.status(200).json({
              orders: doc
          });
      }
      else {
          res.status(404).json({message: "No valid entry found for provided ID"})
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
  }); 
});
module.exports = router;