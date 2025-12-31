const express = require("express");
const { sql, pool } = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.put("/", verifyToken, async (req, res) => {
  const { customerID, companyName } = req.body;

  if (!customerID || !companyName) {
    return res.status(400).json({
      error: "customerID və companyName boş ola bilməz",
    });
  }

  try {
    const payload = {
      customerID: parseInt(customerID),
      companyName,
    };

    await pool
      .request()
      .input("body", sql.NVarChar, JSON.stringify(payload))
      .execute("updateCompanyDatasNonOrginalForTask");

    res.json({
      success: true,
      message: "Şirkət adı uğurla güncelləndi",
    });
  } catch (err) {
    console.error("Şirket güncelleme xətası:", err);
    res.status(500).json({ error: "Server xətası" });
  }
});

module.exports = router;
