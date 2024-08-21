const express = require("express");
const itemController = require("../controllers/itemController");

const router = express.Router();

router
  .route("/")
  .post(
    itemController.uploadItemImages,
    itemController.resizeItemImages,
    itemController.createItem
  )
  .get(itemController.getAllItems);

router
  .route("/:id")
  .get(itemController.getItem)
  .patch(
    itemController.uploadItemImages,
    itemController.resizeItemImages,
    itemController.updateItem
  )
  .delete(itemController.deleteItem);

module.exports = router;
