const express = require("express");

const router = express.Router();
const adminServices = require("../services/admin");

router.post("/", adminServices.registerAdmin);

module.exports = router;
