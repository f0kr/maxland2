const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const router = express.Router();

router
  .route("/")
  .get(purchaseController.getAllPurchases)
  .delete(purchaseController.deleteAllPurchases)
  .post(purchaseController.createPurchase);

module.exports = router;
