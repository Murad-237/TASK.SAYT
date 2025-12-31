// middleware/auth.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mySuperSecretKeysss";
const ALLOWED_ALGS = ["HS512"];


function createToken(userId, username) {
  return jwt.sign(
    { userId, username },
    SECRET_KEY,
    { algorithm: "HS512", expiresIn: "2m" } 
  );
}


function verifyToken(req, res, next) {
  const token = (req.headers["authorization"] || req.headers["x-authorization"] || "").replace(/^Bearer\s+/i, "");
  if (!token) return res.status(403).json({ message: "Token müəyyən olunmadı." });

  try {
    const header = JSON.parse(Buffer.from(token.split(".")[0], "base64").toString("utf8"));
    if (!ALLOWED_ALGS.includes(header.alg)) {
      return res.status(403).json({ message: "Dəstəklənməyən token alqoritmi." });
    }
  } catch (e) {
    return res.status(403).json({ message: "Token header oxunmadı." });
  }

  jwt.verify(token, SECRET_KEY, { algorithms: ALLOWED_ALGS }, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token etibarsız və ya müddəti bitmişdir." });
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  });
}

module.exports = { verifyToken, SECRET_KEY, createToken };
