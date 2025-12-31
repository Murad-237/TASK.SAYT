const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { verifyToken } = require("./middleware/auth");

const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const updateCompanyDataRoutes = require("./routes/updateCompanyData");
const insertCompanyRoutes = require("./routes/insertCompany");
const deleteCompanyRoutes = require("./routes/deleteCompany");
const tokenCheckRoutes = require("./routes/tokenCheck");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/sessions", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/updateCompanyData", updateCompanyDataRoutes);
app.use("/api/insertCompany", insertCompanyRoutes);
app.use("/api/deleteCompany", deleteCompanyRoutes);
app.use("/api/tokenCheck", tokenCheckRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "attack.html"));
});

const PORT = 4425;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server OK: http://127.0.0.1:${PORT}`);
});
