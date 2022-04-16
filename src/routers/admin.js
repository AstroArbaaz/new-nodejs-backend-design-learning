const express = require("express");

const router = express.Router();
const adminServices = require("../services/admin");

router.post("/", adminServices.registerAdmin);
router.get("/", adminServices.getAllAdmins);
router.get("/get-by-email", adminServices.getAdminByEmail);
router.get("/get-by-contact-number", adminServices.getAdminByContactNumber);

module.exports = router;
