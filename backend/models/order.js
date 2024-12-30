const mongoose = require("mongoose");
const order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out of delivery, Delivered, Canceled"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("order", order);


const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  status: { type: String, default: "Order Placed" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
