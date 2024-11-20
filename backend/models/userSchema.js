import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    required: [true, "Email Required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone Number Required"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Field is Required!"],
  },
  password: {
    type: String,
    required: [true, "Password Field is Required"],
    minLength: [8, "Password must contain at least 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  porfolioURL: {
    type: String,
    required: [true, "Portfolio URL is Required"],
  },
  githubURL: String,
  intagramURL: String,
  facebookURL: String,
  XURL: String,
  LinkedInURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

UserSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const User = mongoose.model("User", UserSchema);
