const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    //requires: true,
  },
  email: {
    type: String,
    //required: true,
  },
  password: {
    type: String,
    //required: true,
  },
  resetToken: String,
  expireToken: Date,
  count: {
    type: Number,
    default: 0,
  },
  channelName: String,
  conversation: [
    {
      messages: String,
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

mongoose.model("User", userSchema);
