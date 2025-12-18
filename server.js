const express = require("express");
const app = express();
app.use(express.json());
const pool = require("./db/db.js")

app.use(express.json());
// Routes
  
const customerRoutes = require("./routes/customerRoutes.js");
const paymentsRoutes = require("./routes/paymentsRoutes.js");

app.use("/customers",customerRoutes);
app.use("/payments",paymentsRoutes);


app.listen(3000, () => {
  console.log("Server 3000 portda ishlamoqda");
});