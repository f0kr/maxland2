const multer = require("multer");
const sharp = require("sharp");
const Catagory = require("../models/catagoryModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCatagoryImages = upload.single("image");

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeCatagoryImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `catagory-${Date.now() + Math.random() * 10}.jpeg`;

  await sharp(req.file.buffer)
    .resize(100, 100)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/catagoriesImg/${req.file.filename}`);

  next();
});

exports.getAllCatagories = factory.getAll(Catagory);
exports.getCatagory = factory.getOne(Catagory);
exports.createCatagory = factory.createOne(Catagory);
exports.updateCatagory = factory.updateOne(Catagory);
exports.deleteCatagory = factory.deleteOne(Catagory);
