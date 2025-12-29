const express = require("express");
const { getAllPatments, getPaymentById, createPaymentForBooking, paymentCustomerAndBooking } = require("../controllers/paymentsController.js");


const route = express.Router();

route.get("/", getAllPatments);
route.get("/:id", getPaymentById);
route.post("/:bookingid/bookings", createPaymentForBooking);
route.get("/:id/booking",paymentCustomerAndBooking);


module.exports = route;