const express = require("express");
const router = express.Router();
const diseasesController = require("../controller/diseases");
const authenticateToken = require("../middleware/tokenJWT");

router.post("/diseases", authenticateToken, diseasesController.createDisease);
router.get("/diseases", authenticateToken, diseasesController.getAllDiseases);
router.get(
  "/diseases/:id",
  authenticateToken,
  diseasesController.getDiseaseById
);
router.put(
  "/diseases/:id",
  authenticateToken,
  diseasesController.updateDisease
);
router.delete(
  "/diseases/:id",
  authenticateToken,
  diseasesController.deleteDisease
);

module.exports = router;
