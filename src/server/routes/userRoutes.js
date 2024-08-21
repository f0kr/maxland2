const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const purchaseController = require("../controllers/purchaseController");

const router = express.Router();

// router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(userController.getAllUsers)
  .delete(userController.deleteAllUsers);
// .post(userController.createUser);

router
  .route("/:id")
  .get(purchaseController.getUserPurchases)
  .delete(userController.deleteUser);

router.use(authController.protect);

router.patch("/changePassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.get(
  "/myPurchaseHistory",
  userController.getMe,
  purchaseController.getUserPurchases
);
router.post(
  "/createPurchase",
  userController.getMe,
  purchaseController.createPurchase
);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

module.exports = router;
