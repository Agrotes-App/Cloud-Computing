const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");
const authenticateToken = require("../middleware/tokenJWT");

router.post("/register", auth.registerUser);

router.post("/login", auth.loginUser);

router.put("/update", authenticateToken, auth.updateUserAccount);

router.post("/logout", authenticateToken, auth.logoutUser);

module.exports = router;
