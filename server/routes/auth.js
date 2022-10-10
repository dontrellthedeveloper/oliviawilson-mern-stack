const express = require("express");

const router = express.Router();

// controller
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/create-or-update-user", createOrUpdateUser);

router.post("/create-or-update-user", createOrUpdateUser);

module.exports = router;