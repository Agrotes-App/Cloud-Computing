const express = require("express");
const {
  getAllHistories,
  getHistoryById,
  createHistory,
} = require("../controller/history");
const authenticateToken = require("../middleware/tokenJWT"); // Middleware untuk otentikasi token
const router = express.Router();

router.get("/histories", authenticateToken, getAllHistories); // Dapatkan semua history untuk user yang sedang login
router.get("/histories/:id", authenticateToken, getHistoryById); // Dapatkan history berdasarkan ID
router.post("/histories", authenticateToken, createHistory); // Tambah history baru

module.exports = router;
