const dotenv = require("dotenv");
const {Pool} = require("pg");

dotenv.config();

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false, // Render uchun kerak
  },
});

// DB ulanish xatolari
pool
  .connect()
  .then(() => console.log("Database ulandi"))
  .catch((err) => console.log("Database ulanishda xatolik:", err));

module.exports = pool;
