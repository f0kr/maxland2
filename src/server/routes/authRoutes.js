const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/google-signup", authController.googleSignup);
router.post("/signup/set-password", authController.setGooglePass);
router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);

router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

module.exports = router;
