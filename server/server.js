const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// app.use(
//   cors({
//     origin: ["compound-dashboard-murex.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} from ${req.ip}`);
  next();
});

const pool = new Pool({
  user: "postgres",
  host: "advisor-db.cluster-cj4oa8og80dy.us-east-2.rds.amazonaws.com",
  database: "advisor_db",
  password: process.env.DB_PASSWORD,
  port: process.env.VITE_API_URL,
  // port: 5432,
  ssl: { rejectUnauthorized: false },
});

app.get("/advisors", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT a.*, 
        COALESCE(json_agg(json_build_object('name', c.name, 'repId', c.repId)) FILTER (WHERE c.id IS NOT NULL), '[]') AS custodians
      FROM advisors a
      LEFT JOIN custodians c ON a.id = c.advisor_id
      GROUP BY a.id
    `);
    console.log("/advisors: ", rows);
    res.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Could not retrieve advisors" });
  }
});

app.get("/advisors/:id/accounts", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM accounts WHERE advisor_id = $1`,
      [id]
    );

    const accountsWithHoldings = await Promise.all(
      rows.map(async (account) => {
        const { rows: holdings } = await pool.query(
          `SELECT * FROM holdings WHERE account_id = $1`,
          [account.id]
        );
        return { ...account, holdings: holdings.length ? holdings : [] };
      })
    );

    console.log("/advisors/:id/accounts: ", accountsWithHoldings);
    res.json(accountsWithHoldings);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Could not retrieve accounts" });
  }
});

app.get("/accounts/:id/holdings", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM holdings WHERE account_id = $1",
      [id]
    );

    console.log("/advisors/:id/holdings: ", rows);
    res.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Could not retrieve holdings" });
  }
});

app.listen(5001, () => console.log("Server running on port 5001"));

// Export for Vercel
module.exports = app;
