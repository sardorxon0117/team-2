const express = require("express");
const { getAllUsers, getUserById, createCustomer, editCustomer, deleteCustomer, allCustomerBooking, allCustomerReviews } = require("../controllers/customerController.js");

const route = express.Router();

route.get("/", getAllUsers);
route.get("/:id", getUserById);
route.post("/", createCustomer);
route.put("/:id", editCustomer);
route.delete("/:id", deleteCustomer);
route.get("/:id/bookings", allCustomerBooking);
route.get("/:id/reviews", allCustomerReviews);

module.exports = route;