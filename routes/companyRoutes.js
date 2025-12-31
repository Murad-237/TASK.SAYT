const express = require("express");
const { sql, pool } = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();


router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.request().execute("gettingCompanies");

    if (!result.recordset || result.recordset.length === 0) {
      return res.json([]);
    }

    const sqlJson = result.recordset[0].Result;
    const parsed = JSON.parse(sqlJson);

    res.json(parsed.result || []);
  } catch (err) {
    console.error("Şirkət xətası:", err);
    res.status(500).json({ error: "Server xətası" });
  }
});

module.exports = router;
