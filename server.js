const express = require("express");
const app = express();
app.use(express.json());

  
const customerRoutes = require("./routes/customerRoutes.js");
const paymentsRoutes = require("./routes/paymentsRoutes.js");

app.use("/customers",customerRoutes);
app.use("/payments",paymentsRoutes);


app.listen(5500, () => {
  console.log("Server 5500 portda ishlamoqda");
});