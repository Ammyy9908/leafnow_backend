const User = require("../models/User");
const verifyAuth = require("../utils/verifyAuth");

const router = require("express").Router();

router
  .post("/add", verifyAuth, async (req, res) => {
    const { id } = req.user;
    const { item } = req.body;
    const user = await User.findOne({ _id: id });
    const previous_cart = user.cart;
    const newCart = [...previous_cart, item];
    await User.findOneAndUpdate({ _id: id }, { cart: newCart });
    res.json({ message: "Item added to cart" });
  })
  .delete("/remove/:item_id", verifyAuth, async (req, res) => {
    const { item_id } = req.params;
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    const cart = user.cart;
    const newCart = cart.filter((item) => item.id.toString() !== item_id);
    await User.findOneAndUpdate({ _id: id }, { cart: newCart });
    res.json({ message: "Item removed from cart" });
  });

module.exports = router;
