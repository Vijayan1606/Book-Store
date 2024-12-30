const router = require("express").Router();
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      //saving Order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "an error occured" });
  }
});

//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID is required in headers" });
    }

    const userData = await User.findById(id)
      .populate({
        path: "orders",
        populate: {
          path: "book",
        },
      })
      .exec();

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const ordersData = Array.isArray(userData.orders) ? userData.orders.reverse() : [];

    return res.status(200).json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.error("Error in /get-order-history:", error);

    return res.status(500).json({
      message: "An error occurred while fetching order history.",
      error: error.message,
    });
  }
});


//get all orders -admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//update order -admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


module.exports = router;
