const express = require("express");
const { sql, pool } = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();


router.post("/", verifyToken, async (req, res) => {
  const { companyName } = req.body;

  if (!companyName) {
    return res.status(400).json({
      error: "companyName boş ola bilməz",
    });
  }

  try {
    const payload = { companyName };

    await pool
      .request()
      .input("body", sql.NVarChar, JSON.stringify(payload))
      .execute("insertCustomerName");

    res.json({
      success: true,
      message: "Şirkət uğurla əlavə edildi",
    });
  } catch (err) {
    console.error("Şirkət əlavə xətası:", err);
    res.status(500).json({ error: "Server xətası" });
  }
});

module.exports = router;
