const Purchase = require("../models/purchaseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const moment = require("moment");
const handlerFactory = require("./handlerFactory");
const Email = require("../utils/email");

exports.getAllPurchases = catchAsync(async (req, res, next) => {
  const purchases = await Purchase.find()
    .populate({
      path: "purchases.items.item",
      select: "name price ",
    })
    .populate({
      path: "user",
      select: "name",
    });

  if (!purchases) return next(new AppError("Something went wrong", 500));

  res.status(200).json({
    status: "success",
    results: purchases.length,
    data: {
      purchases,
    },
  });
});

exports.getUserPurchases = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: "purchases",
    populate: {
      path: "purchases.items.item",
      select: "name price",
    },
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    results: user.purchases.length,
    data: {
      purchases: user.purchases,
    },
  });
});

// Create a new purchase or update an existing one
exports.createPurchase = catchAsync(async (req, res, next) => {
  const { order, totalPrice, items, userInfo } = req.body;

  if (req.params.id) {
    let purchase = await Purchase.findOne({ user: req.params.id });

    if (purchase) {
      // If purchase record exists, add the new items to it
      purchase.purchases.push({
        items,
        totalPrice,
        purchaseDate: new Date(),
      });
    } else {
      // If no purchase record exists, create a new one
      purchase = await Purchase.create({
        user: req.params.id,
        purchases: [
          {
            items,
            totalPrice,
            purchaseDate: new Date(),
          },
        ],
      });
    }
    await purchase.save();
    // Update user's purchase history
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { purchases: purchase._id } },
      { new: true }
    );

    if (!user) return next(new AppError("No user found with that ID", 404));
    const To = process.env.OwnerEmail;
    await new Email(user, userInfo, order, To, totalPrice).sendOrder();

    return res.status(201).json({
      status: "success",
      data: {
        purchase,
      },
    });
  }
  const purchase = await Purchase.create({
    purchases: [
      {
        items,
        totalPrice,
        purchaseDate: new Date(),
      },
    ],
  });
  res.status(201).json({
    status: "success",
    data: {
      purchase,
    },
  });
});

exports.deleteAllPurchases = catchAsync(async (req, res, next) => {
  await Purchase.deleteMany({});

  res.status(204).json({
    status: "success",
    data: null,
  });
});
