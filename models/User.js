const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 8,
      bcrypt: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.plugin(require("mongoose-bcrypt"));

const User = model("user", userSchema);

module.exports = User;
