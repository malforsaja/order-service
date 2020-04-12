import 'dotenv/config';
const Order = require('../models/order');
const Producer = require('sqs-producer');

let producer = Producer.create({
  queueUrl: process.env.QUEUE_URL,
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

//Create new Order
exports.create = (req, res) => {
  // Request validation
  if (!req.body.products || !req.body.userId || !req.body.userEmail || !req.body.address) {
    return res.status(400).send({
      message: "Order content must have all the fields"
    });
  }

  // Create an Order
  const order = new Order({
    products: req.body.products,
    userId: req.body.userId,
    userEmail: req.body.userEmail,
    address: req.body.address
  });

  // Save Order in the database
  order.save()
    .then(data => {
      console.log(data);
      res.send(data);
      if (data) {
        return producer.send([{
          id: 'id1',
          body: JSON.stringify(data.orderId)
        }], function (err) {
          if (err) console.log(err);
        });
      }
      
    })
    .then(() => {
      producer.queueSize(function (err, size) {
        if (err) {
          console.log(err);
        }
        console.log('There are', size, 'messages on the queue.');
      });
      res.send("Product created sucessfully", order.name)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the product."
      });
    });
};


// Retrieve all orders from the database.
exports.findAllOrders = (req, res) => {
  Order.find()
    .then(orders => {
      res.send(orders);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
};
