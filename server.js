const express = require("express");
const app = express();
app.use(express.json());

const pool = require("./db/db.js")

// Routes

const customerRoutes = require("./routes/customerRoutes.js");
const reviewsRoutes = require("./routes/reviewsRoutes.js");

// APIs

// Sardorxon

app.use("/customers",customerRoutes);
app.use("/reviews",reviewsRoutes);


app.listen(3000, () => {
  console.log("Server 3000 portda ishlamoqda");
});