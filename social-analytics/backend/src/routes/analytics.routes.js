const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

router.get("/instagram", analyticsController.getInstagramData);
router.get("/facebook", analyticsController.getFacebookData);

module.exports = router;