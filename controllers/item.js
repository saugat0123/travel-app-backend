const ErrorResponse = require("../utils/errorResponse");
const Item = require("../model/product");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");

//--------------------CREATE Item------------------

exports.addItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);

  if (!item) {
    return next(new ErrorResponse("Error adding item"), 404);
  }

  res.status(201).json({
    success: true,
    data: item,
  });
});

//-------------------Display all items

exports.getItems = asyncHandler(async (req, res, next) => {
  const item = await Item.find({});

  res.status(201).json({
    success: true,
    count: item.length,
    data: item,
  });
});

// -----------------FIND Item BY Clothes-------------------

exports.getClothes = asyncHandler(async (req, res, next) => {
  const item = await Item.find({ itemType: "c" });

  if (!item) {
    return next(new ErrorResponse("Item not found"), 404);
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// -----------------FIND Item BY Toiletries-------------------

exports.getToiletries = asyncHandler(async (req, res, next) => {
  const item = await Item.find({ itemType: "t" });

  if (!item) {
    return next(new ErrorResponse("Item not found"), 404);
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// -----------------FIND Item BY Gadgets-------------------

exports.getGadgets = asyncHandler(async (req, res, next) => {
  const item = await Item.find({ itemType: "g" });

  if (!item) {
    return next(new ErrorResponse("Item not found"), 404);
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

// -----------------DELETE customer------------------------

exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Item.findById(req.params.id);

  if (!customer) {
    return next(new ErrorResponse(`No student found `), 404);
  }

  await customer.remove();

  res.status(200).json({
    success: true,
    count: customer.length,
    data: {},
  });
});

exports.itemUpdate = asyncHandler(async (req, res, next) => {
  const { id, itemName, itemType, itemImage, itemPrice, itemRating } = req.body;

  if (!item) {
    return next(new ErrorResponse(`No item found `), 404);
  }

  await Item.updateOne({ _id: id }, { itemName: itemName, itemType: itemType })
    .then(function (result) {
      res.status(200).json({ message: "Item Updated!!" });
    })
    .catch(function (e) {
      res.status(200).json({ error: e });
    });
});

// ------------------UPLOAD IMAGE-----------------------

exports.ItemPhotoUpload = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  console.log(item);
  if (!item) {
    return next(new ErrorResponse(`No user found with ${req.params.id}`), 404);
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo and accept any extension of an image
  // if (!file.mimetype.startsWith("image")) {
  //   return next(new ErrorResponse(`Please upload an image`, 400));
  // }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${item.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.err(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    //insert the filename into database
    await Item.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
  });

  res.status(200).json({
    success: true,
    data: file.name,
  });
});
