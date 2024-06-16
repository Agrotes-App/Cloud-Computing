const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const diasesRoutes = require("./routes/diseases");
const historyRoutes = require("./routes/history");

app.use("/auth", authRoutes);
app.use("/", diasesRoutes);
app.use("/", historyRoutes);

app.listen(PORT, HOST, () => {
  console.log(`server running in ${PORT}`);
});
