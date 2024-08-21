const express = require("express");
const catagoryController = require("../controllers/catagoryController");

const router = express.Router();

router
  .route("/")
  .post(
    catagoryController.uploadCatagoryImages,
    catagoryController.resizeCatagoryImages,
    catagoryController.createCatagory
  )
  .get(catagoryController.getAllCatagories);

router
  .route("/:id")
  .get(catagoryController.getCatagory)
  .patch(
    catagoryController.uploadCatagoryImages,
    catagoryController.resizeCatagoryImages,
    catagoryController.updateCatagory
  )
  .delete(catagoryController.deleteCatagory);

module.exports = router;
