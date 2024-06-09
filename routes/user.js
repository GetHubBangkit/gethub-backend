const express = require("express");
const userController = require("../controllers/user.controller");

const {
  validateRegisterUser,
  validateLoginUser,
} = require("../middleware/input-validator");
const { authenticateToken } = require("../middleware/check-auth");
const { verifyTokenEmail, regenerateVerificationToken } = require("../helpers/email-verification")

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", validateLoginUser, userController.login);

router.get("/public/profile", userController.getPublicUser);

router.get("/verify/:token", verifyTokenEmail);
router.get("/regenerate-verification", authenticateToken, regenerateVerificationToken);

module.exports = router;