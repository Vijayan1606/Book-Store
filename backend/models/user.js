const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", user);



//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   favourites: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Book", // Match this with the name used in the Book schema
//     },
//   ],
//   cart: [
//     {
//       type: mongoose.Types.ObjectId,
//       ref: "Book",  // Ensure this matches the exact name of the Book model
//     },
//   ],
  

// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
