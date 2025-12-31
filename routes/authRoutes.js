const express = require("express");
const { sql, pool } = require("../config/db");
const { createToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userName, pasCode } = req.body;

  try {
    const jsonBody = JSON.stringify({ userName, pasCode });
    const result = await pool.request()
      .input("jsonBody", sql.NVarChar, jsonBody)
      .execute("login");

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(401).json({ message: "İstifadəçi adı və ya şifrə yanlışdır." });
    }

    const sqlJson = result.recordset[0].Result;
    const parsed = JSON.parse(sqlJson);
    const user = parsed?.user;

    if (!user || Object.keys(user).length === 0) {
      return res.status(401).json({ message: "İstifadəçi adı və ya şifrə yanlışdır." });
    }

    const token = createToken(user.id, user.username);

    res.setHeader("X-Authorization", token);
    res.status(200).json({
      message: "Login uğurlu.",
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
        last_login: new Date(),
      },
    });
  } catch (err) {
    console.error("Login xətası:", err);
    res.status(500).json({ error: "Server xətası" });
  }
});

module.exports = router;
