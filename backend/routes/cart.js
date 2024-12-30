const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }

    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get cart of particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userData = await User.findById(id).populate("cart");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = [...userData.cart].reverse(); // Avoid mutating the original array
    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.error("Error in /get-user-cart:", error);  // More detailed logging
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


module.exports = router;
