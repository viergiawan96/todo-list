const express = require("express");
const router = express.Router();
const activity = require("../controller/activity.controller.js");

router.post("/", activity.createActivity);
router.get("/", activity.getAllActivity);
router.get("/:id", activity.getIdActivity);
router.patch("/:id", activity.updateActivity);
router.delete("/:id", activity.deleteActivity);

module.exports = router;
