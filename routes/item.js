const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  addItem,
  itemUpdate,
  getItems,
  getClothes,
  getToiletries,
  getGadgets,
  ItemPhotoUpload,
} = require("../controllers/item");

router.post("/add/item", protect, addItem);
router.get("/item/all", getItems);
router.get("/item/clothes", getClothes);
router.get("/item/toiletries", getToiletries);
router.get("/item/gadgets", getGadgets);
router.put("/item/update", protect, itemUpdate);
router.put("/item/:id/photo", protect, ItemPhotoUpload);

module.exports = router;
