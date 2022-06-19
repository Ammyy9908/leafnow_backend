const verifyAuth = require("../utils/verifyAuth");

const router = require("express").Router();

var Publishable_Key =
  "pk_test_51HOq4pHXxf9xLQSuP4TCLlZAPLk7SZLYrfXljHXGWNZQ63hxvXGTNSCeQFCvNCeFfmLpkWFYpIe58sG4VRNeoYfB00EbT74e8d";
var Secret_Key =
  "sk_test_51HOq4pHXxf9xLQSueEtScTbUK6rr1qqQHlvncioawAuwNtDzNkmSG7ooH4hervNV1bQn3toPtyAfu3R05eFp27G000mQkQuiia";

const stripe = require("stripe")(Secret_Key);

router.post("/add", verifyAuth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findOne({ _id: id });
  const { name, email } = user;

  const { product } = req.body;
});
