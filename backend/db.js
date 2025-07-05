const { Pool } = require('pg');
require('dotenv').config();

// Create a new Pool using your DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Important for Supabase
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ DB connection error:", err));

module.exports = pool;
