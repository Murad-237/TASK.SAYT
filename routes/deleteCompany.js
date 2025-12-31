const express = require("express");
const { sql, pool } = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { customerID } = req.body;

  if (!customerID) {
    return res.status(400).json({
      error: "customerID boş ola bilməz",
    });
  }

  try {
    const payload = { customerID: parseInt(customerID) };

    await pool
      .request()
      .input("body", sql.NVarChar, JSON.stringify(payload))
      .execute("customerDelete");

    res.json({
      success: true,
      message: "Müştəri uğurla silindi",
    });
  } catch (err) {
    console.error("Müştəri silmə xətası:", err);
    res.status(500).json({ error: "Server xətası" });
  }
});

module.exports = router;
