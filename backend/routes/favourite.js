const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const mongoose = require("mongoose");


//add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourtie" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourtie" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete book from favourite
router.put(
  "/remove-book-from-favourite",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);
      if (isBookFavourite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      }
      return res.status(200).json({ message: "Book removed from favourtie" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//get favourite books


router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const userData = await User.findById(id).populate("favourites");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      status: "Success",
      data: userData.favourites,
    });
  } catch (error) {
    console.error("Error fetching favourite books:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
});





module.exports = router;
