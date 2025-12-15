const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "",
  port: 5432,
});

// DB ulanish xatolari
pool.connect()
    .then(() => console.log("Database ulandi"))
    .catch((err) => console.log("Database ulanishda xatolik:", err));


module.exports = pool;