const multer = require("multer");
const sharp = require("sharp");
const Item = require("../models/itemModel");
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

exports.uploadItemImages = upload.single("image");

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeItemImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `item-${Date.now() + Math.random() * 10}.jpeg`;

  await sharp(req.file.buffer)
    .resize(100, 100)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/itemsImg/${req.file.filename}`);

  next();
});

exports.getAllItems = factory.getAll(Item);
exports.getItem = factory.getOne(Item);
exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
